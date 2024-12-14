const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // Berikan data user ke request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = authMiddleware;
