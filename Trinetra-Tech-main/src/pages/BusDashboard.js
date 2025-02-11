import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import Switch from '../components/switch';
import  Button  from './Button';

const Dashboard = () => {
  const [isUsingIndustryFactors, setIsUsingIndustryFactors] = useState(false);

  const carbonIntensityData = [
    { year: 2019, emissions: 27000, spend: 25000, intensity: 1.08 },
    { year: 2020, emissions: 28000, spend: 26000, intensity: 1.05 },
    { year: 2021, emissions: 29000, spend: 27000, intensity: 1.03 },
    { year: 2022, emissions: 25000, spend: 23000, intensity: 1.09 },
    { year: 2023, emissions: 31000, spend: 28000, intensity: 1.11 },
  ];

  const reportingStatusData = [
    { name: 'Has Any Document', value: 90, color: '#28a745' },
    { name: 'Disclosed to CDP', value: 85, color: '#28a745' },
    { name: 'Committed to SBTi', value: 40, color: '#28a745' },
    { name: 'Has Scope 1 Data', value: 75, color: '#17a2b8' },
    { name: 'Has Scope 2 Data', value: 82, color: '#007bff' },
    { name: 'Has Scope 3 Data', value: 70, color: '#0056b3' },
    { name: 'Has Organization Emission Factor', value: 50, color: '#4B0082' },
  ];

  const sbtiProgressData = [
    { year: 2020, committed: 5 },
    { year: 2021, committed: 10 },
    { year: 2022, committed: 20 },
    { year: 2023, committed: 25 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Top Summary Cards */}
      <Card className="col-span-1">
        <CardContent className="flex flex-col items-start">
          <h2 className="text-xl font-bold">Embodied Emissions</h2>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold">
              {isUsingIndustryFactors ? '202K kgCO₂e' : '157K kgCO₂e'}
            </p>
            <Switch
              checked={isUsingIndustryFactors}
              onCheckedChange={setIsUsingIndustryFactors}
            />
          </div>
          <p className="text-sm text-gray-500">
            {isUsingIndustryFactors
              ? 'Using industry emission factors only'
              : 'Using organization emission factors when available'}
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-bold">Spend</h2>
          <p className="text-3xl font-semibold">$171,550.00</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-bold">Organizations</h2>
          <p className="text-3xl font-semibold">22</p>
        </CardContent>
      </Card>

      {/* Carbon Intensity of Spend */}
      <Card className="col-span-3">
        <CardContent>
          <h2 className="text-xl font-bold">Carbon intensity of spend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carbonIntensityData}>
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="emissions"
                fill="#28a745"
                name="Embodied Emissions (kgCO₂e)"
              />
              <Bar
                yAxisId="left"
                dataKey="spend"
                fill="#17a2b8"
                name="Total Spend ($)"
              />
              <Line
                yAxisId="right"
                dataKey="intensity"
                stroke="#007bff"
                name="Carbon Intensity (kgCO₂e/$)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reporting Status */}
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold">Reporting Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={reportingStatusData}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* SBTI Progress */}
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-bold">SBTI Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sbtiProgressData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="committed" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Documentation Button */}
      <div className="col-span-3 flex justify-end mt-4">
        <Button onClick={() => window.open('/documentation', '_blank')}>
          Documentation
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
