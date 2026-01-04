const Shifts = require('../models/shiftModel');

// Get All
const getAllShifts = (filters) => {
  return Shifts.find(filters);
};

// Get By ID
const getShiftById = (id) => {
  return Shifts.findById(id);
};

// Create
const addShift = (obj) => {
  return Shifts.create(obj);
};

// Update
const updateShift = (id, obj) => {
  return Shifts.findByIdAndUpdate(id, obj);
};

const deleteShift = (id) => {
  return Shifts.findByIdAndDelete(id);
};

module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
};
