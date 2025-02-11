import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home1 from './pages/Home1';
import Home from './pages/Home';
import Emission from './pages/CarbonEmission';
import Leader from './pages/Leaderboard';
import EditProfile from './components/Editprofiile';
import DataPage from './pages/Data';
import Support from './pages/Support';
import Loginbuss from './components/Loginbuss';
import Signupbuss from './components/Signupbuss';
import BusDashboard from './pages/BusDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Authenticated User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/emission" element={<Emission />} />
        <Route path="/leaderboard" element={<Leader />} />
        <Route path="/support" element={<Support />} />
        <Route path="/data" element={<DataPage />} />

        {/* Business Routes (Nested under /business) */}
        <Route path="/business">
          <Route index element={<Home />} />
          <Route path="login" element={<Loginbuss />} />
          <Route path="signup" element={<Signupbuss />} />
          <Route path="dashboard" element={<BusDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
