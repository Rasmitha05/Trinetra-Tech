import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Jar from '../components/Jar';
import LineGraph from '../components/LineGraph';
import BarGraph from '../components/BarGraph';
import PieChart from '../components/PieChart';
import carbon2 from '../images/carbon2.jpg';
import carbon5 from '../images/carbon5.webp';
import plant from '../images/plant.png';
import CarbonEmissionBreakdown from '../components/Breakdown';
import TimeBasedCarbonEmission from '../components/Time';

const photos = [carbon5, carbon2];

const emissionsData = [
  { state: 'Uttar Pradesh', emission: '10,000 tons' },
  { state: 'Maharashtra', emission: '9,500 tons' },
  { state: 'Tamil Nadu', emission: '8,200 tons' },
  { state: 'Karnataka', emission: '7,800 tons' },
  { state: 'Rajasthan', emission: '7,500 tons' },
  { state: 'West Bengal', emission: '6,800 tons' },
];

const Dashboard = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [streak, setStreak] = useState(4);
  const navigate = useNavigate();

  // Check local storage for authentication
  useEffect(() => {
    const userData = localStorage.getItem('token');
    if (!userData) {
      navigate('/login'); // Redirect to login if user is not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const createStreakGrid = () => {
    const streakBoxes = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      streakBoxes.push(
        <div key={i} className="relative w-10 h-10 m-1">
          {i < streak ? (
            <div className="relative group">
              <div className="w-full h-full bg-gradient-to-br from-green-400 rounded-lg flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={plant} alt="plant" />
              </div>
              <div className="text-white text-sm">{daysOfWeek[i]}</div>
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs text-center rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Day {i + 1}: Your carbon emission is less
              </div>
            </div>
          ) : (
            <div className="bg-gray-400 w-full h-full rounded-lg flex justify-center items-center shadow-inner">
              <span className="text-gray-600 text-sm">{daysOfWeek[i]}</span>
            </div>
          )}
        </div>
      );
    }
    return streakBoxes;
  };

  return (
    <div className="min-h-screen bg-dark-blue relative">
      <div className="relative mt-15 flex justify-center">
        <div className="relative w-full" style={{ height: '70px' }}>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      <Navbar />

      <div className="bg-green-700 py-2 mt-4">
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-marquee text-white font-semibold text-lg">
            {emissionsData.map((data, index) => (
              <span key={index} className="mr-10">
                {data.state}: {data.emission} Emissions
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 mx-auto w-full max-w-7xl">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="text-white font-semibold text-center mb-3 text-lg">
            🌱 7-Day Carbon Reduction Streak 🌱
          </div>
          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {createStreakGrid()}
          </div>
          <div className="text-center text-gray-400 mt-5 text-sm">
            Complete 7 days to unlock a special eco-friendly badge!
          </div>
        </div>
      </div>

      <div className="mt-3 mx-auto w-full max-w-1xl">
        <CarbonEmissionBreakdown />
      </div>

      <div className="flex justify-between items-start mt-8 mx-12 gap-4">
        <div className="w-1/3 h-[400px]">
          <PieChart />
        </div>

        <div className="w-1/3 h-[400px] flex justify-center">
          <div className="relative h-full">
            <Jar />
          </div>
        </div>

        <div className="w-1/3 h-[400px]">
          <BarGraph />
        </div>
      </div>

      <div className="w-full max-w-6xl h-[500px] mt-40 mx-auto">
        <LineGraph />
      </div>

      <div className="mt-8 mx-4 mb-4 w-full max-w-1xl">
        <TimeBasedCarbonEmission />
      </div>
    </div>
  );
};

export default Dashboard;
