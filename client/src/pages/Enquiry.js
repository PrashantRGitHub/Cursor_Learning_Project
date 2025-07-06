import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquare,
  CheckCircle,
  Send
} from 'lucide-react';
import axios from 'axios';

const Enquiry = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm();

  const programs = [
    'Happiness Program',
    'Happiness Program for Youth',
    'Sahaj Samadhi Dhyana Yoga',
    'Online Meditation and Breath Workshop',
    'Advanced Meditation Program',
    'Sri Sri Yoga Classes',
    'Daily Online Yoga Subscription',
    'Utkarsha Yoga',
    'Medha Yoga Level 1',
    'Medha Yoga Level 2',
    'Corporate Programs',
    'Other'
  ];

  const submitEnquiry = useMutation(
    async (data) => {
      const response = await axios.post('/api/enquiries', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Enquiry submitted successfully! We will contact you soon.');
        setIsSubmitted(true);
        reset();
        setSelectedProgram('');
      },
      onError: (error) => {
        const message = error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
        toast.error(message);
      }
    }
  );

  const onSubmit = (data) => {
    submitEnquiry.mutate(data);
  };

  const marketingConsent = watch('marketingConsent');

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your enquiry has been submitted successfully. Our team will contact you within 24 hours to discuss the program details and answer any questions you may have.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary w-full"
              >
                Submit Another Enquiry
              </button>
              <a href="/" className="btn-outline w-full inline-block text-center">
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enquire About Our Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you with personalized program recommendations and details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="card p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        className={`input ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        className={`input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[\+]?[1-9][\d]{0,15}$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                        className={`input ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        {...register('whatsapp')}
                        className="input"
                        placeholder="Enter your WhatsApp number"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      {...register('pincode', { 
                        required: 'Pincode is required',
                        pattern: {
                          value: /^\d{6}$/,
                          message: 'Please enter a valid 6-digit pincode'
                        }
                      })}
                      className={`input ${errors.pincode ? 'border-red-500' : ''}`}
                      placeholder="Enter your 6-digit pincode"
                      maxLength={6}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Program Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Program *
                    </label>
                    <select
                      {...register('program', { required: 'Please select a program' })}
                      className={`select ${errors.program ? 'border-red-500' : ''}`}
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                    {errors.program && (
                      <p className="text-red-500 text-sm mt-1">{errors.program.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        {...register('preferredLocation')}
                        className="input"
                        placeholder="Enter preferred location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        {...register('preferredDate')}
                        className="input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Additional Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      {...register('message', { 
                        maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' }
                      })}
                      className={`textarea ${errors.message ? 'border-red-500' : ''}`}
                      rows={4}
                      placeholder="Tell us about your specific needs or any questions you have..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        {...register('marketingConsent')}
                        className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to receive updates about programs and events from The Art of Living. 
                        You can unsubscribe at any time.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Information Sidebar */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why Choose The Art of Living?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">44+ years of experience in meditation and yoga</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">10,000+ centers across 180 countries</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Scientifically proven techniques</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Experienced and certified teachers</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Lifetime support and follow-up sessions</span>
                  </li>
                </ul>
              </div>

              <div className="card p-6 bg-primary-50 border-primary-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  What Happens Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Submit Enquiry</h4>
                      <p className="text-primary-700 text-sm">Fill out the form with your details</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Get Contacted</h4>
                      <p className="text-primary-700 text-sm">Our team will call you within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Join Program</h4>
                      <p className="text-primary-700 text-sm">Enroll in the program that suits you best</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-secondary-50 border-secondary-200">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+91-80-28432321"
                    className="flex items-center space-x-2 text-secondary-700 hover:text-secondary-900 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91-80-28432321</span>
                  </a>
                  <a
                    href="mailto:info@artofliving.org"
                    className="flex items-center space-x-2 text-secondary-700 hover:text-secondary-900 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@artofliving.org</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Enquiry; 