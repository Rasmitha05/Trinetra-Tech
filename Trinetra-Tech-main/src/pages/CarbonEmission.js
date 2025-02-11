import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CarbonEmission = ({ setEmissionData, setWeeklyData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Basic Usage Inputs
  const [usageHours, setUsageHours] = useState({
    car: '',
    bike: '',
    tv: '',
    ac: '',
    fans: '',
    lights: '',
  });

  // Flight Data Inputs
  const [flightData, setFlightData] = useState({
    iata_airport_from: '',
    iata_airport_to: '',
    flight_class: '',
    round_trip: false,
  });

  // Hotel Stay Inputs
  const [hotelData, setHotelData] = useState({
    country_code: '',
    city_name: '',
    number_of_nights: '',
    number_of_rooms: '',
  });

  // E-commerce Shipment Inputs
  const [ecommerceData, setEcommerceData] = useState({
    origin_country_code: '',
    destination_country_code: '',
    origin_postal_code: '',
    destination_postal_code: '',
    package_weight: '',
  });

  // Freight Shipping Inputs
  const [freightData, setFreightData] = useState({
    transport_mode: '',
    freight_weight: '',
    distance_value: '',
  });

  // Electricity Usage Inputs
  const [electricityData, setElectricityData] = useState({
    country_name: '',
    electricity_value: '',
    electricity_unit: '',
  });

  // Fuel Consumption Inputs
  const [fuelData, setFuelData] = useState({
    fuel_usage: '',
    fuel_name: '',
    fuel_value: '',
  });

  // Calculate total emissions for the progress bar
  const totalEmissions = Object.values(usageHours).reduce(
    (sum, hours) => sum + (Number(hours) || 0),
    0
  );

  // Calculate emission level for the progress bar
  const emissionLevel = (totalEmissions / 24) * 100;
  const jarColor =
    emissionLevel < 25
      ? 'bg-green-500'
      : emissionLevel < 50
      ? 'bg-yellow-400'
      : emissionLevel < 75
      ? 'bg-orange-500'
      : 'bg-red-600';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Calculate emissions for each category
      const vehicleEmissions = {
        car: usageHours.car * 2.31,
        bike: usageHours.bike * 0.12,
        tv: usageHours.tv * 0.05,
        ac: usageHours.ac * 1.5,
        fans: usageHours.fans * 0.02,
        lights: usageHours.lights * 0.01,
      };

      const flightEmissions = calculateFlightEmissions(flightData);
      const hotelEmissions = calculateHotelEmissions(hotelData);
      const ecommerceEmissions = calculateEcommerceEmissions(ecommerceData);
      const freightEmissions = calculateFreightEmissions(freightData);
      const electricityEmissions =
        calculateElectricityEmissions(electricityData);
      const fuelEmissions = calculateFuelEmissions(fuelData);

      // Total emissions
      const totalEmissions =
        Object.values(vehicleEmissions).reduce((sum, val) => sum + val, 0) +
        flightEmissions +
        hotelEmissions +
        ecommerceEmissions +
        freightEmissions +
        electricityEmissions +
        fuelEmissions;

      // Prepare data to send to the backend
      const carbonData = {
        token: JSON.parse(localStorage.getItem('token')),
        profile: {
          numberOfAc: usageHours.ac,
          numberOfFans: usageHours.fans,
          numberOfLights: usageHours.lights,
          approxWaterUsage: 0,
          smartDevices: {},
        },
        flightData: {
          ...flightData,
          emissions: flightEmissions,
        },
        hotelData: {
          ...hotelData,
          emissions: hotelEmissions,
        },
        ecommerceData: {
          ...ecommerceData,
          emissions: ecommerceEmissions,
        },
        freightData: {
          ...freightData,
          emissions: freightEmissions,
        },
        electricityData: {
          ...electricityData,
          emissions: electricityEmissions,
        },
        fuelData: {
          ...fuelData,
          emissions: fuelEmissions,
        },
        Totalemission: totalEmissions,
      };

      // Send data to the backend
      const response = await fetch('http://localhost:4000/save-carbon-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carbonData),
      });

      if (!response.ok) throw new Error('Failed to save carbon data');

      // Update state and navigate to the dashboard
      setEmissionData({
        ...vehicleEmissions,
        total: totalEmissions,
      });

      setWeeklyData([
        {
          date: new Date().toISOString().split('T')[0],
          value: totalEmissions,
        },
      ]);

      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to submit data:', err);
    }
  };

  // Helper functions for emission calculations
  const calculateFlightEmissions = (flightData) => {
    const distance = 5000; // Example distance in km (replace with actual calculation)
    const emissionFactor = 0.15; // kg CO₂/km
    const flightClassMultiplier =
      flightData.flight_class === 'Premium Economy' ? 1.5 : 1;
    const roundTripMultiplier = flightData.round_trip ? 2 : 1;
    return (
      distance * emissionFactor * flightClassMultiplier * roundTripMultiplier
    );
  };

  const calculateHotelEmissions = (hotelData) => {
    return hotelData.number_of_nights * hotelData.number_of_rooms * 10; // 10 kg CO₂/night
  };

  const calculateEcommerceEmissions = (ecommerceData) => {
    const distance = 10000; // Example distance in km (replace with actual calculation)
    const emissionFactor = 0.001; // kg CO₂/kg-km
    return ecommerceData.package_weight * distance * emissionFactor;
  };

  const calculateFreightEmissions = (freightData) => {
    const emissionFactor = 0.0001; // kg CO₂/kg-km
    return (
      freightData.freight_weight * freightData.distance_value * emissionFactor
    );
  };

  const calculateElectricityEmissions = (electricityData) => {
    const emissionFactor = 0.5; // kg CO₂/kWh
    return electricityData.electricity_value * emissionFactor;
  };

  const calculateFuelEmissions = (fuelData) => {
    const emissionFactor = 3.2; // kg CO₂/liter
    return fuelData.fuel_usage * emissionFactor;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            Vehicles& Househoulds
            {Object.keys(usageHours).map((key) => (
              <div key={key} className="flex flex-col text-left">
                <label className="font-medium text-green-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)} Usage (hours)
                </label>
                <input
                  type="number"
                  className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={usageHours[key]}
                  placeholder="Enter hours"
                  min="0"
                  max="24"
                  onChange={(e) =>
                    setUsageHours({ ...usageHours, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            Airport Details
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                IATA Airport From
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={flightData.iata_airport_from}
                onChange={(e) =>
                  setFlightData({
                    ...flightData,
                    iata_airport_from: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                IATA Airport To
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={flightData.iata_airport_to}
                onChange={(e) =>
                  setFlightData({
                    ...flightData,
                    iata_airport_to: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Flight Class
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={flightData.flight_class}
                onChange={(e) =>
                  setFlightData({ ...flightData, flight_class: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Round Trip
              </label>
              <input
                type="checkbox"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                checked={flightData.round_trip}
                onChange={(e) =>
                  setFlightData({ ...flightData, round_trip: e.target.checked })
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            Hotel stay
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Country Code
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={hotelData.country_code}
                onChange={(e) =>
                  setHotelData({ ...hotelData, country_code: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                City Name
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={hotelData.city_name}
                onChange={(e) =>
                  setHotelData({ ...hotelData, city_name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Number of Nights
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={hotelData.number_of_nights}
                onChange={(e) =>
                  setHotelData({
                    ...hotelData,
                    number_of_nights: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Number of Rooms
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={hotelData.number_of_rooms}
                onChange={(e) =>
                  setHotelData({
                    ...hotelData,
                    number_of_rooms: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            Ecommerce shipping estimate
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Origin Country Code
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ecommerceData.origin_country_code}
                onChange={(e) =>
                  setEcommerceData({
                    ...ecommerceData,
                    origin_country_code: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Destination Country Code
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ecommerceData.destination_country_code}
                onChange={(e) =>
                  setEcommerceData({
                    ...ecommerceData,
                    destination_country_code: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Origin Postal Code
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ecommerceData.origin_postal_code}
                onChange={(e) =>
                  setEcommerceData({
                    ...ecommerceData,
                    origin_postal_code: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Destination Postal Code
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ecommerceData.destination_postal_code}
                onChange={(e) =>
                  setEcommerceData({
                    ...ecommerceData,
                    destination_postal_code: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Package Weight
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ecommerceData.package_weight}
                onChange={(e) =>
                  setEcommerceData({
                    ...ecommerceData,
                    package_weight: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            Frieght Shipping Estimate
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Transport Mode
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={freightData.transport_mode}
                onChange={(e) =>
                  setFreightData({
                    ...freightData,
                    transport_mode: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Freight Weight
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={freightData.freight_weight}
                onChange={(e) =>
                  setFreightData({
                    ...freightData,
                    freight_weight: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Distance Value
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={freightData.distance_value}
                onChange={(e) =>
                  setFreightData({
                    ...freightData,
                    distance_value: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            Electricity Estimate
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Country Name
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={electricityData.country_name}
                onChange={(e) =>
                  setElectricityData({
                    ...electricityData,
                    country_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Electricity Value
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={electricityData.electricity_value}
                onChange={(e) =>
                  setElectricityData({
                    ...electricityData,
                    electricity_value: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Electricity Unit
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={electricityData.electricity_unit}
                onChange={(e) =>
                  setElectricityData({
                    ...electricityData,
                    electricity_unit: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            Fuel Combustion estimate
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Fuel Usage
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={fuelData.fuel_usage}
                onChange={(e) =>
                  setFuelData({ ...fuelData, fuel_usage: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Fuel Name
              </label>
              <input
                type="text"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={fuelData.fuel_name}
                onChange={(e) =>
                  setFuelData({ ...fuelData, fuel_name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="font-medium text-green-700 mb-1">
                Fuel Value
              </label>
              <input
                type="number"
                className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={fuelData.fuel_value}
                onChange={(e) =>
                  setFuelData({ ...fuelData, fuel_value: e.target.value })
                }
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center pt-24 pb-8 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-900 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            🌍 Carbon Emission Calculator
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Measure your daily carbon footprint and help protect our planet.
          </p>

          {/* Emission Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${jarColor}`}
                style={{ width: `${emissionLevel}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Your carbon footprint:{' '}
              <strong>{totalEmissions.toFixed(2)} kg CO₂</strong>
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 7}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderStep()}
            {step === 7 && (
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
              >
                Calculate
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Share Eco Score Section */}
      <div className="mt-8 p-6 bg-white shadow-md rounded-lg text-center mx-auto max-w-md">
        <h2 className="text-2xl font-bold text-green-700">
          Your Eco Score: {Math.max(0, 100 - Math.round(totalEmissions * 10))}
          /100 🌿
        </h2>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `I scored ${Math.max(
                    0,
                    100 - Math.round(totalEmissions * 10)
                  )}/100 on the Eco Score! 🌱 #EcoFriendly #CarbonFootprint`
                )}&url=${encodeURIComponent('https://yourapp.com/share')}`,
                '_blank'
              )
            }
          >
            Share on X
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `I scored ${Math.max(
                    0,
                    100 - Math.round(totalEmissions * 10)
                  )}/100 on the Eco Score! 🌱 #EcoFriendly #CarbonFootprint https://yourapp.com/share`
                )}`,
                '_blank'
              )
            }
          >
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmission;
