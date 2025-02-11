import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyCarbonChart = ({ email }) => {
  // Define datasets for different users
  const userDatasets = {
    'temethon1@gmail.com': [], // No data as they didn't finish a day
    'temethon2@gmail.com': [3.2, 2.8, 3.0, 3.5, 0, 0, 0],
    'temethon3@gmail.com': [2.5, 2.7, 2.9, 3.2, 3.0, 2.8, 3.1],
  };

  // Get dataset for the user, if not available, return an empty dataset
  const userData = userDatasets[email] || [];

  // Data for the bar chart
  const data = {
    labels:
      userData.length > 0
        ? [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ]
        : [], // No labels if no data
    datasets:
      userData.length > 0
        ? [
            {
              label: 'Carbon Emission (metric tons)',
              data: userData,
              backgroundColor: '#9c27b0',
            },
          ]
        : [],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text:
          userData.length > 0
            ? 'Weekly Carbon Emissions'
            : `No Data Available for ${email}`,
      },
    },
    scales:
      userData.length > 0
        ? {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Carbon Emission (metric tons)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Days of the Week',
              },
            },
          }
        : {}, // No scales if no data
  };

  return (
    <div
      style={{
        width: '100%', // Set width to 100% for responsiveness
        height: '500px', // Set height to 500px for consistency
        margin: '0 auto',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', // Darker black shadow
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {userData.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p style={{ fontSize: '18px', color: '#FF6347' }}>
          No data available for this user
        </p>
      )}
    </div>
  );
};

export default WeeklyCarbonChart;