import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '10M+', label: 'People Served' },
    { number: '150+', label: 'Countries' },
    { number: '500+', label: 'Centers' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 