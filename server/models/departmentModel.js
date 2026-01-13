const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    department_name: { type: String, required: true },
    manager_id: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Department = mongoose.model('department', schema, 'departments');

module.exports = Department;
