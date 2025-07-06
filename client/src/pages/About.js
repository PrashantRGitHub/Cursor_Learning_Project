import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <Header />
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-700">About Us</h1>
      <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
        The Art of Living Clone is a platform inspired by the global Art of Living movement, dedicated to promoting peace, wellness, and happiness through yoga, meditation, and holistic programs. Our mission is to help individuals discover their inner potential and lead a balanced, joyful life.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
        <p className="text-gray-600 mb-6">
          To create a stress-free, violence-free society by empowering people with tools for personal transformation and social service.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-left text-gray-700 mb-6">
          <li>Transformative meditation and yoga programs</li>
          <li>Workshops on breathing techniques and stress management</li>
          <li>Wellness retreats and corporate wellness solutions</li>
          <li>Community service and volunteer opportunities</li>
        </ul>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Join Us</h2>
        <p className="text-gray-600">
          Whether you are new to meditation or looking to deepen your practice, our programs are designed for all levels. Join us and embark on a journey to a healthier, happier you!
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default About; 