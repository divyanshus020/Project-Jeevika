const db = require('../config/db');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.log('Error retrieving users:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllUsers
};
