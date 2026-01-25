import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "dc7c2cf61f1e9e2b1c586945b548edc6";

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      
      const response = await axios.get(url);
      setWeatherData(response.data);
      setCity("")
    } catch (err) {
      setWeatherData(null);
      setError("City not found or API error!");
    }
  };

  return (
    <div className="weather-container">
      <h2>🌍  Weather Report</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p><i className="fa-solid fa-temperature-high"></i> Temperature: {weatherData.main.temp} °C</p>
          <p><i className="fa-solid fa-cloud"></i>  Condition: {weatherData.weather[0].main}</p>
          <p><i className="fa-solid fa-droplet"></i>  Humidity: {weatherData.main.humidity}%</p>
          <p><i className="fa-solid fa-wind"></i>  Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
