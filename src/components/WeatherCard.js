import React from "react";

function WeatherCard({
                         city,
                         country,
                         temp,
                         tempMin,
                         tempMax,
                         description,
                         main,
                         icon,
                         humidity,
                         windSpeed,
                     }) {
    const iconUrl = icon
        ? `https://openweathermap.org/img/wn/${icon}@2x.png`
        : "";

    const niceDescription =
        description && description.length > 0
            ? description.charAt(0).toUpperCase() + description.slice(1)
            : "";

    return (
        <div className="weather-card">
            {/* Background Image */}
            <div className="weather-card-bg">
                <img src="/weather-bg.png" alt="bg" />
            </div>

            {/* Actual Content */}
            <div className="weather-card-content">
                <div className="weather-card-header">
                    <h2>
                        {city}, {country}
                    </h2>
                    {main && <span className="weather-main">{main}</span>}
                </div>

                <div className="weather-card-body">
                    <div className="weather-temp-block">
                        {iconUrl && (
                            <img className="weather-icon" src={iconUrl} alt={description} />
                        )}
                        {temp !== undefined && temp !== null && (
                            <p className="weather-temp">{Math.round(temp)}°C</p>
                        )}
                    </div>

                    <div className="weather-details">
                        {niceDescription && (
                            <p className="weather-description">{niceDescription}</p>
                        )}

                        <p>
                            <strong>Min:</strong>{" "}
                            {tempMin !== undefined && tempMin !== null
                                ? `${Math.round(tempMin)}°C`
                                : "-"}
                        </p>

                        <p>
                            <strong>Max:</strong>{" "}
                            {tempMax !== undefined && tempMax !== null
                                ? `${Math.round(tempMax)}°C`
                                : "-"}
                        </p>

                        <p>
                            <strong>Humidity:</strong>{" "}
                            {humidity !== undefined && humidity !== null
                                ? `${humidity}%`
                                : "-"}
                        </p>

                        <p>
                            <strong>Wind:</strong>{" "}
                            {windSpeed !== undefined && windSpeed !== null
                                ? `${windSpeed} m/s`
                                : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;

