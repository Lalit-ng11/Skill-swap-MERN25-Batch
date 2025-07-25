const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const skillRoutes = require('./routes/skills');
app.use('/api/skills', skillRoutes);


const requestRoutes = require('./routes/requests');
app.use('/api/requests', requestRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => console.log(err));