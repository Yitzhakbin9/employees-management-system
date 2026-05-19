const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jf = require('jsonfile');

const FILE = 'usersActions.json';


// Entry Point: http://localhost:3000/auth

router.post('/login', (req, res) => {

  const username = req.body.username?.trim();
  const { email } = req.body;

  if (username === process.env.USER_NAME && email === process.env.EMAIL) {
    const userId = process.env.ID; // In real life you would use a database to get the user ID based on the username/email
    const SECRET_KEY = process.env.SECRET_KEY
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});


router.post('/logout', (req, res) => {
  res.status(200).send({ message: 'Logout success' });
});


module.exports = router;
