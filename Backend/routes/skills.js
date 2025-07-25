const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/authMiddleware');

// Create Skill
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const skill = await Skill.create({
      title,
      description,
      category,
      user: req.user.id
    });
    res.status(201).json(skill);
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).json({ message: 'Error creating skill' });
  }
});

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().populate('user', 'name');
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

// Get My Skills
router.get('/my-skills', auth, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await skill.deleteOne();
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const { title, description, category } = req.body;
    skill.title = title;
    skill.description = description;
    skill.category = category;
    await skill.save();

    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Error updating skill' });
  }
});

module.exports = router;