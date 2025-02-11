import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Vehicle Emissions', 'Air Conditioning', 'Other Household'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#FF6347', '#FFD700', '#32CD32'],
        hoverBackgroundColor: ['#FF4500', '#FFC300', '#228B22'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw + '%';
            return label;
          },
        },
      },
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          return value + '%';
        },
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '80%',
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginTop: '20px',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        Carbon Emissions by Source
      </h2>
      <div style={{ height: '400px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
