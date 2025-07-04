import React, { useState } from "react";
import { Select } from "antd";
import "./Cards.css";

const { Option } = Select;

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
        <label htmlFor="unit" className="unit-label">
          Temperature Unit:
        </label>
        <Select
          id="unit"
          value={unit}
          onChange={(value) => setUnit(value)}
          className="unit-dropdown"
          style={{ width: 150 }}
        >
          <Option value="C">Celsius</Option>
          <Option value="F">Fahrenheit</Option>
        </Select>
      </div>

      <div className="icon">{icon}</div>
      <h2 className="location">{location}</h2>
      <p className="temperature">{convertTemp(temp)}</p>
      <p className="description">{description}</p>
      <p className="description">
        Humidity: {humidity}% | Wind: {convertWind(wind)}
      </p>
      <p className="description">Feels Like: {convertTemp(feelsLike)}</p>
      <p className="description">Sunrise: {sunrise} AM</p>
      <p className="description">Sunset: {sunset} PM</p>
    </div>
  );
};

export default Cards;
