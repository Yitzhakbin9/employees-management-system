const express = require('express');
const userService = require('../services/userService');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticateToken);

// Entry Point: http://localhost:3000/users

router.get('/', async (req, res) => {
  try {
    const queries = req.query;
    const users = await userService.getAllUsers(queries);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const userObj = req.body;
    const newuser = await userService.addUser(userObj);
    res.status(201).send(`The new user ID: ${newuser._id}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await userService.updateUser(id, data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
