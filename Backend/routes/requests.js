const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Skill = require('../models/Skill');
const auth = require('../middleware/authMiddleware');

// Create a request
router.post('/:skillId', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.skillId);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.user.toString() === req.user.id) return res.status(400).json({ message: 'Cannot request your own skill' });

    const existing = await Request.findOne({
      skill: skill._id,
      sender: req.user.id,
      receiver: skill.user
    });

    if (existing) return res.status(409).json({ message: 'You already sent a request for this skill' });

    const newRequest = new Request({
      skill: skill._id,
      sender: req.user.id,
      receiver: skill.user
    });

    await newRequest.save();
    const populated = await Request.findById(newRequest._id)
      .populate('skill', 'title')
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.status(201).json(populated);
  } catch (err) {
    console.error('Error sending request:', err);
    res.status(500).json({ message: 'Server error while sending request' });
  }
});

// Get all user-related requests
router.get('/', auth, async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    })
      .populate('skill', 'title')
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching requests' });
  }
});

// Accept / Reject
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.receiver.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    request.status = status;
    await request.save();

    const updated = await Request.findById(req.params.id)
      .populate('skill', 'title')
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating request' });
  }
});

module.exports = router;
