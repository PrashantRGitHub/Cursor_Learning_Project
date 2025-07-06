import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProgramDetail = () => {
  const { id } = useParams();

  // In a real app, you would fetch program details using the id
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-700">
          Program Details
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Details for program ID: <span className="font-mono">{id}</span>
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <p className="text-gray-600">
            (Program details would be shown here. You can fetch and display more info based on the program ID.)
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgramDetail; 