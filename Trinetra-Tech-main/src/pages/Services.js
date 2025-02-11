import React from 'react';
import { FaChartLine, FaCloud, FaIndustry, FaBolt } from 'react-icons/fa';

const services = [
  {
    title: 'Data Visualization & Analytics',
    description:
      'Gain deep insights with real-time carbon footprint analytics, interactive dashboards, and reports.',
    icon: <FaChartLine className="text-4xl text-blue-500" />,
  },
  {
    title: 'API Integration & Connectivity',
    description:
      'Seamlessly integrate with global carbon footprint databases and regulatory APIs for accurate data tracking.',
    icon: <FaCloud className="text-4xl text-green-500" />,
  },
  {
    title: 'Supplier Emission Tracking',
    description:
      'Monitor and report indirect emissions from suppliers, helping businesses achieve Scope 3 compliance.',
    icon: <FaIndustry className="text-4xl text-yellow-500" />,
  },
  {
    title: 'Future Emission Predictions',
    description:
      'Leverage AI-driven models to predict future carbon emissions based on usage patterns and industry trends.',
    icon: <FaBolt className="text-4xl text-red-500" />,
  },
];

const Service = () => {
  return (
    <section className="py-10 px-4 md:px-20 bg-gray-100">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-800">
        Our Carbon Footprint Services 🌱
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {service.title}
            </h3>
            <p className="text-gray-700 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
