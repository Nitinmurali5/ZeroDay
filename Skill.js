const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillId: {
    type: String,
    required: true,
    unique: true
  },
  // For teaching skills
  name: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['teaching', 'live-class', 'session', 'course'],
    default: 'teaching'
  },
  category: {
    type: String,
    enum: ['programming', 'design', 'languages', 'math', 'science', 'business', 'other', 'Programming', 'Design', 'Languages', 'Academic', 'Music', 'Sports', 'Other']
  },
  description: {
    type: String
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert', 'Beginner', 'Intermediate', 'Advanced']
  },
  username: {
    type: String,
    trim: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  
  // For live classes
  skill: String,
  date: String,
  time: String,
  duration: Number,
  capacity: Number,
  zoomUrl: String,
  createdBy: String,
  students: [{
    email: String,
    name: String,
    joinedAt: { type: Date, default: Date.now }
  }],
  
  // Legacy fields for backward compatibility
  instructor: {
    name: String,
    contact: String,
    experience: String
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  schedule: {
    days: [String],
    location: String,
    startDate: Date,
    endDate: Date
  },
  maxStudents: {
    type: Number,
    default: 10,
    min: 1
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'scheduled', 'live', 'completed', 'cancelled', 'Active', 'Inactive', 'Full', 'Live', 'Scheduled', 'Completed', 'Cancelled'],
    default: 'active'
  },
  tags: [String],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

skillSchema.index({ category: 1 });
skillSchema.index({ level: 1 });
skillSchema.index({ status: 1 });
skillSchema.index({ type: 1 });
skillSchema.index({ username: 1 });
skillSchema.index({ name: 1 });

// Static method to get next skill ID
skillSchema.statics.getNextSkillId = async function() {
  const lastSkill = await this.findOne({}, {}, { sort: { 'skillId': -1 } });
  if (lastSkill && lastSkill.skillId.startsWith('SKILL')) {
    const lastId = parseInt(lastSkill.skillId.replace('SKILL', ''));
    return `SKILL${String(lastId + 1).padStart(4, '0')}`;
  }
  return 'SKILL0001';
};

module.exports = mongoose.model('Skill', skillSchema);