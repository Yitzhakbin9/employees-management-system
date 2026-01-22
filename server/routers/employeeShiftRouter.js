const express = require('express');
const employeeShiftService = require('../services/employeeShiftService');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticateToken);

// Entry Point: http://localhost:3000/employeeShifts

router.get('/:employeeId/shifts', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const shiftForSpecificEmployee = await employeeShiftService.getShiftsByEmployeeId(employeeId);
    res.send(shiftForSpecificEmployee);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const queries = req.query;
    const employeeShifts = await employeeShiftService.getAllEmployeeShifts(queries);
    res.send(employeeShifts);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeShift = await employeeShiftService.getEmployeeShiftById(id);
    res.send(employeeShift);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const employeeShiftObj = req.body;
    const newEmployeeShift = await employeeShiftService.addEmployeeShift(employeeShiftObj);
    res.status(201).send(`The new employeeShift ID: ${newEmployeeShift._id}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await employeeShiftService.updateEmployeeShift(id, data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeShiftService.deleteEmployeeShift(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
