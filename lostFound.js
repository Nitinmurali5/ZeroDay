const express = require('express');
const router = express.Router();
const LostFoundItem = require('../models/LostFoundItem');

// GET /api/lost-found - Get all items with optional filters
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      status, 
      dateRange,
      page = 1, 
      limit = 50 
    } = req.query;

    // Build query object
    let query = { isResolved: false }; // Only show unresolved items by default

    // Add filters
    if (category && category !== '') {
      query.category = category;
    }

    if (status && status !== '') {
      query.status = status;
    }

    // Date range filter
    if (dateRange) {
      const today = new Date();
      let startDate;

      switch (dateRange) {
        case 'today':
          startDate = new Date(today.setHours(0, 0, 0, 0));
          query.date = { $gte: startDate };
          break;
        case 'week':
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          query.date = { $gte: startDate };
          break;
        case 'month':
          startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          query.date = { $gte: startDate };
          break;
      }
    }

    // Text search
    if (search && search.trim() !== '') {
      query.$or = [
        { itemName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const items = await LostFoundItem.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await LostFoundItem.countDocuments(query);

    res.json({
      success: true,
      data: items,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
});

// POST /api/lost-found - Create new lost/found item
router.post('/', async (req, res) => {
  try {
    const {
      itemName,
      category,
      description,
      location,
      date,
      contact,
      status,
      images = [],
      reportedBy = 'Anonymous'
    } = req.body;

    // Validate required fields
    if (!itemName || !category || !description || !location || !date || !contact || !status) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Validate status
    if (!['lost', 'found'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "lost" or "found"'
      });
    }

    // Create new item
    const newItem = new LostFoundItem({
      itemName: itemName.trim(),
      category,
      description: description.trim(),
      location: location.trim(),
      date: new Date(date),
      contact: contact.trim(),
      status,
      images,
      reportedBy: reportedBy.trim()
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      message: `${status === 'lost' ? 'Lost' : 'Found'} item reported successfully`,
      data: savedItem
    });

  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
});

// GET /api/lost-found/:id - Get specific item
router.get('/:id', async (req, res) => {
  try {
    const item = await LostFoundItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });

  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
});

// PUT /api/lost-found/:id - Update item
router.put('/:id', async (req, res) => {
  try {
    const item = await LostFoundItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });

  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
});

// PUT /api/lost-found/:id/resolve - Mark item as resolved
router.put('/:id/resolve', async (req, res) => {
  try {
    const item = await LostFoundItem.findByIdAndUpdate(
      req.params.id,
      { 
        isResolved: true, 
        resolvedAt: new Date() 
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item marked as resolved',
      data: item
    });

  } catch (error) {
    console.error('Error resolving item:', error);
    res.status(500).json({
      success: false,
      message: 'Error resolving item',
      error: error.message
    });
  }
});

// DELETE /api/lost-found/:id - Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await LostFoundItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
});

// GET /api/lost-found/stats/summary - Get statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await LostFoundItem.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          lostItems: { $sum: { $cond: [{ $eq: ['$status', 'lost'] }, 1, 0] } },
          foundItems: { $sum: { $cond: [{ $eq: ['$status', 'found'] }, 1, 0] } },
          resolvedItems: { $sum: { $cond: ['$isResolved', 1, 0] } },
          unresolvedItems: { $sum: { $cond: ['$isResolved', 0, 1] } }
        }
      }
    ]);

    const categoryStats = await LostFoundItem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        summary: stats[0] || {
          totalItems: 0,
          lostItems: 0,
          foundItems: 0,
          resolvedItems: 0,
          unresolvedItems: 0
        },
        categoryBreakdown: categoryStats
      }
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

module.exports = router;