import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState('');
  const [error, setError] = useState("");

  function handleCity(evt){
    setCity(evt.target.value);
  }

  function getWeather(){
    let weatherData=axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dc7c2cf61f1e9e2b1c586945b548edc6&units=metric`)

    weatherData.then((success)=>{
      setWeatherData(success.data);
      setError("");
      setCity("");
      console.log(success.data);
    }
    ).catch((error)=>{
      console.log("City not found or API error!");
      setError("City not found or API error!");
      setWeatherData("");
      setCity("");
    })
  }



  return (
    <div className="weather-container">
      <h2>🌍  Weather Report</h2>
      <p>I can give you a Weather Report about your city!</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={handleCity}
        />
        <button onClick={getWeather}>Get Report</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p><i className="fa-solid fa-cloud-bolt"></i> Weather : {weatherData.weather[0].main}</p>
          <p><i className="fa-solid fa-temperature-high"></i> Temperature: {weatherData.main.temp} °C</p>
          <p><i className="fa-solid fa-cloud"></i>  Description : {weatherData.weather[0].description}</p>
          <p><i className="fa-solid fa-droplet"></i>  Humidity: {weatherData.main.humidity}%</p>
          <p><i className="fa-solid fa-wind"></i>  Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
