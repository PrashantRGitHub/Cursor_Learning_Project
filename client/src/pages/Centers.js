import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Centers = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <Header />
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-700">
        Our Centers
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Find Art of Living centers near you. We have centers across the country offering programs, workshops, and community events.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <p className="text-gray-600">
          (A list or map of centers would be shown here. You can fetch and display center data from your backend or a static list.)
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Centers; 