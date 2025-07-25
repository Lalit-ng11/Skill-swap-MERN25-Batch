const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/authMiddleware');

// SEND message
router.post('/', auth, async (req, res) => {
  const { receiver, message } = req.body;

  if (!receiver || !message) {
    return res.status(400).json({ message: 'Receiver and message are required' });
  }

  try {
    const newMessage = new Message({
      sender: req.user._id,
      receiver,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err });
  }
});

// GET all messages between current user and another user
router.get('/:userId', auth, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err });
  }
});

module.exports = router;
