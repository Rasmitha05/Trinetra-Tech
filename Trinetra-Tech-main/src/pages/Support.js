import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SupportPage = () => {
  const navigate = useNavigate();

  // Sample nature events data
  const natureEvents = [
    {
      id: 1,
      title: 'Beach Cleanup Drive',
      location: 'Miami Beach, Florida',
      date: 'October 15, 2023',
      description:
        'Join us in cleaning up Miami Beach and protecting marine life.',
      image: 'https://images.unsplash.com/photo-1508317469940-e3de49ba902e',
      fundsRaised: 1200,
      goal: 5000,
    },
    {
      id: 2,
      title: 'Tree Planting Campaign',
      location: 'Yellowstone National Park',
      date: 'November 5, 2023',
      description: 'Help us plant 10,000 trees to restore the natural habitat.',
      image: 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6',
      fundsRaised: 3500,
      goal: 10000,
    },
    {
      id: 3,
      title: 'Wildlife Conservation Fundraiser',
      location: 'Serengeti National Park, Tanzania',
      date: 'December 10, 2023',
      description: 'Support wildlife conservation efforts in the Serengeti.',
      image: 'https://images.unsplash.com/photo-1550358864-518f202c02ba',
      fundsRaised: 800,
      goal: 2000,
    },
  ];

  return (
    <div>
      <Navbar className="fixed top-0 left-0 w-full bg-white shadow-md z-10" />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center p-6">
        {/* Navbar */}

        {/* Support Page Content */}
        <div className="mt-24 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            🌿 Support Nature Events 🌿
          </h2>
          <p className="text-lg text-green-700 mb-8 text-center">
            Join hands with us to protect the environment. Participate in events
            or raise funds for a greener planet.
          </p>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {natureEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {event.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">📅 {event.date}</p>
                  <p className="text-green-700 mb-4">{event.description}</p>

                  {/* Fundraising Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(event.fundsRaised / event.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    🎯 Raised ${event.fundsRaised} of ${event.goal}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      onClick={() =>
                        alert(`Thank you for supporting ${event.title}!`)
                      }
                    >
                      Donate Now
                    </button>
                    <button
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      onClick={() =>
                        alert(`You are now a fundraiser for ${event.title}!`)
                      }
                    >
                      Raise Funds
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <button
          className="fixed bottom-6 right-6 px-6 py-3 text-lg rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow-lg"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SupportPage;
