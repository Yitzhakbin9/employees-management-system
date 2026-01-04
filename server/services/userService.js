const userRepo = require('../repositories/userRepo');

// Get All - Read
const getAllUsers = (filters) => {
  return userRepo.getAllUsers(filters);
};


// Get By ID - Read
const getUserById = (id) => {
  return userRepo.getUserById(id);
};

// Add - Create
const addUser = (newUser) => {
  return userRepo.addUser(newUser);
};

// Update
const updateUser = (id, data) => {
  return userRepo.updateUser(id, data);
};

// Delete
const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
