import React from 'react';

const ProgramCard = ({ title, description, image, price, duration, category, onEnroll, onLearnMore }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
        ${price}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{duration}</span>
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
      <div className="flex gap-3">
        <button
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          onClick={onEnroll}
        >
          Enroll Now
        </button>
        <button
          className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
          onClick={onLearnMore}
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);

export default ProgramCard; 