import React from 'react';

const TiltedImageCard = ({ title, imageSrc, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mt-1 text-center w-3/4 max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="text-black-900 mt-3 text-lg">{description}</p>
      </div>
      {/* Image Container with Border & Shadow */}
      <div className="relative w-4/5 max-w-2xl shadow-lg rounded-xl overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-auto" />
      </div>

      {/* Description */}
    </div>
  );
};

export default TiltedImageCard;
