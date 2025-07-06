import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'breathing', name: 'Breathing Techniques' },
    { id: 'wellness', name: 'Wellness' }
  ];

  useEffect(() => {
    // Simulate fetching programs from API
    const fetchPrograms = async () => {
      try {
        // In a real app, this would be an API call
        const mockPrograms = [
          {
            id: 1,
            title: 'Art of Living Happiness Program',
            category: 'meditation',
            duration: '3 Days',
            price: 299,
            description: 'Learn powerful breathing techniques and meditation practices for stress relief and inner peace.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            features: ['Stress Relief', 'Better Sleep', 'Increased Energy', 'Inner Peace']
          },
          {
            id: 2,
            title: 'Sudarshan Kriya Workshop',
            category: 'breathing',
            duration: '2 Days',
            price: 199,
            description: 'Master the ancient breathing technique that brings harmony to body, mind, and spirit.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
            features: ['Deep Breathing', 'Mental Clarity', 'Emotional Balance', 'Physical Vitality']
          },
          {
            id: 3,
            title: 'Yoga for Beginners',
            category: 'yoga',
            duration: '4 Weeks',
            price: 149,
            description: 'Perfect for beginners, learn fundamental yoga poses and breathing techniques.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
            features: ['Flexibility', 'Strength Building', 'Mind-Body Connection', 'Stress Reduction']
          },
          {
            id: 4,
            title: 'Corporate Wellness Program',
            category: 'wellness',
            duration: '1 Day',
            price: 399,
            description: 'Transform your workplace with stress management and team building techniques.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
            features: ['Team Building', 'Stress Management', 'Productivity Boost', 'Work-Life Balance']
          },
          {
            id: 5,
            title: 'Advanced Meditation Retreat',
            category: 'meditation',
            duration: '7 Days',
            price: 899,
            description: 'Deep dive into advanced meditation practices in a serene retreat setting.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            features: ['Deep Meditation', 'Spiritual Growth', 'Inner Transformation', 'Peaceful Environment']
          },
          {
            id: 6,
            title: 'Breathing for Health',
            category: 'breathing',
            duration: '1 Day',
            price: 99,
            description: 'Learn breathing techniques for better health, energy, and vitality.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
            features: ['Better Health', 'Increased Energy', 'Improved Focus', 'Natural Healing']
          }
        ];
        
        setPrograms(mockPrograms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Programs
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover transformative programs designed to bring peace, happiness, and wellness into your life
          </p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPrograms.map((program) => (
            <motion.div
              key={program.id}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${program.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    {program.duration}
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {program.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {program.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                    Enroll Now
                  </button>
                  <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No programs found in this category
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new programs.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who have discovered inner peace and happiness through our programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
              Contact Us
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300">
              View All Programs
            </button>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Programs; 