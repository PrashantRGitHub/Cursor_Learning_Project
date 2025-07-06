import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
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
    ],
    meditation: [
      { name: 'Happiness Program', href: '/programs/happiness-program' },
      { name: 'Happiness Program for Youth', href: '/programs/happiness-youth' },
      { name: 'Sahaj Samadhi Dhyana Yoga', href: '/programs/sahaj-samadhi' },
      { name: 'Online Meditation Workshop', href: '/programs/online-meditation' },
      { name: 'Advanced Meditation Program', href: '/programs/advanced-meditation' },
      { name: 'Children and Teens', href: '/programs/children-teens' },
      { name: 'Know Your Child Workshop', href: '/programs/know-your-child' },
      { name: 'Know Your Teen Workshop', href: '/programs/know-your-teen' },
      { name: 'Sri Sri Sanskar Kendra', href: '/programs/sanskar-kendra' },
      { name: 'The Art of Living Programs For Schools', href: '/programs/schools' },
      { name: 'Corporate Programs', href: '/programs/corporate' },
      { name: 'Sudarshan Kriya Follow-Ups', href: '/programs/follow-ups' },
      { name: 'Deep Sleep & Anxiety Relief', href: '/programs/sleep-anxiety' },
      { name: 'Wellness', href: '/programs/wellness' },
      { name: 'World Meditation Day', href: '/events/meditation-day' },
    ],
    yoga: [
      { name: 'Sri Sri Yoga Classes', href: '/programs/sri-sri-yoga' },
      { name: 'Sri Sri Yoga Deep Dive', href: '/programs/yoga-deep-dive' },
      { name: 'Sri Sri Yoga Retreats', href: '/programs/yoga-retreats' },
      { name: 'Happiness Program', href: '/programs/happiness-program' },
      { name: 'Happiness Program for Youth', href: '/programs/happiness-youth' },
      { name: 'Children and Teens', href: '/programs/yoga-children' },
      { name: 'Utkarsha Yoga (Age: 8‑13 yrs)', href: '/programs/utkarsha-yoga' },
      { name: 'Medha Yoga Level 1 (Age: 13‑18 yrs)', href: '/programs/medha-yoga-1' },
      { name: 'Medha Yoga Level 2 (Age: 13‑18 yrs)', href: '/programs/medha-yoga-2' },
      { name: 'Intuition Process', href: '/programs/intuition-process' },
      { name: 'The Art Of Living Programs For Schools', href: '/programs/schools' },
      { name: 'Sri Sri Sanskar Kendra', href: '/programs/sanskar-kendra' },
      { name: 'Karma Yoga (YLTP)', href: '/programs/karma-yoga' },
      { name: 'Corporate Programs', href: '/programs/yoga-corporate' },
    ],
    socialImpact: [
      { name: 'Education', href: '/social-impact/education' },
      { name: 'Peace', href: '/social-impact/peace' },
      { name: 'Environment care', href: '/social-impact/environment' },
      { name: 'Rural Development', href: '/social-impact/rural-development' },
      { name: 'Skill Development', href: '/social-impact/skill-development' },
      { name: 'Organic Farming', href: '/social-impact/organic-farming' },
      { name: 'Women Empowerment', href: '/social-impact/women-empowerment' },
      { name: 'Project Pavitra', href: '/social-impact/project-pavitra' },
      { name: 'Disaster Relief', href: '/social-impact/disaster-relief' },
      { name: 'Prison Program', href: '/social-impact/prison-program' },
      { name: 'Kisan Samruddhi Mahotsav', href: '/social-impact/kisan-mahotsav' },
    ],
    about: [
      { name: 'About Gurudev', href: '/about/gurudev' },
      { name: "Gurudev's Tour Schedule", href: '/about/tour-schedule' },
      { name: 'Sudarshan Kriya™', href: '/about/sudarshan-kriya' },
      { name: 'Research On Sudarshan Kriya™', href: '/about/research' },
      { name: 'Art of Living Centers', href: '/centers' },
      { name: 'Contact Us', href: '/contact' },
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/artofliving' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/artofliving' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/artofliving' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/artofliving' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">The Art of Living</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Fostering well-being through breath, meditation & yoga programs since 1981. 
              Join millions worldwide in discovering inner peace and happiness.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">+91-80-28432321</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">info@artofliving.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  21st KM, Kanakapura Road, Udayapura, Bangalore - 560082
                </span>
              </div>
            </div>
          </div>

          {/* Find a Solution */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Find a Solution</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Meditation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Meditation</h3>
            <ul className="space-y-2">
              {footerLinks.meditation.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yoga */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Yoga</h3>
            <ul className="space-y-2">
              {footerLinks.yoga.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Impact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Impact</h3>
            <ul className="space-y-2">
              {footerLinks.socialImpact.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Apps */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-4">Download Our Apps</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-sm">Sattva - Meditation App</span>
                </button>
                <button
                  className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-sm">Elyments - Social Media</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} The Art of Living. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for humanity</span>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Use
              </Link>
              <Link to="/cookies" className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 