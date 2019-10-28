import React from "react";
import "./WeatherBackground.css";

function WeatherBackground (props) {
    let bgColor = props.background || "";
    return (
        <div className="weather-bg" style={{backgroundColor : bgColor}}>
            {props.children}
        </div>
    )
}
export default WeatherBackground;