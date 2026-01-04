const Employee = require('../models/employeeModel');

// Get All
const getAllEmployees = (filters) => {
  return Employee.find(filters);
};

// Get By ID
const getEmployeeById = (id) => {
  return Employee.findById(id);
};

// Create
const addEmployee = (obj) => {
  return Employee.create(obj);
};

// Update
const updateEmployee = (id, obj) => {
  return Employee.findByIdAndUpdate(id, obj, { new: true, runValidators: true }); // The third object - will return the document after the update
};

const deleteEmployee = (id) => {
  return Employee.findByIdAndDelete(id);
};


const getEmployeesWithDepartment = () => {
  return Employee.aggregate([
    {
      $addFields: {
        departmentObjId: {
          $toObjectId: "$department_id"
        }
      }
    },
    {
      $lookup: {
        from: "departments",
        localField: "departmentObjId",
        foreignField: "_id",
        as: "department"
      }
    },
    { $unwind: "$department" },
    {
      $project: {
        first_name: 1,
        last_name: 1,
        department_name: "$department.department_name"
      }
    }
  ]);
};


const getEmployeesWithShifts = async () => {
  return Employee.aggregate([
    // המרה של _id ל-string כדי להתאים ל employeeShifts.employee_id
    {
      $addFields: {
        _id_str: { $toString: "$_id" }
      }
    },

    // חיבור לטבלת employeeShifts
    {
      $lookup: {
        from: 'employeeShifts',
        localField: '_id_str',
        foreignField: 'employee_id',
        as: 'links'
      }
    },

    // המרת shift_id ל-ObjectId
    {
      $addFields: {
        shiftObjectIds: {
          $map: {
            input: '$links',
            as: 'l',
            in: { $toObjectId: '$$l.shift_id' }
          }
        }
      }
    },

    // חיבור לטבלת shifts
    {
      $lookup: {
        from: 'shifts',
        localField: 'shiftObjectIds',
        foreignField: '_id',
        as: 'shifts'
      }
    },

    // ניקוי שדות עזר
    {
      $project: {
        _id_str: 0,
        links: 0,
        shiftObjectIds: 0
      }
    }
  ]);
};



const getEmployeesWithShiftsAndDepName = async () => {
  return Employee.aggregate([
    // 1️⃣ המרת _id של employee ל-string (כדי להתאים ל employeeShifts)
    {
      $addFields: {
        employeeIdStr: { $toString: "$_id" }
      }
    },

    // 2️⃣ חיבור employeeShifts
    {
      $lookup: {
        from: "employeeShifts",
        localField: "employeeIdStr",
        foreignField: "employee_id",
        as: "links"
      }
    },

    // 3️⃣ הפקת shift_id והמרה ל-ObjectId
    {
      $addFields: {
        shiftObjectIds: {
          $map: {
            input: "$links",
            as: "l",
            in: { $toObjectId: "$$l.shift_id" }
          }
        }
      }
    },

    // 4️⃣ חיבור לטבלת shifts
    {
      $lookup: {
        from: "shifts",
        localField: "shiftObjectIds",
        foreignField: "_id",
        as: "shifts"
      }
    },

    // 5️⃣ המרת department_id ל-ObjectId
    {
      $addFields: {
        departmentObjectId: { $toObjectId: "$department_id" }
      }
    },

    // 6️⃣ חיבור לטבלת departments
    {
      $lookup: {
        from: "departments",
        localField: "departmentObjectId",
        foreignField: "_id",
        as: "department"
      }
    },

    // 7️⃣ פתיחת מערך department (יש רק אחד)
    {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true
      }
    },

    // 8️⃣ תוצאה סופית נקייה
    {
      $project: {
        employeeIdStr: 0,
        links: 0,
        shiftObjectIds: 0,
        departmentObjectId: 0,
        "department._id": 0,
        "department.manger_id": 0
      }
    }
  ]);
}

// We add this so if we delete department, we initialize all the 
// employees from this department with department_id: null
const unassignEmployeesByDepartment = (departmentId) => {
  return Employee.updateMany(
    { department_id: departmentId },
    { $set: { department_id: '111111111111111111111111' } } // (General department)
  );
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesWithDepartment,
  getEmployeesWithShifts,
  getEmployeesWithShiftsAndDepName,
  unassignEmployeesByDepartment
};
