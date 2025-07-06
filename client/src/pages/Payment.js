import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail
} from 'lucide-react';
import axios from 'axios';

// Load Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

const PaymentForm = ({ amount, program, enquiry }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const createPaymentIntent = useMutation(
    async () => {
      const response = await axios.post('/api/payments/create-payment-intent', {
        enquiryId: enquiry.id,
        programId: program.id,
        amount: amount,
        currency: 'inr'
      });
      return response.data;
    }
  );

  const confirmPayment = useMutation(
    async ({ paymentIntentId, paymentId }) => {
      const response = await axios.post('/api/payments/confirm', {
        paymentIntentId,
        paymentId
      });
      return response.data;
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // Create payment intent
      const paymentData = await createPaymentIntent.mutateAsync();
      
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: enquiry.name,
              email: enquiry.email,
              phone: enquiry.phone,
            },
          },
        }
      );

      if (error) {
        setPaymentError(error.message);
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        await confirmPayment.mutateAsync({
          paymentIntentId: paymentIntent.id,
          paymentId: paymentData.paymentId
        });
        
        toast.success('Payment completed successfully!');
        navigate('/payment-success', { 
          state: { 
            paymentId: paymentData.paymentId,
            amount: amount,
            program: program.name
          }
        });
      }
    } catch (error) {
      setPaymentError('Payment failed. Please try again.');
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Details
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div className="border border-gray-300 rounded-lg p-3 bg-white">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {paymentError && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{paymentError}</span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary w-full flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="spinner"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            <span>Pay ₹{amount.toLocaleString()}</span>
          </>
        )}
      </button>
    </form>
  );
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [program, setProgram] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch this data from the backend
    // For demo purposes, we'll use URL parameters
    const enquiryId = searchParams.get('enquiryId');
    const programId = searchParams.get('programId');
    const paymentAmount = searchParams.get('amount');

    if (!enquiryId || !programId || !paymentAmount) {
      toast.error('Invalid payment parameters');
      navigate('/enquiry');
      return;
    }

    // Mock data - replace with actual API calls
    setEnquiry({
      id: enquiryId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91-9876543210'
    });

    setProgram({
      id: programId,
      name: 'Happiness Program',
      duration: '3 Days',
      description: 'Experience the powerful Sudarshan Kriya breathing technique'
    });

    setAmount(parseFloat(paymentAmount));
  }, [searchParams, navigate]);

  if (!enquiry || !program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-lg text-gray-600">
              Secure payment powered by Stripe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  amount={amount} 
                  program={program} 
                  enquiry={enquiry} 
                />
              </Elements>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{program.name}</h4>
                      <p className="text-sm text-gray-600">{program.duration}</p>
                      <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Program Fee</span>
                      <span className="font-medium">₹{amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-semibold text-gray-900">₹{amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Details
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name</span>
                    <p className="font-medium text-gray-900">{enquiry.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="font-medium text-gray-900">{enquiry.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <p className="font-medium text-gray-900">{enquiry.phone}</p>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="card p-6 bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Secure Payment
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-700">256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-700">PCI DSS compliant</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-700">Your card details are never stored</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="card p-6 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Need Help?
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  If you encounter any issues during payment, please contact our support team.
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+91-80-28432321"
                    className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91-80-28432321</span>
                  </a>
                  <a
                    href="mailto:support@artofliving.org"
                    className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>support@artofliving.org</span>
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

export default Payment; 