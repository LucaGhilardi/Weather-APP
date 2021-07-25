import React, { useState } from 'react'
import './index.css';
require('dotenv').config()
const api_base = "http://api.openweathermap.org/data/2.5/";
const api_key = process.env.REACT_APP_API_KEY;


function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api_base}weather?q=${query}&units=metric&APPID=${api_key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result)
        });
    }

  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App hot' : 'App cold') : 'App default'}>
      <main>
        <h1>Weather App</h1>
        <div className="Search-box">
          <input
            type="text"
            placeholder="Search"
            className="Search-bar"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weath">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}

      </main>


    </div>
  );
}

export default App;
