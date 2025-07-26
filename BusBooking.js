const mongoose = require('mongoose');

const busBookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    default: () => 'BUS' + Date.now()
  },
  passengerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  travelDate: {
    type: Date,
    required: true
  },
  passengers: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  route: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    distance: { type: String, required: true },
    fare: { type: Number, required: true },
    time: { type: String, required: true }
  },
  totalFare: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Card', 'Cash'],
    default: 'UPI'
  },
  paymentDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled', 'Completed'],
    default: 'Confirmed'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
busBookingSchema.index({ phone: 1 });
busBookingSchema.index({ travelDate: 1 });
busBookingSchema.index({ userId: 1 });

module.exports = mongoose.model('BusBooking', busBookingSchema);