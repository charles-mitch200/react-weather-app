import "./CSS/WeatherApp.css";
import search_icon from "./Assets/search.png";
import cloud_icon from "./Assets/cloudy.png";
import drizzle_icon from "./Assets/drizzle.png";
import storm_icon from "./Assets/storm.png";
import snow_icon from "./Assets/snow.png";
import sun_icon from "./Assets/sun.png";
import humidity_icon from "./Assets/humidity.png";
import wind_icon from "./Assets/wind.png";
import { useState } from "react";

const WeatherApp = () => {
  let api_key = "";

  const [wicon, setWicon] = useState(sun_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(sun_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(storm_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(storm_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else {
      setWicon(sun_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" placeholder="Search" className="cityInput" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} className="weather-search-icon" alt="" />
        </div>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>

      <div className="weather-temp">24°C</div>
      <div className="weather-location">Nairobi</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" alt="" />
          <div className="data">
            <div className="humidity-percent">50%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} className="icon" alt="" />
          <div className="data">
            <div className="wind-rate">20 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
