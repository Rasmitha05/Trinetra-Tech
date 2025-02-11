// Jar.js
import React, { useState, useEffect } from 'react';

const Jar = () => {
  const [levels, setLevels] = useState([0, 0, 0, 0]);

  // Simulate water levels rising every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLevels((prevLevels) => {
        return prevLevels.map((level, index) =>
          index === prevLevels.length - 1 ? 0 : level + 1
        );
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[200px] h-[400px] border-4 border-black rounded-lg bg-gray-100">
      <div
        className={`absolute bottom-0 w-full h-[25%] bg-green-1000 flex justify-center items-center text-2xl ${
          levels[0] > 0 ? 'animate-slosh' : ''
        }`}
      >
        💧
      </div>
      <div
        className={`absolute bottom-[25%] w-full h-[25%] bg-yellow-1000 flex justify-center items-center text-2xl ${
          levels[1] > 0 ? 'animate-slosh' : ''
        }`}
      >
        🌼
      </div>
      <div
        className={`absolute bottom-[50%] w-full h-[25%] bg-orange-1000 flex justify-center items-center text-2xl ${
          levels[2] > 0 ? 'animate-slosh' : ''
        }`}
      >
        📊
      </div>
      <div
        className={`absolute bottom-[75%] w-full h-[25%] bg-red-1000 flex justify-center items-center text-2xl ${
          levels[3] > 0 ? 'animate-slosh' : ''
        }`}
      >
        🚛
      </div>
      <div
        key={type}
        className="segment"
        style={{
          height: `${value}%`,
          backgroundColor: getColor(value),
        }}
      >
        <span className="icon">{getIcon(type)}</span>
      </div>
    </div>
  );
};

export default Jar;
