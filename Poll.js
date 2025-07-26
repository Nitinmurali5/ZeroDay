const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  pollId: {
    type: String,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true
  },
  options: [{
    text: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  voters: [{
    username: String,
    optionIndex: Number,
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

pollSchema.index({ isActive: 1, createdAt: -1 });

pollSchema.statics.getNextPollId = async function() {
  const lastPoll = await this.findOne({}, {}, { sort: { 'pollId': -1 } });
  if (lastPoll) {
    const lastId = parseInt(lastPoll.pollId.replace('POLL', ''));
    return `POLL${String(lastId + 1).padStart(4, '0')}`;
  }
  return 'POLL0001';
};

pollSchema.methods.getTotalVotes = function() {
  return this.options.reduce((total, option) => total + option.votes, 0);
};

module.exports = mongoose.model('Poll', pollSchema);