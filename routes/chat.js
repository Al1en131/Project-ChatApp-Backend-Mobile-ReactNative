const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getAllMessagesForUser,
} = require("../controllers/chatController");

// Route untuk mengirim pesan
router.post("/send", sendMessage);

// Route untuk mengambil pesan antara dua pengguna
router.get("/messages/:user1_id/:user2_id", getMessages);

// Route untuk mengambil semua pesan untuk pengguna tertentu
router.get("/messages/user/:user_id", getAllMessagesForUser);


module.exports = router;
