const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['water', 'electricity', 'cleaning', 'maintenance', 'security', 'other']
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
    trim: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  roomNumber: {
    type: String,
    required: true,
    maxlength: 10,
    trim: true,
    uppercase: true
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  studentUsername: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  adminNotes: {
    type: String,
    maxlength: 1000,
    trim: true
  },
  resolvedAt: {
    type: Date
  },
  assignedTo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
complaintSchema.index({ studentUsername: 1, status: 1 });
complaintSchema.index({ category: 1, priority: 1 });
complaintSchema.index({ submittedAt: -1 });

// Virtual for complaint age in days
complaintSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to update the updatedAt field
complaintSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set resolvedAt when status changes to resolved
  if (this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = Date.now();
  }
  
  next();
});

// Static method to get next complaint ID
complaintSchema.statics.getNextComplaintId = async function() {
  const lastComplaint = await this.findOne({}, {}, { sort: { 'complaintId': -1 } });
  if (lastComplaint) {
    const lastId = parseInt(lastComplaint.complaintId.replace('CMP', ''));
    return `CMP${String(lastId + 1).padStart(4, '0')}`;
  }
  return 'CMP0001';
};

// Instance method to get priority color
complaintSchema.methods.getPriorityColor = function() {
  const colors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#fd7e14',
    urgent: '#dc3545'
  };
  return colors[this.priority] || '#6c757d';
};

// Instance method to get status color
complaintSchema.methods.getStatusColor = function() {
  const colors = {
    pending: '#ffc107',
    'in-progress': '#17a2b8',
    resolved: '#28a745'
  };
  return colors[this.status] || '#6c757d';
};

module.exports = mongoose.model('Complaint', complaintSchema);