const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
