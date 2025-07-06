import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Brain, 
  Sun, 
  Users, 
  Award, 
  Globe, 
  Play,
  ArrowRight,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProgramCard from '../components/ProgramCard';
import TestimonialCard from '../components/TestimonialCard';
import StatsSection from '../components/StatsSection';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const solutions = [
    { name: 'Stress', icon: Brain, color: 'bg-blue-500', href: '/solutions/stress' },
    { name: 'Sleep', icon: Sun, color: 'bg-yellow-500', href: '/solutions/sleep' },
    { name: 'Mental Health', icon: Heart, color: 'bg-pink-500', href: '/solutions/mental-health' },
    { name: 'Anger', icon: Brain, color: 'bg-red-500', href: '/solutions/anger' },
    { name: 'Depression', icon: Heart, color: 'bg-purple-500', href: '/solutions/depression' },
    { name: 'Parenting', icon: Users, color: 'bg-green-500', href: '/solutions/parenting' },
    { name: 'Weight Loss', icon: Heart, color: 'bg-orange-500', href: '/solutions/weight-loss' },
    { name: 'Wellness', icon: Sun, color: 'bg-teal-500', href: '/solutions/wellness' },
    { name: 'Back Pain', icon: Heart, color: 'bg-indigo-500', href: '/solutions/back-pain' },
    { name: 'Relationships', icon: Users, color: 'bg-rose-500', href: '/solutions/relationships' },
    { name: 'Immunity', icon: Heart, color: 'bg-emerald-500', href: '/solutions/immunity' },
    { name: 'Fatigue', icon: Sun, color: 'bg-amber-500', href: '/solutions/fatigue' },
  ];

  const featuredPrograms = [
    {
      id: 1,
      name: 'Happiness Program',
      description: 'Experience the powerful Sudarshan Kriya breathing technique and learn meditation.',
      duration: '3 Days',
      price: 2500,
      originalPrice: 3500,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'meditation',
      featured: true,
      rating: 4.8,
      reviews: 1247
    },
    {
      id: 2,
      name: 'Sri Sri Yoga Classes',
      description: 'Traditional yoga practices for physical and mental well-being.',
      duration: 'Ongoing',
      price: 1500,
      originalPrice: 2000,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'yoga',
      featured: true,
      rating: 4.9,
      reviews: 892
    },
    {
      id: 3,
      name: 'Advanced Meditation Program',
      description: 'Deep dive into advanced meditation techniques for spiritual growth.',
      duration: '5 Days',
      price: 5000,
      originalPrice: 6500,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'meditation',
      featured: true,
      rating: 4.7,
      reviews: 567
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Kunal Kapoor',
      role: 'Bollywood Actor',
      content: 'The Art of Living programs have given me centeredness and capability in my life.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      id: 2,
      name: 'R. Ashwin',
      role: 'Indian Cricketer',
      content: 'I feel that in the morning after practicing Sudarshan Kriya, my mind is much clearer.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      id: 3,
      name: 'Vibhavari Deshpande',
      role: 'Actress & Director',
      content: 'Earlier you start better it is for your overall well-being and happiness.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    }
  ];

  const stats = [
    { number: '44', label: 'Years Legacy', icon: Award },
    { number: '10,000+', label: 'Centers Worldwide', icon: MapPin },
    { number: '180', label: 'Countries', icon: Globe },
    { number: '80 Crore+', label: 'Lives Touched', icon: Users }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Solutions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find a Solution for...
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover personalized programs designed to address your specific needs and challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={solution.href}
                  className="block p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 ${solution.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {solution.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Featured Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your life with our most popular meditation and yoga programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms && featuredPrograms.length > 0 ? (
              featuredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <ProgramCard program={program} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No featured programs available at the moment.</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/programs" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Programs</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Voices, Real Results
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people whose lives have been transformed through our programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TestimonialCard 
                  name={testimonial.name}
                  content={testimonial.content}
                  image={testimonial.image}
                  title={testimonial.role}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join millions of people worldwide who have discovered inner peace and happiness through The Art of Living
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enquiry" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Enquire Now
              </Link>
              <Link to="/programs" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Explore Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 