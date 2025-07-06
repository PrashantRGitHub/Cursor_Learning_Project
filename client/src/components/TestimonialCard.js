import React from 'react';

const TestimonialCard = ({ name, content, image, title }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
    {image && (
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-100"
      />
    )}
    <h3 className="text-lg font-bold text-blue-700 mb-1">{name}</h3>
    {title && <p className="text-sm text-gray-500 mb-2">{title}</p>}
    <p className="text-gray-700 italic mb-2">"{content}"</p>
  </div>
);

export default TestimonialCard; 