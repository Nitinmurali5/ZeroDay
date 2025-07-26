const mongoose = require('mongoose');

// Enhanced ticket schema with additional fields for comprehensive ticket management
const ticketSchema = new mongoose.Schema({
  // Basic ticket information
  ticketId: {
    type: String,
    required: true,
    unique: true,
    default: () => 'TKT' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase()
  },
  
  // Passenger details
  passenger: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, match: /^[0-9]{10}$/ },
    email: { type: String, trim: true, lowercase: true },
    age: { type: Number, min: 1, max: 120 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] }
  },
  
  // Journey details
  journey: {
    from: { type: String, required: true, default: 'SECE Campus' },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: String },
    distance: { type: String }
  },
  
  // Booking details
  booking: {
    bookingDate: { type: Date, default: Date.now },
    passengers: { type: Number, required: true, min: 1, max: 5 },
    seatNumbers: [{ type: String }],
    busNumber: { type: String },
    driverContact: { type: String }
  },
  
  // Pricing
  pricing: {
    baseFare: { type: Number, required: true },
    taxes: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalFare: { type: Number, required: true }
  },
  
  // Payment information
  payment: {
    method: { 
      type: String, 
      enum: ['UPI', 'Card', 'Cash', 'Net Banking'], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'], 
      default: 'Pending' 
    },
    transactionId: { type: String },
    paymentDate: { type: Date },
    refundAmount: { type: Number, default: 0 }
  },
  
  // Ticket status
  status: {
    type: String,
    enum: ['Booked', 'Confirmed', 'Cancelled', 'Completed', 'No Show'],
    default: 'Booked'
  },
  
  // Additional information
  notes: { type: String, trim: true },
  specialRequests: { type: String, trim: true },
  
  // System fields
  createdBy: { type: String },
  updatedBy: { type: String },
  
  // Cancellation details
  cancellation: {
    reason: { type: String },
    cancelledAt: { type: Date },
    cancelledBy: { type: String },
    refundStatus: { 
      type: String, 
      enum: ['Not Applicable', 'Pending', 'Processed', 'Failed'] 
    }
  }
}, {
  timestamps: true,
  collection: 'tickets'
});

// Indexes for efficient querying
ticketSchema.index({ ticketId: 1 }, { unique: true });
ticketSchema.index({ 'passenger.phone': 1 });
ticketSchema.index({ 'journey.date': 1 });
ticketSchema.index({ 'payment.status': 1 });
ticketSchema.index({ status: 1 });
ticketSchema.index({ createdAt: -1 });

// Virtual for formatted journey
ticketSchema.virtual('journeyDisplay').get(function() {
  return `${this.journey.from} → ${this.journey.to}`;
});

// Method to calculate refund amount
ticketSchema.methods.calculateRefund = function() {
  const now = new Date();
  const journeyDate = new Date(this.journey.date);
  const hoursUntilJourney = (journeyDate - now) / (1000 * 60 * 60);
  
  if (hoursUntilJourney > 24) {
    return this.pricing.totalFare * 0.9; // 90% refund
  } else if (hoursUntilJourney > 2) {
    return this.pricing.totalFare * 0.5; // 50% refund
  } else {
    return 0; // No refund
  }
};

// Static method to get tickets by date range
ticketSchema.statics.getTicketsByDateRange = function(startDate, endDate) {
  return this.find({
    'journey.date': {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ 'journey.date': 1 });
};

// Pre-save middleware to calculate total fare
ticketSchema.pre('save', function(next) {
  if (this.isModified('pricing.baseFare') || this.isModified('pricing.taxes') || this.isModified('pricing.discount')) {
    this.pricing.totalFare = (this.pricing.baseFare + this.pricing.taxes - this.pricing.discount) * this.booking.passengers;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);