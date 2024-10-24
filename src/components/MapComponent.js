import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import './MapComponent.css'; // Import the CSS file for styling

// Fix default marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position

  const provider = new OpenStreetMapProvider();

  // Handle search input
  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      const results = await provider.search({ query: event.target.value });
      if (results.length > 0) {
        const { x, y } = results[0];
        setPosition([y, x]);
      }
    }
  };

  return (
    <div className="map-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Leaflet Map</h1>
      </nav>

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a location..."
          onKeyDown={handleSearch}
          className="search-input"
        />
      </div>

      {/* Map */}
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>
            You are here! <br /> Adjust location by searching.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
