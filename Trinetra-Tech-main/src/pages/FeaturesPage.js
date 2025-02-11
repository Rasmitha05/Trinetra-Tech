import React from 'react';


const features = [
  {
    title: 'Futuristic Data Visualization',
    description:
      'Get real-time, interactive emission charts and dashboards to track and analyze your carbon footprint effectively.',
   
  },
  {
    title: 'AI-Based Predictive Insights',
    description:
      'Leverage AI-powered models to predict future emissions based on historical data and suggest reduction strategies.',
   
  },
  {
    title: 'Organization Carbon Registration',
    description:
      'Register your organization and measure your total carbon emissions, including scope 1, 2, and 3 emissions tracking.',
  
  },
  {
    title: 'Supplier Emission Calculation',
    description:
      'Evaluate your supply chain impact – track and manage supplier emissions for a more sustainable business approach.',
    
  },
  {
    title: 'Category-Wise Emission Breakdown',
    description:
      'Analyze emissions across different categories – transport, energy, waste, and production, for detailed insights.',
    
  },
  {
    title: 'IT & Server Emissions Monitoring',
    description:
      'Track the carbon footprint of IT infrastructure and cloud servers, ensuring energy-efficient computing operations.',
  
  },
];

const FeaturesPage = () => {
  return (
    <div className="py-10 px-6 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Carbon Footprint Features
      </h2>
      <p className="text-xl font-semibold text-white mb-8">
        Explore our advanced tools for tracking, predicting, and reducing carbon
        emissions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
          >
          
            <h3 className="text-lg font-semibold text-green-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
