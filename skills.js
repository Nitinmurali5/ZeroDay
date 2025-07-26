const express = require('express');
const Skill = require('../models/Skill');
const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const { category, level, status, type } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (status) filter.status = status;
    if (type) filter.type = type;

    const skills = await Skill.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: skills,
      total: skills.length
    });

  } catch (error) {
    console.error('Skills fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new skill
router.post('/', async (req, res) => {
  try {
    const skillData = {
      ...req.body,
      skillId: await Skill.getNextSkillId()
    };

    const skill = new Skill(skillData);
    const savedSkill = await skill.save();

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: savedSkill
    });

  } catch (error) {
    console.error('Skill creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during skill creation'
    });
  }
});

// Delete skill by name
router.delete('/:skillName', async (req, res) => {
  try {
    const { skillName } = req.params;
    
    const skill = await Skill.findOneAndDelete({ name: decodeURIComponent(skillName) });
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });

  } catch (error) {
    console.error('Skill deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create live class
router.post('/live-classes', async (req, res) => {
  try {
    const classData = {
      ...req.body,
      type: 'live-class',
      skillId: await Skill.getNextSkillId()
    };

    const liveClass = new Skill(classData);
    const savedClass = await liveClass.save();

    res.status(201).json({
      success: true,
      message: 'Live class created successfully',
      data: savedClass
    });

  } catch (error) {
    console.error('Live class creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during live class creation'
    });
  }
});

// Get live classes
router.get('/live-classes', async (req, res) => {
  try {
    const liveClasses = await Skill.find({ type: 'live-class' }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: liveClasses,
      total: liveClasses.length
    });

  } catch (error) {
    console.error('Live classes fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get skill by ID
router.get('/:skillId', async (req, res) => {
  try {
    const { skillId } = req.params;
    
    const skill = await Skill.findOne({ skillId });
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      data: skill
    });

  } catch (error) {
    console.error('Skill fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;