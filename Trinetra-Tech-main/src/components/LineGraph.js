import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  // Data for the line graph
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ], // X-axis labels (months)
    datasets: [
      {
        label: '2020', // Dataset for 2020
        data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 70, 65, 75], // Example data for 2020
        borderColor: '#FF6347', // Line color for 2020
        backgroundColor: 'rgba(255, 99, 71, 0.2)', // Fill color under the line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Size of data points
        fill: true, // Fill area under the line
      },
      {
        label: '2021', // Dataset for 2021
        data: [70, 65, 85, 82, 60, 58, 45, 55, 65, 75, 70, 80], // Example data for 2021
        borderColor: '#32CD32', // Line color for 2021
        backgroundColor: 'rgba(50, 205, 50, 0.2)', // Fill color under the line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Size of data points
        fill: true, // Fill area under the line
      },
      {
        label: '2022', // Dataset for 2022
        data: [75, 70, 90, 85, 65, 60, 50, 60, 70, 80, 75, 85], // Example data for 2022
        borderColor: '#1E90FF', // Line color for 2022
        backgroundColor: 'rgba(30, 144, 255, 0.2)', // Fill color under the line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Size of data points
        fill: true, // Fill area under the line
      },
    ],
  };

  // Options for the line graph
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable aspect ratio to allow full container size
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Monthly Carbon Emissions (2020 - 2022)', // Chart title
        font: {
          size: 18, // Title font size
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month', // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: 'Carbon Emission (metric tons)', // Y-axis title
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%', // Set width to 100% for responsiveness
        height: '500px', // Set height to 500px for consistency
        margin: '20px auto', // Added margin to space out from other components
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', // Black shadow effect
      }}
    >
      <Line data={data} options={options} height={500} />
    </div>
  );
};

export default LineGraph;
