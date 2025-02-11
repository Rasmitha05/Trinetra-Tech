import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with', email, password);
    navigate('/business/dashboard')
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Business Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-left font-semibold mb-1">
            Organization Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your business email"
            required
            className="p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-left font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 rounded mt-2 hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="mt-3">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </p>
          <p className="mt-3">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/business/signup')}
              className="text-blue-500 font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
