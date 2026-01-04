const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    max_actions: { type: Number, required: true },
    actions_left_today: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('user', schema, 'users');

module.exports = User;
