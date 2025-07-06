const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  whatsapp: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true,
    match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
  },
  program: {
    type: String,
    required: [true, 'Program selection is required'],
    enum: [
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
    ]
  },
  preferredLocation: {
    type: String,
    trim: true
  },
  preferredDate: {
    type: Date
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'enrolled', 'completed', 'cancelled'],
    default: 'pending'
  },
  source: {
    type: String,
    enum: ['website', 'phone', 'walk-in', 'referral'],
    default: 'website'
  },
  marketingConsent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
enquirySchema.index({ email: 1, createdAt: -1 });
enquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema); 