import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { FaLeaf, FaCloud, FaRecycle } from 'react-icons/fa'; // Import icons

const TimeBasedCarbonEmission = () => {
  const timePeriods = [
    {
      name: 'One Day',
      emissions: '0.5 MT',
      gradientStart: '#68d391',
      gradientEnd: '#48bb78',
      icon: <FaLeaf className="text-white text-3xl" />, // Eco-friendly leaf icon
    },
    {
      name: 'One Week',
      emissions: '3.2 MT',
      gradientStart: '#38b2ac',
      gradientEnd: '#2f855a',
      icon: <FaCloud className="text-white text-3xl" />, // Cloud icon for emissions
    },
    {
      name: 'One Month',
      emissions: '12.8 MT',
      gradientStart: '#48bb78',
      gradientEnd: '#38a169',
      icon: <FaRecycle className="text-white text-3xl" />, // Recycle icon for sustainability
    },
  ];

  return (
    <div>
      <Typography
        variant="h5"
        className="text-white font-bold text-center mb-6 text-2xl"
      >
        Time-Based Carbon Emission
      </Typography>
      <Grid container spacing={4}>
        {timePeriods.map((period, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={{
                background: `linear-gradient(to right, ${period.gradientStart}, ${period.gradientEnd})`,
              }}
              className="rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-1">
                  {period.icon} {/* Add the icon */}
                  <Typography variant="h5" className="text-white">
                    {period.name}
                  </Typography>
                </div>
                <Typography variant="subtitle1" className="text-white mt-2">
                  Emissions:
                </Typography>
                <Typography
                  variant="h4"
                  className={`font-bold text-white mt-1 uppercase tracking-wider ${
                    parseFloat(period.emissions) > 3 ? 'text-red-500' : ''
                  }`}
                >
                  {period.emissions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TimeBasedCarbonEmission;
