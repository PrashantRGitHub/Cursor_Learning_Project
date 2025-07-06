const express = require('express');
const Program = require('../models/Program');
const router = express.Router();

// Get all programs
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, featured, search, page = 1, limit = 12 } = req.query;
    
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const programs = await Program.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Program.countDocuments(query);

    res.json({
      success: true,
      data: programs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      error: 'Failed to fetch programs',
      message: 'Please try again later'
    });
  }
});

// Get program by ID
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        error: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({
      error: 'Failed to fetch program',
      message: 'Please try again later'
    });
  }
});

// Create new program (admin only)
router.post('/', async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: program
    });
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({
      error: 'Failed to create program',
      message: error.message
    });
  }
});

// Update program (admin only)
router.put('/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({
        error: 'Program not found'
      });
    }

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: program
    });
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({
      error: 'Failed to update program',
      message: error.message
    });
  }
});

// Delete program (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        error: 'Program not found'
      });
    }

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({
      error: 'Failed to delete program',
      message: 'Please try again later'
    });
  }
});

// Get featured programs
router.get('/featured/list', async (req, res) => {
  try {
    const programs = await Program.find({ featured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    console.error('Get featured programs error:', error);
    res.status(500).json({
      error: 'Failed to fetch featured programs',
      message: 'Please try again later'
    });
  }
});

// Get programs by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const programs = await Program.find({ 
      category, 
      isActive: true 
    })
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Program.countDocuments({ category, isActive: true });

    res.json({
      success: true,
      data: programs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get programs by category error:', error);
    res.status(500).json({
      error: 'Failed to fetch programs',
      message: 'Please try again later'
    });
  }
});

module.exports = router; 