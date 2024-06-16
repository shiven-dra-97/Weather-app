import React, { useState } from 'react';
import axios from 'axios';
import "./index.css"

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('Enter City Name');
    const [dateTime, setDateTime] = useState('')
    const [theme, setTheme] = useState('light');
    const apiKey = '38355142ac3b372203ab3c44153a8818';



    const fetchWeather = async (cityName) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found.');
            setWeather(null);
        }
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== '') {
            fetchWeather(city);
            setCity('');
            setDateTime(new Date())
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeStyles = {
        backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
        color: theme === 'light' ? '#000000' : '#ffffff'
    };



    return (
        <div style={themeStyles} className="main">
            <div>
                <button className='toggle-button' onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark' : 'Light'} 
                </button>
            </div>
            <div className="container">
                <div className="row">
                    <div className="weather-details col-md-6">
                        {weather && (
                            <div className='details-card'>
                                <p className='city-name'>{weather.name}</p>
                                <div className='sub-card'>
                                    <p className='temperature'> {Math.ceil(weather.main.temp)}°C</p>
                                    <p className='description'>{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</p>
                                </div>
                                <div className='extra-details'>
                                    <div className='blur-card'>
                                        <p>Wind</p>
                                        <p>{weather.wind.speed}Km/hr</p>
                                    </div>
                                    <div className='blur-card'>
                                        <p>Humidity</p>
                                        <p>{weather.main.humidity}%</p>
                                    </div>
                                    <div className='blur-card'>
                                        <p>Visibility</p>
                                        <p>{weather.visibility / 1000}Km</p>
                                    </div>
                                </div>
                                <div className='date-time'>
                                    <p className='date-time-text'>{dateTime.toString().slice(0, 21)}</p>
                                    <p className='feels-like'>Feels like {Math.ceil(weather.main.feels_like)}°C</p>
                                </div>
                            </div>
                        )}
                        {error && <p className='error'>{error}</p>}
                    </div>

                    <div className="search-area col-md-6">
                        <h1>Search</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className='input-box'
                                placeholder="Enter City Name"
                                value={city}
                                onChange={handleCityChange}
                            />
                            <button className='button' type="submit">Search</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
