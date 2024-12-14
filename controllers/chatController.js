const { db } = require("../config/db");
const Chat = require('../models/Chat');

// Fungsi untuk mengirim pesan
const sendMessage = (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  const query = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;

  db.query(query, [sender_id, receiver_id, message], (err, results) => {
    if (err) {
      console.error("Gagal mengirim pesan:", err);
      return res.status(500).json({ error: "Gagal mengirim pesan" });
    }

    res.status(201).json({ message: "Pesan terkirim" });
  });
};

const getMessages = (req, res) => {
  const { user1_id, user2_id } = req.params;
  
  Chat.getMessages(user1_id, user2_id)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: 'Failed to fetch messages' });
    });
};




// Fungsi untuk mengambil semua pesan untuk pengguna tertentu
const getAllMessagesForUser = (req, res) => {
  const { userId } = req.params;

  const query = `
  SELECT * FROM messages 
  WHERE sender_id = ? OR receiver_id = ?
  ORDER BY created_at DESC
`;

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching messages", error: err });
    }
    res.status(200).json(results); // Send the fetched messages as response
  });
};

module.exports = {
  sendMessage,
  getMessages,
  getAllMessagesForUser,
};
