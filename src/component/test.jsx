import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";
import "../App.css";
import axios from "axios";
import { Chart } from "react-google-charts";
import { Flag } from "../data/Flag";
import { Asia, Africa, America, Oceania, Europe } from "../data/Continent";
import pauseIcon from "../assets/pause-button.svg";
import playIcon from "../assets/play-button.svg";

export function Test() {
    const [test, setTest] = useState(); 

    const handleTestClick = () => {
        setTest(initialData);
      };
      console.log(test);

       
    return (
        <>
        <button onClick={handleTestClick}>asdasd</button>
        <Chart
            chartType="BarChart"
            width="100%"
            height="100%"
            data={test}
            options={options}
          />
          </>
    )
}


const options = {
    width: 650,
    height: 550,
    bar: { groupWidth: "80%" },
    legend: { position: "none" },
    titleTextStyle: {
      fontSize: 19,
    },
  };

  const initialData = [["Element","Population",{"role":"style"},{"sourceColumn":0,"role":"annotation","type":"string","calc":"stringify"}],["China",543979200,"color: #5d45ea","🇨🇳"],["India",357021120,"color: #5d45ea","🇮🇳"],["United States",148281550,"color: #fccd35","🇺🇸"],["Russia",102580110,"color: #a26ce9","🇷🇺"],["Japan",84353060,"color: #5d45ea","🇯🇵"],["Germany",70964104,"color: #a26ce9","🇩🇪"],["Indonesia",69567624,"color: #5d45ea","🇮🇩"],["Brazil",53955360,"color: #fccd35","🇧🇷"],["United Kingdom",50055068,"color: #a26ce9","🇬🇧"],["Italy",46391944,"color: #a26ce9","🇮🇹"],["France",41842356,"color: #a26ce9","🇫🇷"],["Bangladesh",39728540,"color: #5d45ea","🇧🇩"]]