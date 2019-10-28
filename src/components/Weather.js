import React from "react";
import { fetchData, getAPIPath, calculateBGColor } from "../services/services";
import WeatherBackground from "./WeatherBackground";

import "./Weather.css";

export default class Weather extends React.Component {
    constructor () {
        super();
        this.state = {
            weather: "loading...",
            weatherLocation: "loading..."
        }
    }
    async updateRegionalWeather (_this) {
        navigator.geolocation.getCurrentPosition(async function (location){
            const loc = location;
            const date = new Date(loc.timestamp).toGMTString();
            _this.setState({ weatherLocation: {
                date:   date,
                lat:    loc.coords.latitude,
                lon:    loc.coords.longitude,
             } });
            const weatherResult = await fetchData(getAPIPath() + `location/search/?lattlong=${loc.coords.latitude}, ${loc.coords.longitude}`, { mode: "no-cors"})
            const weatherRegionID = weatherResult.data[0].woeid;
            const localWeather = await fetchData(getAPIPath() + `location/${weatherRegionID}`, { mode: "no-cors"});   
            return _this.setState({ weather: localWeather.data.consolidated_weather[0] });
        }, function (error){
            return console.error(error);
        });
    }
    componentDidMount(){
        this.updateRegionalWeather(this)
    }
    render () {
        const STATIC_NO_PROXY = true;
        let currentDate = "loading...";
        if (this.state.weatherLocation.date) {
            currentDate = this.state.weatherLocation.date;
        }
        let localWeather = "loading...";
        let weatherTemp = "loading..."
        let weatherColor = "";
        if (this.state.weather.weather_state_name) {
            localWeather = this.state.weather.weather_state_name;
            weatherTemp = this.state.weather.the_temp.toFixed(1) + `°C`;
            weatherColor = calculateBGColor(this.state.weather.the_temp);
        }
        let currentWeatherIcon = (<p>loading...</p>);
        if (this.state.weather.weather_state_abbr) {
            currentWeatherIcon = (<img alt={`Icon showing that today the weather is ${this.state.weather.weather_state_name}`} className="animated fadeInLeft weather-icon" src={getAPIPath(STATIC_NO_PROXY) + `img/weather/${this.state.weather.weather_state_abbr}.svg`} />);
        }
        return (
            <WeatherBackground className="animated fadeInTop" background={weatherColor}>
                <div className="animated zoomIn weather-container">
                    <div className="animated fadeIn weather-row">{currentWeatherIcon}</div>
                    <div className="animated fadeIn weather-row">{localWeather}</div>
                    <div className="animated fadeIn weather-row">{weatherTemp}</div>
                    <div className="weather-row">
                        <p className="animated fadeIn weather-date">{currentDate}</p>
                    </div>
                </div>
            </WeatherBackground>
        )
    }
}