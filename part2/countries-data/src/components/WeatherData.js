import React from 'react'

const WeatherData = ({ weatherData }) => {
    return (
        <div>
            {weatherData && (
                <h3>Weather in {weatherData?.name}</h3>
            )}
            <div>
                <span style={{ fontWeight: 'bold', marginRight: 10 }}>Temperature:</span>
                <span>{weatherData?.main.temp - 273.15} ℃</span>
            </div>
            <div>
                <img
                    src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`} 
                    alt={`${weatherData?.weather[0].description}`}
                />
            </div>
            <div>
                <span style={{ fontWeight: 'bold', marginRight: 10 }}>Description:</span>
                <span>{weatherData?.weather[0].description}</span>
            </div>
            <div>
                <span style={{ fontWeight: 'bold', marginRight: 10 }}>Wind:</span>
                <span style={{ marginRight: 10 }}>{weatherData?.wind.speed} mph</span>
            <span>direction {weatherData?.wind.deg} degree</span>
            </div>
        </div>
    )
}

export default WeatherData