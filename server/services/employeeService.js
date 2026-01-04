const employeeRepo = require('../repositories/employeeRepo');
const employeeShiftRepo = require('../repositories/employeeShiftRepo');

// Get All - Read
const getAllEmployees = (filters) => {
  return employeeRepo.getAllEmployees(filters);
};


// Get By ID - Read
const getEmployeeById = (id) => {
  return employeeRepo.getEmployeeById(id);
};

// Add - Create
const addEmployee = (newEmp) => {
  return employeeRepo.addEmployee(newEmp);
};

// Update
const updateEmployee = (id, data) => {
  return employeeRepo.updateEmployee(id, data);
};

// Delete
const deleteEmployee = async (id) => {
  await employeeShiftRepo.unassignShiftsByEmployee(id);
  return employeeRepo.deleteEmployee(id);
};


const getEmployeesWithDepartment = () => {
  return employeeRepo.getEmployeesWithDepartment();
};


const getEmployeesWithShifts = () => {
  return employeeRepo.getEmployeesWithShifts();
};


const getEmployeesWithShiftsAndDepName = () => {
  return employeeRepo.getEmployeesWithShiftsAndDepName();
};




module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesWithDepartment,
  getEmployeesWithShifts,
  getEmployeesWithShiftsAndDepName
};
