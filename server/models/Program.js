const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Program name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['meditation', 'yoga', 'corporate', 'children', 'advanced']
  },
  subcategory: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'youth', 'children']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  image: {
    type: String,
    required: [true, 'Program image is required']
  },
  images: [{
    type: String
  }],
  benefits: [{
    type: String,
    maxlength: [200, 'Benefit cannot exceed 200 characters']
  }],
  highlights: [{
    type: String,
    maxlength: [200, 'Highlight cannot exceed 200 characters']
  }],
  schedule: [{
    day: String,
    time: String,
    duration: String
  }],
  locations: [{
    name: String,
    address: String,
    city: String,
    pincode: String,
    phone: String
  }],
  instructor: {
    name: String,
    qualification: String,
    experience: String,
    image: String
  },
  maxParticipants: {
    type: Number,
    default: 50
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    maxlength: [200, 'Requirement cannot exceed 200 characters']
  }],
  testimonials: [{
    name: String,
    role: String,
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    image: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
programSchema.index({ category: 1, isActive: 1 });
programSchema.index({ featured: 1, isActive: 1 });
programSchema.index({ tags: 1 });

module.exports = mongoose.model('Program', programSchema); 