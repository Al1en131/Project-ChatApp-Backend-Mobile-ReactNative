const bcrypt = require('bcryptjs');
const { db } = require('../config/db');

const User = {
  // Register a new user
  register: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // Find a user by email
  findByEmail: (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = User;
