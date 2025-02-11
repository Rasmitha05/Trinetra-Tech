import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../images/video8.mp4'; // Import the video
import ReactCountryFlag from 'react-country-flag'; // For displaying flags
import countries from './countries'; // A list of countries with their codes

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('US'); // Default to United States
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, name, password, country }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Store token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);

        // Call onSignup function if provided
        // if (onSignup) onSignup(data.token);

        // Redirect to profile
        navigate('/profile');
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Signup Form */}
      <div className="relative z-10 max-w-md w-full bg-white bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-md border border-green-100">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Join the Green Movement 🌱
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Country
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-500 appearance-none"
                required
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ReactCountryFlag
                  countryCode={country}
                  svg
                  style={{ width: '1.5em', height: '1.5em' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300 flex items-center justify-center"
          >
            <span className="mr-2">Signup</span>
            <span>🌍</span>
          </button>
        </form>

        <p className="text-center text-green-700 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-bold text-green-800 hover:underline hover:text-green-900"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
