const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/shiftsManagerDB')
    .then(() => console.log('shiftsManagerDB'))
    .catch(console.log);
};

module.exports = connectDB;
