const { db } = require("../config/db");
const Chat = require("../models/Chat");

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
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Failed to fetch messages" });
    });
};

// Fungsi untuk mengambil semua pesan untuk pengguna tertentu
const getAllMessagesForUser = (req, res) => {
  const { userId } = req.params;
  console.log("Fetching messages for userId:", userId); // Log userId

  Message.getAllMessagesForUser(userId)
    .then((messages) => {
      console.log("Messages retrieved:", messages); // Log pesan yang ditemukan
      if (messages.length === 0) {
        return res
          .status(200)
          .json({ message: "No messages found for this user." });
      }
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.error("Error fetching messages:", err);
      res.status(500).json({
        message: "Error fetching messages",
        error: err,
      });
    });
};

module.exports = {
  sendMessage,
  getMessages,
  getAllMessagesForUser,
};
