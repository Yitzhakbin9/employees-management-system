const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    start_year: Number,
    department_id: String
  },
  {
    versionKey: false,
  }
);

const Employee = mongoose.model('employee', schema, 'employees');

module.exports = Employee;
