const express = require('express');
const router = express.Router();
const { register, login, getAllUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);


// Protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
