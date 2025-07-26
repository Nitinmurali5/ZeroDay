const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// Middleware to validate user (simple version for demo)
const validateUser = async (req, res, next) => {
  try {
    const { username, role } = req.headers;
    
    if (!username || !role) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // In a real app, you'd validate JWT token here
    req.user = { username, role };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid authentication'
    });
  }
};

// GET /api/complaints - Get all complaints (admin) or user's complaints (student)
router.get('/', validateUser, async (req, res) => {
  try {
    const { role, username } = req.user;
    const { status, category, priority, sortBy = 'submittedAt', sortOrder = 'desc' } = req.query;

    let query = {};
    
    // Students can only see their own complaints
    if (role === 'student') {
      query.studentUsername = username;
    }

    // Apply filters
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const complaints = await Complaint.find(query)
      .sort(sortObj)
      .lean();

    res.json({
      success: true,
      data: complaints,
      count: complaints.length
    });

  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: error.message
    });
  }
});

// GET /api/complaints/stats - Get complaint statistics (admin only)
router.get('/stats', validateUser, async (req, res) => {
  try {
    const { role } = req.user;
    
    if (role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalCount = await Complaint.countDocuments();
    
    const formattedStats = {
      pending: 0,
      'in-progress': 0,
      resolved: 0,
      total: totalCount
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// POST /api/complaints - Create new complaint (student only)
router.post('/', validateUser, async (req, res) => {
  try {
    const { role, username } = req.user;
    
    if (role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can submit complaints'
      });
    }

    const {
      title,
      category,
      description,
      priority,
      roomNumber,
      contactNumber
    } = req.body;

    // Validation
    if (!title || !category || !description || !priority || !roomNumber || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Generate complaint ID
    const complaintId = await Complaint.getNextComplaintId();

    const complaint = new Complaint({
      complaintId,
      title: title.trim(),
      category,
      description: description.trim(),
      priority,
      roomNumber: roomNumber.trim().toUpperCase(),
      contactNumber,
      studentUsername: username
    });

    await complaint.save();

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: complaint
    });

  } catch (error) {
    console.error('Error creating complaint:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating complaint',
      error: error.message
    });
  }
});

// GET /api/complaints/:id - Get specific complaint
router.get('/:id', validateUser, async (req, res) => {
  try {
    const { role, username } = req.user;
    const { id } = req.params;

    let query = { complaintId: id };
    
    // Students can only see their own complaints
    if (role === 'student') {
      query.studentUsername = username;
    }

    const complaint = await Complaint.findOne(query);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      data: complaint
    });

  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaint',
      error: error.message
    });
  }
});

// PUT /api/complaints/:id - Update complaint (admin only)
router.put('/:id', validateUser, async (req, res) => {
  try {
    const { role } = req.user;
    
    if (role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { id } = req.params;
    const { status, adminNotes, assignedTo } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes.trim();
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo.trim();

    const complaint = await Complaint.findOneAndUpdate(
      { complaintId: id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint updated successfully',
      data: complaint
    });

  } catch (error) {
    console.error('Error updating complaint:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating complaint',
      error: error.message
    });
  }
});

// DELETE /api/complaints/:id - Delete complaint (admin only)
router.delete('/:id', validateUser, async (req, res) => {
  try {
    const { role } = req.user;
    
    if (role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { id } = req.params;

    const complaint = await Complaint.findOneAndDelete({ complaintId: id });

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting complaint',
      error: error.message
    });
  }
});

// POST /api/complaints/auth/login - Simple login endpoint
router.post('/auth/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and role are required'
      });
    }

    // Simple validation (in real app, you'd hash passwords and use proper auth)
    if (username.length < 3 || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // For demo purposes, accept any valid username/password combination
    // In a real app, you'd verify against the database
    const user = {
      username,
      role,
      loginTime: new Date()
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: user
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message
    });
  }
});

module.exports = router;