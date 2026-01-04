const employeeShiftRepo = require('../repositories/employeeShiftRepo');

const GENERAL_SHIFT = '111111111111111111111111'; // General department, cannot be changed!


// Get All - Read
const getAllEmployeeShifts = (filters) => {
  return employeeShiftRepo.getAllEmployeeShifts(filters);
};


// Get By ID - Read
const getEmployeeShiftById = (id) => {
  return employeeShiftRepo.getAllEmployeeShiftsById(id);
};

// Add - Create
const addEmployeeShift = (newDep) => {
  return employeeShiftRepo.addEmployeeShift(newDep);
};

// Update
const updateEmployeeShift = (id, data) => {
  return employeeShiftRepo.updateEmployeeShift(id, data);
};

// Delete
const deleteEmployeeShift = (id) => {
  return employeeShiftRepo.deleteEmployeeShift(id);
};

const deleteEmployeeShifts = async (id) => {
   if(id === GENERAL_SHIFT) {
    console.log("Cannot delete GENERAL SHIFT!")
    return
  }
  await employeeShiftRepo.unassignEmployeesByDepartment(id);
  return departmentRepo.deleteDepartment(id);
};




const getShiftsByEmployeeId = (id) => {
  return employeeShiftRepo.getShiftsByEmployeeId(id);
};

module.exports = {
  getAllEmployeeShifts,
  getEmployeeShiftById,
  addEmployeeShift,
  updateEmployeeShift,
  deleteEmployeeShift,
  getShiftsByEmployeeId,
  deleteEmployeeShifts
};
