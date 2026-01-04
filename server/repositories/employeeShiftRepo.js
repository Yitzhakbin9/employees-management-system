const EmployeeShift = require('../models/employeeShift');

// Get All
const getAllEmployeeShifts = (filters) => {
  return EmployeeShift.find(filters);
};

// Get By ID
const getAllEmployeeShiftsById = (id) => {
  return EmployeeShift.findById(id);
};

// Create
const addEmployeeShift = (obj) => {
  return EmployeeShift.create(obj);
};

// Update
const updateEmployeeShift = (id, obj) => {
  return EmployeeShift.findByIdAndUpdate(id, obj);
};

const deleteEmployeeShift = (id) => {
  return EmployeeShift.findByIdAndDelete(id);
};



const getShiftsByEmployeeId = async (id) => {
  return EmployeeShift.aggregate([
    {
      $match: {
        employee_id: id
      }
    },
    {
      $addFields: {
        shiftObjectId: { $toObjectId: '$shift_id' }
      }
    },
    {
      $lookup: {
        from: 'shifts',
        localField: 'shiftObjectId',
        foreignField: '_id',
        as: 'shift'
      }
    },
    {
      $unwind: {
        path: '$shift',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        shiftObjectId: 0,
        shift_id: 0
      }
    }
  ]);
};


// We add this so if we delete department, we initialize all the 
// employees from this department with department_id: null
const unassignShiftsByEmployee = (employeeID) => {
  return EmployeeShift.updateMany(
    { employee_id: employeeID },
    { $set: { employee_id: '111111111111111111111111' } } // (General employee)
  );
};


module.exports = {
  getAllEmployeeShifts,
  getAllEmployeeShiftsById,
  addEmployeeShift,
  updateEmployeeShift,
  deleteEmployeeShift,
  getShiftsByEmployeeId,
  unassignShiftsByEmployee
};
