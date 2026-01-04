const User = require('../models/userModel');

// Get All
const getAllUsers = (filters) => {
  return User.find(filters);
};

// Get By ID
const getUserById = (id) => {
  return User.findById(id);
};

// Create
const addUser = (obj) => {
  return User.create(obj);
};

// Update
const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
