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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyCarbonChart = () => {
  const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'Carbon Emission (metric tons)',
        data: [3.2, 2.8, 3.0, 3.5, 3.1, 2.9, 3.3],
        backgroundColor: '#9c27b0',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Carbon Emissions',
      },
    },
    scales: {
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
    },
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
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyCarbonChart;
