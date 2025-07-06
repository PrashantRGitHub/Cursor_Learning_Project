const express = require('express');
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const router = express.Router();

// Validation middleware
const validateEnquiry = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number'),
  body('pincode')
    .matches(/^\d{6}$/)
    .withMessage('Please enter a valid 6-digit pincode'),
  body('program')
    .isIn([
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
    ])
    .withMessage('Please select a valid program'),
  body('message')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
];

// Create new enquiry
router.post('/', validateEnquiry, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const enquiry = new Enquiry(req.body);
    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you soon.',
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        program: enquiry.program
      }
    });
  } catch (error) {
    console.error('Enquiry creation error:', error);
    res.status(500).json({ 
      error: 'Failed to submit enquiry',
      message: 'Please try again later'
    });
  }
});

// Get all enquiries (admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, program, search } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    if (program) query.program = program;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: 'programId'
    };

    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Enquiry.countDocuments(query);

    res.json({
      success: true,
      data: enquiries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch enquiries',
      message: 'Please try again later'
    });
  }
});

// Get enquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ 
        error: 'Enquiry not found' 
      });
    }

    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch enquiry',
      message: 'Please try again later'
    });
  }
});

// Update enquiry status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'contacted', 'enrolled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status value' 
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ 
        error: 'Enquiry not found' 
      });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    res.status(500).json({ 
      error: 'Failed to update enquiry',
      message: 'Please try again later'
    });
  }
});

// Get enquiry statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalEnquiries = await Enquiry.countDocuments();
    const todayEnquiries = await Enquiry.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    const programStats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$program',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        total: totalEnquiries,
        today: todayEnquiries,
        statusBreakdown: stats,
        topPrograms: programStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch statistics',
      message: 'Please try again later'
    });
  }
});

module.exports = router; 