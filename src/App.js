import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useState } from "react";

export default function App() {
  const preshownCities = ["Delhi", "Mumbai", "Bengaluru", "Kolkata"];
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedCity, setSelectedCity] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  return (
    <div className="app-container">
      <Header />
      <SearchBar
        setSearchClicked={setSearchClicked}
        setSelectedCity={setSelectedCity}
        setIsFahrenheit={setIsFahrenheit}
      />
      <div className="weather-cards-container">
        {!searchClicked &&
          preshownCities.map((city) => (
            <WeatherCard city={city} isFahrenheit={isFahrenheit} />
          ))}
        {searchClicked && (
          <WeatherCard city={selectedCity} isFahrenheit={isFahrenheit}  />
        )}
      </div>
    </div>
  );
}
