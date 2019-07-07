import React from 'react';
import WeatherMap from './WeatherMap.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Get your weather anywhere, anytime.
        </p>
        <WeatherMap />
      </header>
    </div>
  );
}

export default App;
