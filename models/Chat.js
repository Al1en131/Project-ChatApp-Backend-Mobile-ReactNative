const { db } = require('../config/db'); // Pastikan Anda sudah mengatur konfigurasi database MySQL

const Chat = {
  // Send a message
  sendMessage: (sender_id, receiver_id, message) => {
    const query = 'INSERT INTO chats (sender_id, receiver_id, message, sent_at) VALUES (?, ?, ?, NOW())';
    
    return new Promise((resolve, reject) => {
      db.query(query, [sender_id, receiver_id, message], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  // Get messages between two users
  getMessages: (user1_id, user2_id) => {
    const query = `
      SELECT * FROM messages
      WHERE (sender_id = ? AND receiver_id = ?)
      OR (sender_id = ? AND receiver_id = ?)
    `;
    
    return new Promise((resolve, reject) => {
      db.query(query, [user1_id, user2_id, user2_id, user1_id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  // Get all messages for a user (from both sender and receiver perspectives)
  getAllMessagesForUser: (user_id) => {
    const query = `
      SELECT * FROM chats
      WHERE sender_id = ? OR receiver_id = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.query(query, [user_id, user_id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = Chat;
