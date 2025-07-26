const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

const validateUser = async (req, res, next) => {
  try {
    const { username, role } = req.headers;
    
    if (!username || !role) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    req.user = { username, role };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid authentication'
    });
  }
};

// GET /api/polls - Get all active polls
router.get('/', validateUser, async (req, res) => {
  try {
    const polls = await Poll.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: polls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching polls',
      error: error.message
    });
  }
});

// POST /api/polls - Create new poll (admin only)
router.post('/', validateUser, async (req, res) => {
  try {
    const { role, username } = req.user;
    
    if (role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Question and at least 2 options are required'
      });
    }

    const pollId = await Poll.getNextPollId();

    const poll = new Poll({
      pollId,
      question: question.trim(),
      options: options.map(opt => ({ text: opt.trim(), votes: 0 })),
      createdBy: username
    });

    await poll.save();

    res.status(201).json({
      success: true,
      message: 'Poll created successfully',
      data: poll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating poll',
      error: error.message
    });
  }
});

// POST /api/polls/:id/vote - Vote on a poll (student only)
router.post('/:id/vote', validateUser, async (req, res) => {
  try {
    const { role, username } = req.user;
    
    if (role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can vote'
      });
    }

    const { id } = req.params;
    const { optionIndex } = req.body;

    const poll = await Poll.findOne({ pollId: id, isActive: true });

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found'
      });
    }

    // Check if user already voted
    const existingVote = poll.voters.find(voter => voter.username === username);
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted on this poll'
      });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid option selected'
      });
    }

    // Add vote
    poll.options[optionIndex].votes += 1;
    poll.voters.push({ username, optionIndex });

    await poll.save();

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: poll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording vote',
      error: error.message
    });
  }
});

// DELETE /api/polls/:id - Delete poll (admin only)
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

    const poll = await Poll.findOneAndUpdate(
      { pollId: id },
      { isActive: false },
      { new: true }
    );

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found'
      });
    }

    res.json({
      success: true,
      message: 'Poll deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting poll',
      error: error.message
    });
  }
});

module.exports = router;