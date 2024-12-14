const authenticate = (req, res, next) => {
    if (req.session && req.session.user_id) {
      req.user_id = req.session.user_id; // Tambahkan user_id ke req untuk handler berikutnya
      next(); // Lanjutkan ke middleware atau handler berikutnya
    } else {
      res.status(401).json({ message: 'Harap login terlebih dahulu' });
    }
  };
  
  module.exports = authenticate;
  