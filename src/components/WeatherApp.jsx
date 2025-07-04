import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import Cards from "./TemperatureCard";
import RainForecastCard from "./RainForecastCard";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityToSearch = city) => {
    if (!cityToSearch) return;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);

      // Update recent searches
      setRecentSearches((prev) => {
        const updated = [cityToSearch, ...prev.filter((c) => c !== cityToSearch)];
        return updated.slice(0, 5);
      });
    } catch (error) {
      alert("City not found! Try another.");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeather(weatherRes.data);
        setForecast(forecastRes.data);
      } catch (error) {
        console.log("Geolocation not available.");
      }
    });
  }, []);

  const getIcon = (main) => {
    const size = 70;
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

  return (
    <div className="weather-container">
      <h1 className="weather-title">🌤️ Ratnadeep's - Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          className="input-box"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <button onClick={() => fetchWeather()} className="search-button">
          Search
        </button>
      </div>

      {/* Show recent searches only when input is focused */}
      {recentSearches.length > 0 && isFocused && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <ul>
            {recentSearches.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setCity(item);          // Update input box
                    fetchWeather(item);     // Fetch weather
                    setIsFocused(false);    // Close dropdown
                  }}
                  className="recent-btn"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {weather && (
        <Cards
          icon={getIcon(weather.weather[0].main)}
          location={`${weather.name}, ${weather.sys.country}`}
          temp={`${weather.main.temp}`}
          description={weather.weather[0].description}
          humidity={weather.main.humidity}
          wind={weather.wind.speed}
          feelsLike={weather.main.feels_like}
          sunrise={moment.unix(weather.sys.sunrise).format("HH:mm")}
          sunset={moment.unix(weather.sys.sunset).format("HH:mm")}
        />
      )}

      {forecast && <RainForecastCard forecast={forecast.list} />}
    </div>
  );
};

export default WeatherApp;
