const express = require('express');
const shiftService = require('../services/shiftService');

const router = express.Router();

// Entry Point: http://localhost:3000/shifts

router.get('/', async (req, res) => {
  console.log('connected to server')
  try {
    const queries = req.query;
    const shifts = await shiftService.getAllShifts(queries);
    res.send(shifts);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await shiftService.getShiftById(id);
    res.send(shift);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const shiftObj = req.body;
    const newShift = await shiftService.addShift(shiftObj);
    res.status(201).send(`The new shift ID: ${newShift._id}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await shiftService.updateShift(id, data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await shiftService.deleteShift(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
