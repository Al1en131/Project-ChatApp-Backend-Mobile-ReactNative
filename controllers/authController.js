const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register User
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const results = await User.findByEmail(email);
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Simpan pengguna baru
    await User.register(username, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const results = await User.findByEmail(email);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Bandingkan password yang dimasukkan dengan yang ada di database
    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Jika password cocok, buat token JWT
    const token = jwt.sign({ userId: results[0].id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
};

const getAllUsers = (req, res) => {
  User.getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch users" });
    });
};

module.exports = { register, login, getAllUsers };
