import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  // const isMobile = useMediaQuery({ maxWidth: 768 }); // Unused variable - commented out

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navigation = [
    {
      name: 'Find a Solution',
      href: '/solutions',
      dropdown: [
        { name: 'Stress', href: '/solutions/stress' },
        { name: 'Sleep', href: '/solutions/sleep' },
        { name: 'Mental Health', href: '/solutions/mental-health' },
        { name: 'Anger', href: '/solutions/anger' },
        { name: 'Depression', href: '/solutions/depression' },
        { name: 'Parenting', href: '/solutions/parenting' },
        { name: 'Weight Loss', href: '/solutions/weight-loss' },
        { name: 'Wellness', href: '/solutions/wellness' },
        { name: 'Back Pain', href: '/solutions/back-pain' },
        { name: 'Relationships', href: '/solutions/relationships' },
        { name: 'Immunity', href: '/solutions/immunity' },
        { name: 'Fatigue', href: '/solutions/fatigue' },
      ]
    },
    {
      name: 'Meditation',
      href: '/meditation',
      dropdown: [
        { name: 'Happiness Program', href: '/programs/happiness-program' },
        { name: 'Happiness Program for Youth', href: '/programs/happiness-youth' },
        { name: 'Sahaj Samadhi Dhyana Yoga', href: '/programs/sahaj-samadhi' },
        { name: 'Online Meditation Workshop', href: '/programs/online-meditation' },
        { name: 'Advanced Meditation Program', href: '/programs/advanced-meditation' },
        { name: 'Children and Teens', href: '/programs/children-teens' },
        { name: 'Corporate Programs', href: '/programs/corporate' },
      ]
    },
    {
      name: 'Yoga',
      href: '/yoga',
      dropdown: [
        { name: 'Daily Online Yoga', href: '/programs/daily-yoga' },
        { name: 'Sri Sri Yoga Classes', href: '/programs/sri-sri-yoga' },
        { name: 'Sri Sri Yoga Deep Dive', href: '/programs/yoga-deep-dive' },
        { name: '200 Hrs Teacher Training', href: '/programs/teacher-training' },
        { name: 'Children and Teens', href: '/programs/yoga-children' },
        { name: 'Corporate Programs', href: '/programs/yoga-corporate' },
      ]
    },
    { name: 'Wisdom', href: '/wisdom' },
    { name: 'Events', href: '/events' },
    { name: 'Social Impact', href: '/social-impact' },
    { name: 'About Us', href: '/about' },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+91-80-28432321" className="flex items-center space-x-1 hover:text-primary-200 transition-colors">
                <Phone size={14} />
                <span>+91-80-28432321</span>
              </a>
              <a href="mailto:info@artofliving.org" className="flex items-center space-x-1 hover:text-primary-200 transition-colors">
                <Mail size={14} />
                <span>info@artofliving.org</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>India - English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">The Art of Living</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => item.dropdown && toggleDropdown(index)}
                  className="flex items-center space-x-1 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown size={16} />}
                </button>
                
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/enquiry" className="btn-primary">
              Enquire Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {navigation.map((item, index) => (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => item.dropdown && toggleDropdown(index)}
                    className="flex items-center justify-between w-full py-3 text-left text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  
                  {item.dropdown && activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 pb-2"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link to="/enquiry" className="btn-primary w-full justify-center">
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 