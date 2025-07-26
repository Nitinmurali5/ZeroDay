const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    match: /^[A-Za-z0-9_]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'staff'],
    default: 'student'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  fullName: {
    type: String,
    trim: true,
    maxlength: 100
  },
  roomNumber: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: 10
  },
  contactNumber: {
    type: String,
    match: /^[0-9]{10}$/
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ role: 1, isActive: 1 });

// Instance method to check if user is student
userSchema.methods.isStudent = function() {
  return this.role === 'student';
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = Date.now();
  return this.save();
};

// Static method to find active users
userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to check if user is staff
userSchema.methods.isStaff = function() {
  return this.role === 'staff';
};

module.exports = mongoose.model('User', userSchema);