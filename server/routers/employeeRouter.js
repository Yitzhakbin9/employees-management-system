const express = require('express');
const employeeService = require('../services/employeeService');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Entry Point: http://localhost:3000/employees


// Specific router ALLWAYS comes first, because if we put get/id first, node will 
// try it and fail (it will put 'with-department' as an id and wont find it)

router.get('/with-department', async (req, res) => {
  try {
    const employeesWithDep = await employeeService.getEmployeesWithDepartment();
    res.json(employeesWithDep);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/with-shifts', async (req, res) => {
  try {
    const employeesWithShifts = await employeeService.getEmployeesWithShifts();
    res.json(employeesWithShifts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/full-details', async (req, res) => {
  try {
    const employeeFullDetails = await employeeService.getEmployeesWithShiftsAndDepName();
    res.json(employeeFullDetails);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/', authenticateToken, async (req, res) => {
  console.log("req: " , req)
  console.log("req.user: " , req.user)


  try {
    const queries = req.query;
    const employees = await employeeService.getAllEmployees(queries);
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.get('/', async (req, res) => {
//   console.log('connected to server')
//   try {
//     const queries = req.query;
//     const employees = await employeeService.getAllEmployees(queries);
//     res.send(employees);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const employeeObj = req.body;
    const newEmployee = await employeeService.addEmployee(employeeObj);
    res.status(201).send(`The new employee ID: ${newEmployee._id}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await employeeService.updateEmployee(id, data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.deleteEmployee(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});





module.exports = router;
