// src/App.js
import React from 'react';
import './App.css';
import Map from './Map';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
    <nav className="navbar">
      <h1>Leaflet Location Map</h1>
    </nav>
      <Map />
    </div>
  );
}

export default App;