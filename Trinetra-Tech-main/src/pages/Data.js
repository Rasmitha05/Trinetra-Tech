import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DataPage = () => {
  const navigate = useNavigate();

  // Sample data (replace this with actual fetched data)
  const userData = {
    _id: '67a7f10fcfb59db56de73f43',
    email: 'user9@example.com',
    profile: {
      numberOfAc: 1,
      numberOfFans: 4,
      numberOfLights: 6,
      approxWaterUsage: 150,
    },
    smartDevices: {
      connectedDevices: ['Smart Thermostat', 'Smart Lights'],
    },
    flightData: {
      iata_airport_from: 'SYD',
      iata_airport_to: 'LAX',
      flight_class: 'Premium Economy',
      round_trip: true,
    },
    hotelData: {
      country_code: 'AU',
      city_name: 'Sydney',
      number_of_nights: 2,
      number_of_rooms: 1,
    },
    ecommerceData: {
      origin_country_code: 'AU',
      destination_country_code: 'US',
      origin_postal_code: '2000',
      destination_postal_code: '90001',
      package_weight: 3.5,
    },
    freightData: {
      transport_mode: 'Sea',
      freight_weight: 1500,
      distance_value: 7000,
    },
    electricityData: {
      country_name: 'Australia',
      electricity_value: 350,
      electricity_unit: 'kWh',
    },
    fuelData: {
      fuel_usage: 80,
      fuel_name: 'Petrol',
      fuel_value: 3.2,
    },
    Totalemission: '70',
  };

  // Reduction strategies for each category
  const reductionStrategies = {
    profile: [
      'Switch to energy-efficient appliances (e.g., LED lights, inverter ACs).',
      'Use fans instead of ACs whenever possible.',
      'Install water-saving fixtures to reduce water usage.',
    ],
    smartDevices: [
      'Optimize smart device usage to reduce standby power consumption.',
      'Use smart thermostats to regulate heating and cooling efficiently.',
    ],
    flightData: [
      'Choose economy class over premium classes to reduce emissions.',
      'Offset your flight emissions by investing in carbon credits.',
      'Prefer direct flights to reduce takeoff and landing emissions.',
    ],
    hotelData: [
      'Choose eco-friendly hotels with green certifications.',
      'Reduce the number of nights stayed by planning efficient trips.',
      'Reuse towels and linens to save water and energy.',
    ],
    ecommerceData: [
      'Opt for slower shipping methods to reduce transportation emissions.',
      'Choose local products to reduce the carbon footprint of shipping.',
      'Avoid unnecessary packaging by selecting minimal packaging options.',
    ],
    freightData: [
      'Use rail or sea transport instead of air freight for lower emissions.',
      'Consolidate shipments to reduce the number of trips.',
      'Optimize freight routes to minimize distance traveled.',
    ],
    electricityData: [
      'Switch to renewable energy sources like solar or wind power.',
      'Unplug devices when not in use to reduce phantom energy consumption.',
      'Use energy-efficient appliances and lighting.',
    ],
    fuelData: [
      'Switch to electric or hybrid vehicles to reduce fuel consumption.',
      'Use public transportation or carpool to reduce individual fuel usage.',
      'Maintain your vehicle regularly to improve fuel efficiency.',
    ],
  };

  return (
    <div>
      <Navbar className="fixed top-0 left-0 w-full bg-white shadow-md z-10" />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center p-6">
        {/* Navbar */}

        {/* Data Page Content */}
        <div className="mt-24 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            📊 Your Carbon Footprint Data
          </h2>

          {/* Profile Data */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🏠 Profile Data
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Number of ACs:</strong> {userData.profile.numberOfAc}
              </p>
              <p>
                <strong>Number of Fans:</strong> {userData.profile.numberOfFans}
              </p>
              <p>
                <strong>Number of Lights:</strong>{' '}
                {userData.profile.numberOfLights}
              </p>
              <p>
                <strong>Approx Water Usage:</strong>{' '}
                {userData.profile.approxWaterUsage} liters
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-green-700 mb-2">
                Reduction Strategies:
              </h4>
              <ul className="list-disc list-inside text-green-700">
                {reductionStrategies.profile.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Flight Data */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              ✈️ Flight Data
            </h3>
            <div className="space-y-2">
              <p>
                <strong>From:</strong> {userData.flightData.iata_airport_from}
              </p>
              <p>
                <strong>To:</strong> {userData.flightData.iata_airport_to}
              </p>
              <p>
                <strong>Class:</strong> {userData.flightData.flight_class}
              </p>
              <p>
                <strong>Round Trip:</strong>{' '}
                {userData.flightData.round_trip ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-green-700 mb-2">
                Reduction Strategies:
              </h4>
              <ul className="list-disc list-inside text-green-700">
                {reductionStrategies.flightData.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hotel Data */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🏨 Hotel Data
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Country:</strong> {userData.hotelData.country_code}
              </p>
              <p>
                <strong>City:</strong> {userData.hotelData.city_name}
              </p>
              <p>
                <strong>Number of Nights:</strong>{' '}
                {userData.hotelData.number_of_nights}
              </p>
              <p>
                <strong>Number of Rooms:</strong>{' '}
                {userData.hotelData.number_of_rooms}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-green-700 mb-2">
                Reduction Strategies:
              </h4>
              <ul className="list-disc list-inside text-green-700">
                {reductionStrategies.hotelData.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add more sections for other data (e.g., ecommerceData, freightData, etc.) */}

          {/* Total Emissions */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🌍 Total Emissions
            </h3>
            <p>
              <strong>Total Carbon Footprint:</strong> {userData.Totalemission}{' '}
              kg CO₂
            </p>
          </div>
        </div>

        {/* Back to Dashboard Button */}
       
      </div>
    </div>
  );
};

export default DataPage;