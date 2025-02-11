import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaPlay } from 'react-icons/fa';

const CarbonDocsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-green-100 text-gray-900'
      } p-8`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center border-b pb-4 border-gray-300 dark:border-gray-700">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? 'text-gray-300' : 'text-green-600'
          }`}
        >
          {isDarkMode ? 'Carbon Docs' : 'Carbon'}
        </h1>
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </div>

      {/* Conditional Rendering */}
      {!isDarkMode ? (
        // Light Mode Content (Green Theme)
        <main className="text-center mt-12">
          <h2 className="text-4xl font-bold">
            All the emissions insight you need, in a single platform
          </h2>
          <Button className="mt-6 bg-green-400 hover:bg-green-500">
            Search
          </Button>

          <section className="mt-16 max-w-3xl mx-auto text-left">
            <h3 className="text-xl font-bold">
              🍃 What you can do with Carbon
            </h3>
            <p className="text-gray-700 mt-2">
              We calculate the carbon impact of almost anything using
              GHG-approved calculations.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-800">
              <li>🏢 Company data</li>
              <li>💵 Spend data</li>
              <li>📌 Product</li>
              <li>⚙️ Material data</li>
            </ul>
            <p className="mt-4">
              Integrate emissions data into your tool, app, or platform to help
              users make informed decisions.
            </p>
          </section>
        </main>
      ) : (
        // Dark Mode Content (Interactive Video Guides)
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-[#222222] p-6 border-r border-gray-700">
            <h2 className="text-2xl font-bold text-gray-300">Carbon Docs</h2>
            <nav className="mt-6 space-y-4">
              <a href="#" className="block text-gray-400 hover:text-white">
                Interactive Video Guides
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Smart Link Creator
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Structured Data Index
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-10">
            <header className="flex justify-between items-center border-b border-gray-700 pb-4">
              <h1 className="text-3xl font-bold text-gray-300">
                Interactive Video Guides
              </h1>
              <Button className="bg-gray-600 hover:bg-gray-500">
                Request Changes
              </Button>
            </header>

            <p className="text-gray-400 mt-4">
              Watch, practice, and guide others to success.
            </p>

            {/* Video Sections */}
            <section className="mt-8 space-y-8">
              <div className="bg-[#222222] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white">
                  Organization API
                </h3>
                <div className="mt-4 bg-black rounded-lg overflow-hidden relative">
                  <img
                    src="/placeholder-video.jpg"
                    alt="Video"
                    className="w-full h-56 object-cover opacity-50"
                  />
                  <button className="absolute inset-0 flex items-center justify-center text-white">
                    <FaPlay
                      size={40}
                      className="bg-gray-700 p-2 rounded-full"
                    />
                  </button>
                </div>
              </div>

              <div className="bg-[#222222] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white">Product API</h3>
                <div className="mt-4 bg-black rounded-lg overflow-hidden relative">
                  <img
                    src="/placeholder-video.jpg"
                    alt="Video"
                    className="w-full h-56 object-cover opacity-50"
                  />
                  <button className="absolute inset-0 flex items-center justify-center text-white">
                    <FaPlay
                      size={40}
                      className="bg-gray-700 p-2 rounded-full"
                    />
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}

      <footer className="mt-16 text-center text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        &copy; 2025 Carbon. All rights reserved.
      </footer>
    </div>
  );
};

export default CarbonDocsPage;
