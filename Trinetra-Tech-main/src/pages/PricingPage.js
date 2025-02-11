import React from 'react';

const PricingPage = () => {
  const pricingPlans = [
    {
      title: 'Scope 0 - Basic',
      price: '₹999',
      tokens: '50 API KEYS',
      features: [
        'Access to Data Visualization & Reports 📊',
        'Leaderboard Tracking 🌍',
        'Create API & Organization Registration 🏢',
        'Basic Carbon Footprint Calculation 🌱',
        'Email Support 📧',
      ],
      bgColor: 'bg-blue-50', // Light blue background
    },
    {
      title: 'Scope 1 - Advanced',
      price: '₹2999',
      tokens: '100 API KEYS',
      features: [
        'AI-Based Predictive Emission Insights 🔮',
        'Futuristic Emission Forecasting 📉',
        'Activity-Based Emissions Calculation ⚡',
        'Priority Support & API Access 🔗',
        'Basic Supplier Emission Reports 📦',
      ],
      bgColor: 'bg-green-50', // Light green background
    },
    {
      title: 'Scope 2 - Enterprise',
      price: '₹7999',
      tokens: '400 API KEYS',
      features: [
        'Supplier Emission Tracking 🏭',
        'Product & Activity-Based Emissions 🌿',
        'Full Carbon Footprint Breakdown 📌',
        'Custom Reports & Advanced Analytics 📑',
        '24/7 Premium Support ☎️',
        'Dedicated Carbon Consultant 👨‍💼',
      ],
      bgColor: 'bg-yellow-50', // Light yellow background
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-5xl font-bold text-green-700 mb-12 text-center">
        Choose Your Scope Plan
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`${plan.bgColor} border border-gray-200 rounded-lg shadow-lg p-8 w-80 transform transition-transform hover:scale-105 hover:shadow-2xl`}
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              {plan.title}
            </h2>
            <p className="text-4xl font-bold text-gray-800 mb-2">
              {plan.price}
            </p>
            <p className="text-lg text-gray-600 mb-6">{plan.tokens}</p>
            <ul className="text-left mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-700 text-base mb-2">
                  - {feature}
                </li>
              ))}
            </ul>
            <button className="bg-green-600 text-white rounded-md px-6 py-3 font-medium hover:bg-green-800 transition duration-300">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
