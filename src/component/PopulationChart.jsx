import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";
import "../App.css";
import axios from "axios";
import { Chart } from "react-google-charts";
import { Flag } from "../data/Flag";
import { Asia, Africa, America, Oceania, Europe } from "../data/Continent";
import pauseIcon from "../assets/pause-button.svg";
import playIcon from "../assets/play-button.svg";

export function PopulationChart() {
  const [iteration, setIteration] = useState(0);
  const [state, setState] = useState();
  const [start, setStart] = useState(false);
  const [data, setData] = useState(null);
  const [worldPopulationList, setWorldPopulationList] = useState([]);
  const [worldPopulation, setWorldPopulation] = useState({});
  const [loading, setLoading] = useState(false);
  const [percent, setPersent] = useState(0);
  const [continentBody, setContinentBody] = useState([
    "Asia",
    "Africa",
    "America",
    "Oceania",
    "Europe",
  ]);

  useInterval(() => {
    let currentYear = 1950 + iteration;
    if (start) {
      let newState = state.filter((item) => item.year === currentYear);
      let newWorld = worldPopulationList.find(
        (item) => item.Year === currentYear
      );
      const ArrayOfData = newState?.map((item) => {
        let array = [];
        array.push(item.name);
        array.push(item.value);
        array.push(`color: ${item.color}`);
        array.push(item.flag);
        return array;
      });
      newState = [
        [
          "Element",
          "Population",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ...ArrayOfData,
      ];
      setPersent(1.41 * iteration);
      setData(newState);
      setWorldPopulation(newWorld);
      setIteration((prev) => prev + 1);
      if (currentYear === 2021) {
        setStart(false);
        setIteration(0);
      }
    }
  }, 100);

  const fetchData = async (inputContinent) => {
    try {
      setLoading(true);
      const results = await axios.post(
        "https://zany-puce-dhole-slip.cyclic.app/country/get-by-year",
        {
          continent: inputContinent,
        }
      );
      const worldResults = await axios.post(
        "https://zany-puce-dhole-slip.cyclic.app/country/get-total-by-year"
      );
      let worldData = worldResults.data.worldPopulation;
      let data = results.data.results;
      data = data.map((item, index) => {
        return {
          name: item["Country name"],
          value: item.Population,
          year: item.Year,
          color: findContinent(item["Country name"]),
          flag: Flag.find((element) => element.name === item["Country name"])
            ?.emoji,
        };
      });
      setWorldPopulationList(worldData);
      setState(data);
      firstData(data, worldData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    width: 650,
    height: 550,
    bar: { groupWidth: "80%" },
    legend: { position: "none" },
    titleTextStyle: {
      fontSize: 19,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const firstData = (data, worldPopulationList) => {
    let newState = data?.filter((item) => item.year === 1950);
    let newWorld = worldPopulationList.find((item) => item.Year === 1950);
    const ArrayOfData = newState?.map((item) => {
      let array = [];
      array.push(item.name);
      array.push(item.value);
      array.push(`color: ${item.color}`);
      array.push(item.flag);
      return array;
    });
    newState = [
      [
        "Element",
        "Population",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ],
      ...ArrayOfData,
    ];
    setPersent(1.41);
    setData(newState);
    setWorldPopulation(newWorld);
  };

  if (loading) {
    return <p>Loading</p>;
  }

  const handleStartStopClick = () => {
    setStart(!start);
  };

  const handleFilterContinentClick = (continent) => {
    let param = [];
    if (continentBody?.includes(continent)) {
      param = continentBody.filter((item) => item !== continent);
    } else {
      param = continentBody ? [...continentBody, continent] : [continent];
    }
    setContinentBody(param);
    fetchData(param);
  };

  let currentYearforBar = 1950;
  let arrayYearBar = [1950];
  while (currentYearforBar !== 2020) {
    currentYearforBar = currentYearforBar + 5;
    arrayYearBar.push(currentYearforBar);
  }

  return (
    <>
      <div className="w-full h-[500px] flex flex-col  relative z-0 mt-[20px]">
        <div className="absolute left-[650px] z-30">
          <p className="text-[20px] font-semibold text-[#505351]">
            Population growth per country, 1950 to 2021
          </p>
          <p className="text-[#787878]">
            Click on the legend below to filter by continent 👇
          </p>
          <div className="flex flex-row items-center text-[12px] text-[#787878] mt-[10px]">
            <p className="text-[#505351] font-semibold mr-[6px]">Region</p>
            <button
              className={`w-[15px] h-[15px] mx-[3px] rounded ${
                continentBody?.includes("Asia")
                  ? "bg-[#5d45ea]"
                  : "bg-[#d4d4d8]"
              }`}
              onClick={() => {
                handleFilterContinentClick("Asia");
              }}
            ></button>
            <span className="text-center mr-[5px]">Asia</span>
            <button
              className={`w-[15px] h-[15px]  mx-[3px] rounded ${
                continentBody?.includes("Europe")
                  ? "bg-[#a26ce9]"
                  : "bg-[#d4d4d8]"
              }`}
              onClick={() => {
                handleFilterContinentClick("Europe");
              }}
            ></button>
            <span className="text-center mr-[5px]">Europe</span>
            <button
              className={`w-[15px] h-[15px] mx-[3px] rounded ${
                continentBody?.includes("Africa")
                  ? "bg-[#d07180]"
                  : "bg-[#d4d4d8]"
              }`}
              onClick={() => {
                handleFilterContinentClick("Africa");
              }}
            ></button>
            <span className="text-center mr-[5px]">Africa</span>
            <button
              className={`w-[15px] h-[15px] mx-[3px] rounded ${
                continentBody?.includes("Oceania")
                  ? "bg-[#f4a846]"
                  : "bg-[#d4d4d8]"
              }`}
              onClick={() => {
                handleFilterContinentClick("Oceania");
              }}
            ></button>
            <span className="text-center mr-[5px]">Oceania</span>
            <button
              className={`w-[15px] h-[15px] mx-[3px] rounded  ${
                continentBody?.includes("America")
                  ? "bg-[#fccd35]"
                  : "bg-[#d4d4d8]"
              }`}
              onClick={() => {
                handleFilterContinentClick("America");
              }}
            ></button>
            <span className="text-center mr-[5px]">Americas</span>
          </div>
        </div>
        <div className="chart-container absolute left-[570px] top-0 z-1 mt-[10px]">
          <Chart
            chartType="BarChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
          />
        </div>
        <div className="absolute left-[900px] top-[300px]">
          <div className="flex flex-col justify-end">
            <p className="transition-transform text-[50px] font-xl text-end text-[#787878]">
              {worldPopulation.Year}
            </p>
            <p className="transition-transform text-[20px] text-[#787878]">
              Total: {worldPopulation.Population?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <button
          onClick={handleStartStopClick}
          className="w-[30px] h-[30px] text-center ml-[500px] mr-[40px] mt-[20px]"
        >
          {start ? <img src={pauseIcon} /> : <img src={playIcon} />}
        </button>
        <div className="mt-[10px]">
          <div className="flex flex-row mr-[10px] text-[11px]">
            {arrayYearBar.map((item,index) => {
              return <p key={index} className="mr-[20.5px]">{item}</p>;
            })}
          </div>
          <div className=" h-1 w-[600px] bg-[#787878] duration-200 ml-[5px]">
            <div
              className="h-1 bg-neutral-300"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopulationChart;

function findContinent(country) {
  if (Africa.includes(country)) {
    return "#d07180";
  } else if (Asia.includes(country)) {
    return "#5d45ea";
  } else if (Europe.includes(country)) {
    return "#a26ce9";
  } else if (America.includes(country)) {
    return "#fccd35";
  } else if (Oceania.includes(country)) {
    return "#f4a846";
  } else {
    return "Unknown";
  }
}
