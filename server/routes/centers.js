const express = require('express');
const router = express.Router();

// Sample centers data (in a real app, this would be in a database)
const centers = [
  {
    id: 1,
    name: "Art of Living International Center",
    address: "21st KM, Kanakapura Road, Udayapura, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560082",
    phone: "+91-80-28432321",
    email: "info@artofliving.org",
    coordinates: {
      lat: 12.9716,
      lng: 77.5946
    },
    programs: ["Happiness Program", "Advanced Meditation", "Sri Sri Yoga"],
    isMainCenter: true
  },
  {
    id: 2,
    name: "Art of Living Center - Mumbai",
    address: "Vasudev Chambers, 1st Floor, 49, Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400002",
    phone: "+91-22-2288-1234",
    email: "mumbai@artofliving.org",
    coordinates: {
      lat: 19.0760,
      lng: 72.8777
    },
    programs: ["Happiness Program", "Corporate Programs", "Youth Programs"],
    isMainCenter: false
  },
  {
    id: 3,
    name: "Art of Living Center - Delhi",
    address: "D-1, Vasant Vihar, New Delhi",
    city: "Delhi",
    state: "Delhi",
    pincode: "110057",
    phone: "+91-11-2615-1234",
    email: "delhi@artofliving.org",
    coordinates: {
      lat: 28.7041,
      lng: 77.1025
    },
    programs: ["Happiness Program", "Advanced Meditation", "Children Programs"],
    isMainCenter: false
  }
];

// Get all centers
router.get('/', async (req, res) => {
  try {
    const { city, state, program } = req.query;
    
    let filteredCenters = centers;
    
    if (city) {
      filteredCenters = filteredCenters.filter(center => 
        center.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (state) {
      filteredCenters = filteredCenters.filter(center => 
        center.state.toLowerCase().includes(state.toLowerCase())
      );
    }
    
    if (program) {
      filteredCenters = filteredCenters.filter(center => 
        center.programs.some(p => p.toLowerCase().includes(program.toLowerCase()))
      );
    }

    res.json({
      success: true,
      data: filteredCenters
    });
  } catch (error) {
    console.error('Get centers error:', error);
    res.status(500).json({
      error: 'Failed to fetch centers',
      message: 'Please try again later'
    });
  }
});

// Get center by ID
router.get('/:id', async (req, res) => {
  try {
    const center = centers.find(c => c.id === parseInt(req.params.id));
    
    if (!center) {
      return res.status(404).json({
        error: 'Center not found'
      });
    }

    res.json({
      success: true,
      data: center
    });
  } catch (error) {
    console.error('Get center error:', error);
    res.status(500).json({
      error: 'Failed to fetch center',
      message: 'Please try again later'
    });
  }
});

// Get centers by city
router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const cityCenters = centers.filter(center => 
      center.city.toLowerCase().includes(city.toLowerCase())
    );

    res.json({
      success: true,
      data: cityCenters
    });
  } catch (error) {
    console.error('Get centers by city error:', error);
    res.status(500).json({
      error: 'Failed to fetch centers',
      message: 'Please try again later'
    });
  }
});

// Get main center
router.get('/main/center', async (req, res) => {
  try {
    const mainCenter = centers.find(center => center.isMainCenter);

    if (!mainCenter) {
      return res.status(404).json({
        error: 'Main center not found'
      });
    }

    res.json({
      success: true,
      data: mainCenter
    });
  } catch (error) {
    console.error('Get main center error:', error);
    res.status(500).json({
      error: 'Failed to fetch main center',
      message: 'Please try again later'
    });
  }
});

module.exports = router; 