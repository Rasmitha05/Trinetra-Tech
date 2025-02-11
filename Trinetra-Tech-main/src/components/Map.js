import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
// Function to determine color based on emission level
const getColor = (emission) => {
  if (emission > 5000000000) return '#D50000'; // Very High (Red)
  if (emission > 2000000000) return '#FF6D00'; // High (Orange)
  if (emission > 1000000000) return '#FFD600'; // Medium (Yellow)
  if (emission > 500000000) return '#8FBC8F'; // Low (Light Green)
  return '#2E8B57'; // Very Low (Dark Green)
};

const Map = () => {
  const [geoData, setGeoData] = useState(null);
  const [emissionData, setEmissionData] = useState({});

  useEffect(() => {
    // Load GeoJSON for world map
    fetch('/ne_10m_admin_0_countries.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data));

    // Load carbon emissions data
    fetch('/carbon_emission_data.json')
      .then((res) => res.json())
      .then((data) => setEmissionData(data));
  }, []);

  // Styling function for each country
  const styleCountry = (feature) => {
    const isoCode = feature.properties.ISO_A3;
    const emission = emissionData[isoCode] || 0; // Default to 0 if not found
    return {
      fillColor: getColor(emission),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  return (
    <div className="map-container">
      <h2>Global Emissions Distribution</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={styleCountry}
            onEachFeature={(feature, layer) => {
              const isoCode = feature.properties.ISO_A3;
              const emission = emissionData[isoCode] || 'Data Not Available';
              const level =
                emission > 5000000000
                  ? 'Very High'
                  : emission > 2000000000
                  ? 'High'
                  : emission > 1000000000
                  ? 'Medium'
                  : emission > 500000000
                  ? 'Low'
                  : 'Very Low';

              layer.bindPopup(`
                <b>${feature.properties.ADMIN}</b><br>
                Carbon Emission: ${emission.toLocaleString()} kg CO₂<br>
                Level: ${level}
              `);
            }}
          />
        )}
      </MapContainer>

      {/* Emission Level Legend */}
      <div className="legend">
        <div>
          <span style={{ background: '#D50000' }}></span> Very High
        </div>
        <div>
          <span style={{ background: '#FF6D00' }}></span> High
        </div>
        <div>
          <span style={{ background: '#FFD600' }}></span> Medium
        </div>
        <div>
          <span style={{ background: '#8FBC8F' }}></span> Low
        </div>
        <div>
          <span style={{ background: '#2E8B57' }}></span> Very Low
        </div>
      </div>
    </div>
  );
};

export default Map;
