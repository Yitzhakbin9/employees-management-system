const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    starting_hour: { type: String, required: true },
    ending_hour: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Shifts = mongoose.model('shift', schema, 'shifts');

module.exports = Shifts;
