const mongoose = require('mongoose');

const lostFoundItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'clothing', 'accessories', 'books', 'keys', 'documents', 'sports', 'other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  images: [{
    type: String // Base64 encoded images or file paths
  }],
  isResolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: {
    type: Date
  },
  reportedBy: {
    type: String,
    default: 'Anonymous'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for better search performance
lostFoundItemSchema.index({ itemName: 'text', description: 'text' });
lostFoundItemSchema.index({ category: 1, status: 1 });
lostFoundItemSchema.index({ date: -1 });

module.exports = mongoose.model('LostFoundItem', lostFoundItemSchema);