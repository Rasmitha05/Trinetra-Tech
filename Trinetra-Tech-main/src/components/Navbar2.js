import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Button from '../pages/Button';

const Navbar2 = () => {
  const menuItems = [
    {
      title: 'Data visualization',
      options: [
        {
          name: 'Magic jar',
          id: 'jar',
          description: 'Explore our data, manage suppliers, and track progress',
          icon: '📊',
          href: '#jar',
        },
        {
          name: 'Bar graphs',
          id: 'bar',
          description: 'Track our latest features and updates',
          icon: '🔄',
          href: '#bar',
        },
        {
          name: 'Line graph',
          id: 'line',
          description: 'Track our latest features and updates',
          icon: '🔄',
          href: '#line',
        },
      ],
    },
    {
      title: 'Solutions',
      options: [
        {
          name: 'emission-calculator',
          id: 'emission-calculator',
          description: 'DitchCarbon ingests millions of data points',
          icon: '📂',
          href: '#emissioncalculator',
        },
        {
          name: 'Integrations',
          id: 'integrations',
          description: 'Connect with your existing tools',
          icon: '🛠️',
          href: '#iotdevices',
        },
      ],
    },
    ,
    {
      title: 'Achievements',
      options: [
        {
          name: 'Streaks',
          id: 'streak',
          description: 'DitchCarbon ingests millions of data points',
          icon: '📂',
          href: '#streak',
        },
        {
          name: 'LeaderBoard',
          id: 'leaderboard',
          description: 'Connect with your existing tools',
          icon: '🛠️',
          href: '#leaderboard',
        },
      ],
    },
    {
      title: 'Prices',
      options: [
        {
          name: 'Bonsai plant',
          id: 'data',
          description: 'DitchCarbon ingests millions of data points',
          icon: '📂',
          href: '#bonsai',
        },
      ],
    },
  ];

  const [openMenu, setOpenMenu] = useState(null);
  const [dropdownContent, setDropdownContent] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const navigate = useNavigate();

  let timeoutId = null;

  const handleMouseEnter = (index, event) => {
    clearTimeout(timeoutId);
    setOpenMenu(index);
    setDropdownContent(menuItems[index].options);

    const rect = event.target.getBoundingClientRect();
    setDropdownPosition({ left: rect.left, top: rect.bottom + window.scrollY });
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setOpenMenu(null);
      setDropdownContent([]);
    }, 300);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-green-700">Carbon</div>

      {/* Menu Items */}
      <div className="flex space-x-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center space-x-1 text-gray-800 hover:text-black font-bold text-lg px-4 py-2">
              <span>{item.title}</span>
              <ChevronDown size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Shared Dropdown Container */}
      {openMenu !== null && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-4 transition-opacity duration-200"
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top}px`,
          }}
          onMouseEnter={() => clearTimeout(timeoutId)}
          onMouseLeave={handleMouseLeave}
        >
          {dropdownContent.map((option, i) => (
            <a
              key={i}
              href={option.href}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <span className="text-lg">{option.icon}</span>
              <div>
                <p className="font-semibold text-gray-900">{option.name}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-x-2">
        <Button
          className="bg-green-700 text-white px-3 py-2 rounded-md font-bold shadow-md"
          onClick={() => navigate('/business')}
        >
          Business
        </Button>

        <Button
          className="bg-green-700 text-white px-4 py-2 rounded-md font-bold shadow-md"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar2;
