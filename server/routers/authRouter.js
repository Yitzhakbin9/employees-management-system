const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: http://localhost:3000/auth

router.post('/login', (req, res) => {
  const { username, email } = req.body;

  if (true) {
  // if  (username === 'admin' && email === 'admin@gmail.com') {
  // if(username === process.env.USER_NAME && email === process.env.EMAIL) {
    const userId = 'some_id';
    const SECRET_KEY = process.env.SECRET_KEY
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });    
    res.send({ token });
  }
});

module.exports = router;
