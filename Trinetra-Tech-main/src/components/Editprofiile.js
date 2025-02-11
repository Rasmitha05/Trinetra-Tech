import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCar,
  FaMotorcycle,
  FaTv,
  FaFan,
  FaLightbulb,
  FaThermometerHalf,
  FaPlug,
  FaHome,
} from 'react-icons/fa';

const EditProfile = ({ email }) => {
  const [profile, setProfile] = useState({
    carCompanies: [],
    bikeCompanies: [],
    numberoftv: '',
    acTons: '',
    numberOfAc: 0,
    numberOfFans: 0,
    numberOfLights: 0,
    connectedDevices: [],
  });
  const [selectedCarCompany, setSelectedCarCompany] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [selectedBikeCompany, setSelectedBikeCompany] = useState('');
  const [selectedBikeModel, setSelectedBikeModel] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:4000/get-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }), // Send token in request body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data.');
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchProfile();
}, []);


  const carCompaniesList = {
    Toyota: ['Corolla', 'Camry', 'Prius', 'RAV4'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
    Ford: ['Mustang', 'F-150', 'Explorer', 'Escape'],
    Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
    BMW: ['3 Series', '5 Series', 'X5', 'X3'],
  };

  const bikeCompaniesList = {
    Yamaha: ['YZF-R1', 'MT-07', 'YZF-R6', 'MT-09'],
    Honda: ['CBR1000RR', 'CB500X', 'CRF250L', 'Rebel 500'],
    Kawasaki: ['Ninja 400', 'Ninja ZX-10R', 'Versys 650', 'Z900'],
    HarleyDavidson: ['Sportster', 'Street Glide', 'Fat Boy', 'Road King'],
    Ducati: ['Panigale V4', 'Monster', 'Multistrada', 'Scrambler'],
  };

  const handleAddCarCompany = () => {
    if (selectedCarCompany && selectedCarModel) {
      const newCar = { company: selectedCarCompany, model: selectedCarModel };
      setProfile({
        ...profile,
        carCompanies: [...profile.carCompanies, newCar],
      });
      setSelectedCarCompany('');
      setSelectedCarModel('');
    }
  };

  const handleRemoveCarCompany = (index) => {
    setProfile({
      ...profile,
      carCompanies: profile.carCompanies.filter((_, i) => i !== index),
    });
  };

  const handleAddBikeCompany = () => {
    if (selectedBikeCompany && selectedBikeModel) {
      const newBike = {
        company: selectedBikeCompany,
        model: selectedBikeModel,
      };
      setProfile({
        ...profile,
        bikeCompanies: [...profile.bikeCompanies, newBike],
      });
      setSelectedBikeCompany('');
      setSelectedBikeModel('');
    }
  };

  const handleRemoveBikeCompany = (index) => {
    setProfile({
      ...profile,
      bikeCompanies: profile.bikeCompanies.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/create-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, profile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update profile. Please try again.'
        );
      }

      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-center text-3xl font-bold text-green-700 mb-8">
        Edit Your Carbon Footprint Profile
      </h2>
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Car Section */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <FaCar className="mr-2" /> Car Details
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-green-800 font-semibold">
                Car Company
              </label>
              <select
                value={selectedCarCompany}
                onChange={(e) => {
                  setSelectedCarCompany(e.target.value);
                  setSelectedCarModel('');
                }}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a car company</option>
                {Object.keys(carCompaniesList).map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            {selectedCarCompany && (
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold">
                  Car Model
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedCarModel}
                    onChange={(e) => setSelectedCarModel(e.target.value)}
                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a car model</option>
                    {carCompaniesList[selectedCarCompany].map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddCarCompany}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {profile.carCompanies.length > 0 && (
              <div className="space-y-2">
                <p className="text-green-800 font-semibold">Added Cars:</p>
                {profile.carCompanies.map((car, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span>
                      {car.company} - {car.model}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCarCompany(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bike Section */}
        <div className="bg-green-50 p-6 rounded-lg mt-6">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <FaMotorcycle className="mr-2" /> Bike Details
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-green-800 font-semibold">
                Bike Company
              </label>
              <select
                value={selectedBikeCompany}
                onChange={(e) => {
                  setSelectedBikeCompany(e.target.value);
                  setSelectedBikeModel('');
                }}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a bike company</option>
                {Object.keys(bikeCompaniesList).map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            {selectedBikeCompany && (
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold">
                  Bike Model
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedBikeModel}
                    onChange={(e) => setSelectedBikeModel(e.target.value)}
                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a bike model</option>
                    {bikeCompaniesList[selectedBikeCompany].map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddBikeCompany}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {profile.bikeCompanies.length > 0 && (
              <div className="space-y-2">
                <p className="text-green-800 font-semibold">Added Bikes:</p>
                {profile.bikeCompanies.map((bike, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span>
                      {bike.company} - {bike.model}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBikeCompany(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Household Section */}
        <div className="bg-green-50 p-6 rounded-lg mt-6">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <FaHome className="mr-2" /> Household Details
          </h3>
          <div className="space-y-4">
            {[
              {
                label: 'Number of TVs',
                key: 'numberoftv',
                icon: <FaTv className="mr-2" />,
              },
              {
                label: 'AC Tons',
                key: 'acTons',
                icon: <FaThermometerHalf className="mr-2" />,
              },
              {
                label: 'Number of AC',
                key: 'numberOfAc',
                icon: <FaThermometerHalf className="mr-2" />,
              },
              {
                label: 'Number of Fans',
                key: 'numberOfFans',
                icon: <FaFan className="mr-2" />,
              },
              {
                label: 'Number of Lights',
                key: 'numberOfLights',
                icon: <FaLightbulb className="mr-2" />,
              },
            ].map(({ label, key, icon }) => (
              <div key={key} className="flex flex-col">
                <label className="text-green-800 font-semibold flex items-center">
                  {icon} {label}
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={label}
                  value={profile[key]}
                  onChange={(e) =>
                    setProfile({ ...profile, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition mt-6"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
