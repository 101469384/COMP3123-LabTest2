import React, { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
    const [city, setCity] = useState("Toronto");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const fetchWeather = async (cityName) => {
        if (!apiKey) {
            setErrorMsg("Missing API key. Please check .env file.");
            return;
        }

        if (!cityName) {
            setErrorMsg("Please enter a city name.");
            return;
        }

        try {
            setLoading(true);
            setErrorMsg("");

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    cityName
                )}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please try another city.");
                } else {
                    throw new Error("Failed to fetch weather. Try again later.");
                }
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setWeatherData(null);
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Load default city when app opens
    useEffect(() => {
        fetchWeather("Toronto");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearchClick = () => {
        fetchWeather(city);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            fetchWeather(city);
        }
    };

    return (
        <div className="app">
            <div className="app-container">
                <header className="app-header">
                    <h1>Weather Now</h1>
                    <p>COMP3123 Lab Test 2 — 101469384</p>
                </header>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Enter city name e.g. Toronto"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearchClick}>Search</button>
                </div>

                {loading && <p className="info-text">Loading weather...</p>}

                {errorMsg && !loading && (
                    <p className="error-text">{errorMsg}</p>
                )}

                {!loading && weatherData && (
                    <WeatherCard
                        city={weatherData.name}
                        country={weatherData.sys?.country}
                        temp={weatherData.main?.temp}
                        tempMin={weatherData.main?.temp_min}
                        tempMax={weatherData.main?.temp_max}
                        description={weatherData.weather?.[0]?.description}
                        main={weatherData.weather?.[0]?.main}
                        icon={weatherData.weather?.[0]?.icon}
                        humidity={weatherData.main?.humidity}
                        windSpeed={weatherData.wind?.speed}
                    />
                )}
            </div>
        </div>
    );
}

export default App;

