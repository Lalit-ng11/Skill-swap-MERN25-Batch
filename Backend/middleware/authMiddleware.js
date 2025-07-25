const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = { id: user._id.toString(), _id: user._id }; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = auth;