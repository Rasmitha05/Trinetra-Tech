import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:4000/leaderboard');
      const data = await response.json();

      // Ensure unique users based on _id (not email)
      const uniqueUsers = Array.from(
        new Map(data.map((user) => [user._id, user])).values()
      );

      setTopUsers(uniqueUsers);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  // Assign prizes based on rank
  const getPrize = (rank) => {
    const prizes = [
      '🏆 A Luxurious Eco-Friendly Trip to the Amazon Rainforest!',
      '💎 A Limited-Edition Handmade Sustainable Watch!',
      '🎁 A High-End Smart Indoor Garden System!',
    ];
    return prizes[rank - 1] || '🌱 A Personalized Eco-Warrior Certificate!';
  };

  // Top 3 and remaining users
  const topThreeUsers = topUsers.slice(0, 3);
  const remainingUsers = topUsers.slice(3);

  return (
    <div>
      {' '}
      <Navbar className="fixed top-0 left-0 w-full bg-white shadow-md z-10" />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center p-1">
        {/* Navbar */}

        {/* Leaderboard Content */}
        <div className="mt-24w-full max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            🏆 Eco-Warrior Leaderboard 🏆
          </h2>
          <p className="text-lg text-green-700 mb-8">
            Top Eco-Warriors reducing carbon footprints!
          </p>

          {/* Podium for Top 3 Users */}
          <div className="flex justify-center gap-6 mb-8">
            {topThreeUsers.map((user, index) => (
              <div
                key={user._id}
                className={`flex flex-col items-center bg-white p-6 rounded-xl shadow-lg w-48 relative 
                ${
                  index === 0
                    ? 'bg-yellow-200'
                    : index === 1
                    ? 'bg-gray-200'
                    : 'bg-orange-200'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center text-lg font-bold text-green-700 absolute -top-6 border-4 border-green-700 shadow-sm">
                  {index + 1}
                </div>
                <div className="mt-8 font-bold text-xl text-green-800">
                  {user.email}
                </div>
                <div className="text-orange-600 font-semibold text-lg">
                  {user.Totalemission ?? 'N/A'} kg CO₂
                </div>
                <div className="text-sm text-gray-600 text-center mt-2">
                  {getPrize(index + 1)}
                </div>
              </div>
            ))}
          </div>

          {/* Remaining Leaderboard List */}
          <div className="flex flex-col items-center space-y-4 w-full">
            {remainingUsers.map((user, index) => (
              <div
                key={user._id}
                className="grid grid-cols-3 items-center w-full max-w-2xl bg-white p-4 rounded-lg border-l-8 border-green-400 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="font-bold text-green-800 text-center text-lg">
                  {index + 4}
                </div>
                <div className="font-bold text-green-700 text-left text-lg">
                  {user.email}
                </div>
                <div className="font-semibold text-orange-600 text-right text-lg">
                  {user.Totalemission ?? 'N/A'} kg CO₂
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <button
          className="fixed bottom-6 left-6 px-6 py-3 text-lg rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow-lg"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
