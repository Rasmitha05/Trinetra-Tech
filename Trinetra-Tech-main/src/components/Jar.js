import React, { useState, useEffect } from 'react';
import './jar.css';
import { FaLeaf, FaSmog, FaFire } from 'react-icons/fa'; // Eco-friendly icons

const Jar = () => {
  const [emissions, setEmissions] = useState({
    green: 50, // Low emissions
    yellow: 50, // Medium emissions
    red: 50, // High emissions
  });

  const [hoveredSegment, setHoveredSegment] = useState(null); // Track hovered segment
  const [hoveredData, setHoveredData] = useState(null); // Store hovered data
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 }); // Track popup position
  const [fillPercentage, setFillPercentage] = useState({
    green: 0,
    yellow: 0,
    red: 0,
  });

  const fetchData = (type) => {
    const data = {
      green: {
        activities: [
          'Renewable energy usage (solar, wind, etc.)',
          'Energy-efficient appliances',
          'Sustainable transportation (cycling, walking)',
        ],
        suggestions: [
          'Install solar panels to reduce reliance on non-renewable energy.',
          'Switch to LED bulbs and energy-efficient appliances.',
          'Use public transport or carpool to reduce carbon footprint.',
        ],
      },
      yellow: {
        activities: [
          'Daily commute using personal vehicles',
          'Moderate use of air conditioning',
          'Household energy consumption',
        ],
        suggestions: [
          'Opt for electric or hybrid vehicles.',
          'Set AC temperature to 24°C or higher to save energy.',
          'Unplug devices when not in use to reduce standby power consumption.',
        ],
      },
      red: {
        activities: [
          'Industrial manufacturing processes',
          'High energy consumption in factories',
          'Frequent air travel',
        ],
        suggestions: [
          'Adopt green manufacturing practices.',
          'Use energy-efficient machinery and equipment.',
          'Offset carbon emissions by investing in reforestation projects.',
        ],
      },
    };
    return data[type];
  };

  const updateEmission = (type, value) => {
    setEmissions((prev) => ({
      ...prev,
      [type]: Math.max(0, Math.min(100, Number(value))),
    }));
  };

  useEffect(() => {
    const animateFill = async (color) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          setFillPercentage((prev) => {
            const newPercentage = { ...prev };
            if (newPercentage[color] < emissions[color]) {
              newPercentage[color] = Math.min(
                newPercentage[color] + 1,
                emissions[color]
              );
              return newPercentage;
            } else {
              clearInterval(interval);
              setTimeout(resolve, 500); // Add a small gap before the next segment starts
            }
            return newPercentage;
          });
        }, 20);
      });
    };

    const startAnimation = async () => {
      await animateFill('green'); // Fill green first
      await animateFill('yellow'); // Then yellow
      await animateFill('red'); // Finally red
    };

    startAnimation();
  }, [emissions]);

  const generateBubbles = (count) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 5; // Random delay up to 5s
      const duration = Math.random() * 5 + 10; // Increased duration to slow down bubbles (10s to 15s)

      const size = Math.random() * 10 + 10; // Increased size between 10px and 20px
      const left = Math.random() * 80 + 10; // Keep bubbles within a controlled range

      bubbles.push(
        <div
          key={i}
          className="bubble"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    }
    return bubbles;
  };

  const handleHover = (type, event) => {
    setHoveredSegment(type);
    setHoveredData(fetchData(type));
    const { clientX, clientY } = event;
    setPopupPosition({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setHoveredData(null);
  };

  return (
    <div className="jar-container">
      <div className="jar">
        {Object.entries(fillPercentage).map(([type, value]) => (
          <div
            key={type}
            className="segment"
            style={{
              height: `${value}%`,
              background: getGradient(type),
            }}
            onMouseEnter={(e) => handleHover(type, e)}
            onMouseLeave={handleMouseLeave}
            title={`Emission Source: ${type.toUpperCase()}`}
          >
            <div className="bubbles">{generateBubbles(2)}</div>
            <button className="segment-button">
              {type === 'green' && <FaLeaf className="icon" />}
              {type === 'yellow' && <FaSmog className="icon" />}
              {type === 'red' && <FaFire className="icon" />}
              {capitalize(type)}
            </button>
          </div>
        ))}
      </div>

      {/* Popup Box */}
      {hoveredSegment && (
        <div
          className="popup-box"
          style={{
            top: `${popupPosition.y + 10}px`,
            left: `${popupPosition.x + 10}px`,
          }}
        >
          <h3>{capitalize(hoveredSegment)} Emissions</h3>
          <p>
            <strong>Activities:</strong>
          </p>
          <ul>
            {hoveredData.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <p>
            <strong>Suggestions to Reduce Emissions:</strong>
          </p>
          <ul>
            {hoveredData.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* New emission information box */}
      <div className="emission-box">
        <p>
          <strong>Jar Fill Percentage:</strong>
        </p>
        <p>Green: {fillPercentage.green}%</p>
        <p>Yellow: {fillPercentage.yellow}%</p>
        <p>Red: {fillPercentage.red}%</p>
      </div>
    </div>
  );
};

const getGradient = (type) => {
  switch (type) {
    case 'green':
      return 'linear-gradient(145deg, rgba(56, 142, 60, 1.4), rgba(56, 142, 60, 1.4))'; // Green gradient
    case 'yellow':
      return 'linear-gradient(145deg, rgba(251, 192, 45, 1.4), rgba(251, 192, 45, 1.4))'; // Yellow gradient
    case 'red':
      return '#D32F2F'; // Red color
    default:
      return '#000';
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default Jar;
//return 'linear-gradient(145deg, rgba(250, 47, 47, 0.8), rgba(250, 47, 47, 0.4))'; // Red gradient
