const express = require('express');
const BusBooking = require('../models/BusBooking');
const router = express.Router();

// Create new booking
router.post('/book', async (req, res) => {
  try {
    console.log('📝 Booking request received:', req.body);
    const { passengerName, phone, travelDate, passengers, route, totalFare } = req.body;

    // Validate required fields
    if (!passengerName || !phone || !travelDate || !passengers || !route || !totalFare) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create booking
    const booking = new BusBooking({
      passengerName,
      phone,
      travelDate,
      passengers,
      route,
      totalFare
    });

    console.log('💾 Saving booking to MongoDB...');
    const savedBooking = await booking.save();
    console.log('✅ Booking saved successfully:', savedBooking.bookingId);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: savedBooking.bookingId,
        passengerName: savedBooking.passengerName,
        phone: savedBooking.phone,
        travelDate: savedBooking.travelDate,
        passengers: savedBooking.passengers,
        route: savedBooking.route,
        totalFare: savedBooking.totalFare,
        status: savedBooking.status,
        bookingDate: savedBooking.bookingDate
      }
    });

  } catch (error) {
    console.error('❌ Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during booking'
    });
  }
});

// Update payment status
router.put('/payment/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus, paymentMethod } = req.body;

    const booking = await BusBooking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.paymentStatus = paymentStatus;
    booking.paymentMethod = paymentMethod;
    if (paymentStatus === 'Paid') {
      booking.paymentDate = new Date();
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      booking
    });

  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get booking by ID
router.get('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await BusBooking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Booking fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all bookings (for admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentStatus } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const bookings = await BusBooking.find(filter)
      .sort({ bookingDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await BusBooking.countDocuments(filter);

    res.json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Bookings fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;