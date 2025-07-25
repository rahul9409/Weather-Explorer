import "./SearchBar.css";
import { useState, useEffect } from "react";

export default function SearchBar({
  setSearchClicked,
  setSelectedCity,
  setIsFahrenheit,
}) {
  const [cityText, setCityText] = useState("");
  const [result, setResult] = useState([]);
  const [isCelcius, setIsCelcius] = useState(true);
  const KEY = "f20303bbac5c243d840060ce1f29e6e1";
  function handleCityClick(index) {
    setSearchClicked(true);
    setSelectedCity(result[index]);
    setCityText("");
  }
  function handleToggle() {
    setIsCelcius((isCelcius) => !isCelcius);
    setIsFahrenheit((prev) => !prev);
  }
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityText}&limit=5&appid=${KEY}`
    )
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, [cityText]);
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <span className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            fill="white"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5L20.49 19l-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search city"
          className="search-input"
          onChange={(e) => {
            setCityText(e.target.value);
          }}
        />
      </div>

      <div className="toggle-wrapper">
        <span className={`toggle-label  ${isCelcius ? "active" : ""}`}>°C</span>
        <div
          className={`switch ${!isCelcius ? "fahrenheit" : ""}`}
          onClick={handleToggle}
        >
          <span className="slider"></span>
        </div>

        <span className={`toggle-label ${!isCelcius ? "active" : ""}`}>F</span>
      </div>
      <div>
        <ul className="dropdown">
          {cityText &&
            result.length > 0 &&
            result.map((data, index) => (
              <li
                key={index}
                onClick={() => {
                  handleCityClick(index);
                }}
              >
                {data.name}
                {data.state ? `, ${data.state}` : ""}, {data.country}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
