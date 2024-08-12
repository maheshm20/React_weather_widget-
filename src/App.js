import React from 'react';
import WeatherWidget from './components/WeatherWidget';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Weather App</h1>
      </header>
      <main className="flex-grow flex justify-center items-start p-4">
        <WeatherWidget />
      </main>
    </div>
  );
}

export default App;
