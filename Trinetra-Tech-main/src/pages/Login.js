import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../images/video10.mp4';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      var data = await response.json();
      console.log(data);
      if (response.ok) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);

        // Call onLogin function if provided
        // if (onLogin) onLogin(response.token);

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.error || 'Invalid email or password');
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

      {/* Login Form with Reduced White Opacity */}
      <div className="relative z-10 max-w-md w-full bg-white bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-4">
          Login
        </h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-green-900 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-green-300 rounded focus:outline-none focus:border-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-900 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-green-300 rounded focus:outline-none focus:border-green-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-green-800 mt-4">
          Don't have an account?{' '}
          <a
            href="business/busslogin/business/busssignup"
            className="text-green-900 font-bold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
