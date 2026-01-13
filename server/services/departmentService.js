const departmentRepo = require('../repositories/departmentRepo');
const employeeRepo = require('../repositories/employeeRepo');

const PROTECTED_DEPARTMENT = '111222111111111111111111111'; // General department, cannot be changed!


// Get All - Read
const getAllDepartments = (filters) => {
  return departmentRepo.getAllDepartments(filters);
};


// Get By ID - Read
const getDepartmentById = (id) => {
  return departmentRepo.getDepartmentById(id);
};

// Add - Create
const addDepartment = (newDep) => {
  return departmentRepo.addDepartment(newDep);
};

// Update
const updateDepartment = (id, data) => {
  if (id === PROTECTED_DEPARTMENT) {
    console.log("Cannot change GENERAL department!")
    return
  }
  return departmentRepo.updateDepartment(id, data);
};

// Delete
const deleteDepartment = async (id) => {
  if (id === PROTECTED_DEPARTMENT) {
    console.log("Cannot delete GENERAL department!")
    return
  }
  await employeeRepo.unassignEmployeesByDepartment(id);
  return departmentRepo.deleteDepartment(id);
};


const getDepartmentsWithEmployeesData = () => {
  return departmentRepo.getDepartmentsWithEmployeesData();
};




module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentsWithEmployeesData
};
