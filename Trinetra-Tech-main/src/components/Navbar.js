import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaCalculator,
  FaTrophy,
  FaDatabase,
  FaLifeRing,
  FaUserCircle,
  FaTachometerAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="relative bg-gradient-to-r from-green-700 to-green-900 py-2 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="https://www.shutterstock.com/image-vector/logo-design-eagle-nature-bird-260nw-2471522591.jpg"
            alt="Carbon Footprint Logo"
            className="h-10 bg-white rounded-full p-1 border-2 border-green-300"
          />
          <div className="text-white">
            <p className="text-xl font-bold">Carbon Footprint</p>
            <p className="text-xs font-light">
              Calculate & Visualize Emissions
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="hidden md:flex space-x-6 font-semibold text-white">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <FaTachometerAlt className="text-lg" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/emission"
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <FaCalculator className="text-lg" />
              <span>Emission</span>
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <FaTrophy className="text-lg" />
              <span>Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/data"
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <FaDatabase className="text-lg" />
              <span>Data</span>
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <FaLifeRing className="text-lg" />
              <span>Support</span>
            </Link>
          </li>
        </ul>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer text-white"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle className="text-2xl hover:text-green-200 transition duration-300" />
            <span className="text-sm font-semibold">John Doe</span>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-all duration-300">
              <ul className="py-2">
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 cursor-pointer">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 cursor-pointer">
                  <Link to="/settings">Settings</Link>
                </li>
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
