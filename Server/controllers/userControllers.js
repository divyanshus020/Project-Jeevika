const userModel = require('../models/userModel');

const getAllUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
    return res.status(200).json(users);
  });
};

module.exports = {
  getAllUsers
};
