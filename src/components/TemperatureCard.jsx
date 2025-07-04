import React, { useState } from "react";
import "./Cards.css";

const Cards = ({
  icon,
  location,
  temp,
  description,
  humidity,
  wind,
  feelsLike,
  sunrise,
  sunset,
}) => {
  const [unit, setUnit] = useState("C");

  const convertTemp = (value) => {
    const num = parseFloat(value);
    return unit === "F"
      ? `${((num * 9) / 5 + 32).toFixed(1)}°F`
      : `${num.toFixed(1)}°C`;
  };

  const convertWind = (wind) => `${(wind * 3.6).toFixed(1)} km/h`;

  return (
    <div className="weather-card">
      <div className="unit-select">
        <label htmlFor="unit">Temperature Unit: </label>
        <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
        </select>
      </div>

      <div className="icon">{icon}</div>
      <h2 className="location">{location}</h2>
      <p className="temperature">{convertTemp(temp)}</p>
      <p className="description">{description}</p>
      <p>Humidity: {humidity}% | Wind: {convertWind(wind)}</p>
      <p>Feels Like: {convertTemp(feelsLike)}</p>
      <p>Sunrise: {sunrise} AM</p>
      <p>Sunset: {sunset} PM</p>
    </div>
  );
};

export default Cards;
