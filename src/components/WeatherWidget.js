import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Bengaluru');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=03f47661a631df2a82760628ad8e8671`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching the weather data', error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(search);
    setSearch('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full md:w-1/3 mx-auto mt-4">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSearch} className="mb-4 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a city..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : weather ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">{weather.name}</h2>
            <p className="text-sm text-gray-600 capitalize">{weather.weather[0].description}</p>
            
            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-20 h-20 mx-auto"
            />

            <div className="text-6xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="mt-4 text-gray-600">
              <p className="text-sm">Humidity: {weather.main.humidity}%</p>
              <p className="text-sm">Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        ) : (
          <div className="text-red-500 text-center">City not found</div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
