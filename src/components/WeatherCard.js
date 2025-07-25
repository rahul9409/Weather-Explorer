import "./WeatherCard.css";
import { useState, useEffect } from "react";

export default function WeatherCard({ city, isFahrenheit }) {
  const [result, setResult] = useState({});
  const [refresh, setRefresh] = useState(false);
  const KEY = "f20303bbac5c243d840060ce1f29e6e1";
  function handleRefreshClick() {
    setRefresh((refresh) => !refresh);
  }
  useEffect(() => {
    const fetchCoordinatesAndWeather = async () => {
      if (!city.lat && !city.lon) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${KEY}`
          );
          const data = await res.json();

          const { lat, lon } = data[0];

          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
          );
          const weatherData = await weatherRes.json();
          setResult(weatherData);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      } else {
        try {
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${KEY}&units=metric`
          );
          const weatherData = await weatherRes.json();
          setResult(weatherData);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      }
    };

    fetchCoordinatesAndWeather();
  }, [city, refresh]);

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2>{city.name ? city.name : city}</h2>
          <p className="country-code">{result?.sys?.country}</p>
        </div>
        <button className="refresh-btn" onClick={handleRefreshClick}>
          🔄
        </button>
      </div>

      <div className="weather-icon-temp">
        <div className="weather-icon">
          {result?.weather?.length > 0 && (
            <img
              src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          )}
        </div>
        <div className="temp-info">
          <h1>
            {isFahrenheit
              ? Math.floor((result?.main?.temp * 9) / 5 + 32)
              : Math.floor(result?.main?.temp)}
            {`${isFahrenheit ? " °F" : " °C"}`}
          </h1>
          <p>{result?.weather?.[0]?.main}</p>
        </div>
      </div>

      <div className="weather-details">
        <p>Humidity: {result?.main?.humidity}%</p>
        <p>Wind: {result?.wind?.speed} m/s</p>
      </div>
    </div>
  );
}
