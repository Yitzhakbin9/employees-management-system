const express = require('express');
const departmentService = require('../services/departmentService');
const authenticateToken = require('../middlewares/authMiddleware');


const router = express.Router();

// Entry Point: http://localhost:3000/departments

// router.get('/', authenticateToken, async (req, res) => {
//   console.log("req: ",req)
//   try {
//     const queries = req.query;
//     const departments = await departmentService.getAllDepartments(queries);
//     res.send(departments);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get('/department-with-employees', async (req, res) => {
  console.log('connected to server')
  try {
    const queries = req.query;
    const departments = await departmentService.getDepartmentsWithEmployeesData(queries);
    res.send(departments);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/', async (req, res) => {
  console.log('connected to server')
  try {
    const queries = req.query;
    const departments = await departmentService.getAllDepartments(queries);
    res.send(departments);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentService.getDepartmentById(id);
    res.send(department);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const departmentObj = req.body;
    const newDepartment = await departmentService.addDepartment(departmentObj);
    res.status(201).send(`The new department ID: ${newDepartment._id}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await departmentService.updateDepartment(id, data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await departmentService.deleteDepartment(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
