const Department = require('../models/departmentModel');

// Get All
const getAllDepartments = (filters) => {
  return Department.find(filters);
};

// Get By ID
const getDepartmentById = (id) => {
  return Department.findById(id);
};

// Create
const addDepartment = (obj) => {
  return Department.create(obj);
};

// Update
const updateDepartment = (id, obj) => {
  return Department.findByIdAndUpdate(id, obj);
};

const deleteDepartment = (id) => {
  return Department.findByIdAndDelete(id);
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
