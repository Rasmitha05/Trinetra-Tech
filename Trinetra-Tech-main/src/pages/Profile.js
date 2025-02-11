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

const Profile = ({ profile: initialProfile }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    carCompanies: [],
    bikeCompanies: [],
    numberoftv: '',
    acTons: '',
    numberOfAc: '',
    numberOfFans: '',
    numberOfLights: '',
    connectedDevices: [],
  });

  const [selectedCarCompany, setSelectedCarCompany] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [selectedBikeCompany, setSelectedBikeCompany] = useState('');
  const [selectedBikeModel, setSelectedBikeModel] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (initialProfile) setProfile(initialProfile);
  }, [initialProfile]);

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
      setProfile((prev) => ({
        ...prev,
        carCompanies: [
          ...prev.carCompanies,
          { company: selectedCarCompany, model: selectedCarModel },
        ],
      }));
      setSelectedCarCompany('');
      setSelectedCarModel('');
    }
  };

  const handleRemoveCarCompany = (index) => {
    setProfile((prev) => ({
      ...prev,
      carCompanies: prev.carCompanies.filter((_, i) => i !== index),
    }));
  };

  const handleAddBikeCompany = () => {
    if (selectedBikeCompany && selectedBikeModel) {
      setProfile((prev) => ({
        ...prev,
        bikeCompanies: [
          ...prev.bikeCompanies,
          { company: selectedBikeCompany, model: selectedBikeModel },
        ],
      }));
      setSelectedBikeCompany('');
      setSelectedBikeModel('');
    }
  };

  const handleRemoveBikeCompany = (index) => {
    setProfile((prev) => ({
      ...prev,
      bikeCompanies: prev.bikeCompanies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }
 console.log(profile)
    try {
      const response = await fetch('http://localhost:4000/create-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, profile }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to save profile.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-center text-3xl font-bold text-green-700 mb-8">
        Your Carbon Footprint Profile
      </h2>
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
              <>
            {/* Car Section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700"><FaCar className="mr-2" /> Car Details</h3>
              <select value={selectedCarCompany} onChange={(e) => setSelectedCarCompany(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select a car company</option>
                {Object.keys(carCompaniesList).map((company) => <option key={company} value={company}>{company}</option>)}
              </select>
              {selectedCarCompany && (
                <select value={selectedCarModel} onChange={(e) => setSelectedCarModel(e.target.value)} className="w-full p-2 border rounded mt-2">
                  <option value="">Select a car model</option>
                  {carCompaniesList[selectedCarCompany].map((model) => <option key={model} value={model}>{model}</option>)}
                </select>
              )}
              <button type="button" onClick={handleAddCarCompany} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Add</button>

              {profile.carCompanies.map((car, index) => (
                <div key={index} className="flex justify-between mt-2 p-2 border rounded">
                  {car.company} - {car.model} 
                  <button onClick={() => handleRemoveCarCompany(index)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>

            {/* Bike Section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700"><FaMotorcycle className="mr-2" /> Bike Details</h3>
              <select value={selectedBikeCompany} onChange={(e) => setSelectedBikeCompany(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select a bike company</option>
                {Object.keys(bikeCompaniesList).map((company) => <option key={company} value={company}>{company}</option>)}
              </select>
              {selectedBikeCompany && (
                <select value={selectedBikeModel} onChange={(e) => setSelectedBikeModel(e.target.value)} className="w-full p-2 border rounded mt-2">
                  <option value="">Select a bike model</option>
                  {bikeCompaniesList[selectedBikeCompany].map((model) => <option key={model} value={model}>{model}</option>)}
                </select>
              )}
              <button type="button" onClick={handleAddBikeCompany} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Add</button>

              {profile.bikeCompanies.map((bike, index) => (
                <div key={index} className="flex justify-between mt-2 p-2 border rounded">
                  {bike.company} - {bike.model} 
                  <button onClick={() => handleRemoveBikeCompany(index)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>



            {/* Household Inputs */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700">
                <FaHome className="mr-2" /> Household Details
              </h3>
              {[
                { label: 'Number of TVs', key: 'numberoftv', icon: <FaTv /> },
                {
                  label: 'AC Tons',
                  key: 'acTons',
                  icon: <FaThermometerHalf />,
                },
                {
                  label: 'Number of ACs',
                  key: 'numberOfAc',
                  icon: <FaThermometerHalf />,
                },
                {
                  label: 'Number of Fans',
                  key: 'numberOfFans',
                  icon: <FaFan />,
                },
                {
                  label: 'Number of Lights',
                  key: 'numberOfLights',
                  icon: <FaLightbulb />,
                },
              ].map(({ label, key, icon }) => (
                <div key={key} className="flex flex-col mt-2">
                  <label className="text-green-800 font-semibold flex items-center">
                    {icon} {label}
                  </label>
                  <input
                    type="number"
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={label}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 mt-6"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Profile;
