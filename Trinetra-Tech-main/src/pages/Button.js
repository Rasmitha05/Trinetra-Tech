import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
