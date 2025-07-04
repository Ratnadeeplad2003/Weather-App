import React from "react";
import moment from "moment";
import {
  WiRain,
  WiDaySunny,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import "./Cards.css";

const getIcon = (main) => {
  const size = 40;
  const icons = {
    Clear: <WiDaySunny size={size} className="text-orange-400" />,
    Clouds: <WiCloudy size={size} className="text-gray-300" />,
    Rain: <WiRain size={size} className="text-blue-400" />,
    Snow: <WiSnow size={size} className="text-gray-300" />,
    Thunderstorm: <WiThunderstorm size={size} className="text-purple-400" />,
    Fog: <WiFog size={size} className="text-gray-400" />,
  };
  return icons[main] || <WiCloudy size={size} className="text-gray-300" />;
};

const RainForecastCard = ({ forecast }) => {
  const rainForecasts = forecast
    .filter((item) => item.weather[0].main === "Rain")
    .slice(0, 10);

  if (rainForecasts.length === 0) return null;

  return (
    <div className="weather-card">
      <h3 className="location">🌧️ Rain Forecast Timeline</h3>
      <div className="rain-slider">
        {rainForecasts.map((item, index) => (
          <div className="rain-card" key={index}>
            {getIcon(item.weather[0].main)}
            <p className="rain-time">
              {moment(item.dt_txt).format("ddd hh:mm A")}
            </p>
            <p>{item.weather[0].description}</p>
            <p>🌡️ {item.main.temp}°C</p>
            <p>💧 {item.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RainForecastCard;
