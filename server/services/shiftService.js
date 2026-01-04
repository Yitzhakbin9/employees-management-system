const shiftRepo = require('../repositories/shiftRepo');


// Get All - Read
const getAllShifts = (filters) => {
  return shiftRepo.getAllShifts(filters);
};


// Get By ID - Read
const getShiftById = (id) => {
  return shiftRepo.getShiftById(id);
};

// Add - Create
const addShift = (newShi) => {
  return shiftRepo.addShift(newShi);
};

// Update
const updateShift = (id, data) => {
  return shiftRepo.updateShift(id, data);
};

// Delete
const deleteShift = async (id) => {
  return shiftRepo.deleteShift(id);
};



module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
};
