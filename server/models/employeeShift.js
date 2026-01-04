const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    employee_id: { type: String, required: true },
    shift_id: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const EmployeeShift = mongoose.model('employeeShift', schema, 'employeeShifts');

module.exports = EmployeeShift;
