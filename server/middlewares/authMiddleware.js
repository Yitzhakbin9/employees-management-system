const jwt = require('jsonwebtoken');

// TEST
const SECRET_KEY = process.env.SECRET_KEY

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json('Invalid or expired token');
    }

    // שומרים את המידע על המשתמש לבקשה
    req.user = decoded;
    console.log("Decoded token data: ", decoded);
    next(); // ממשיך לראוטר
  });
};

module.exports = authenticateToken;


// Client
//   ↓ (username + password)
// POST /auth/login
//   ↓
// jwt.sign()
//   ↓
// Client מקבל token
//   ↓
// שומר token
//   ↓
// GET /products + token
//   ↓
// authMiddleware (jwt.verify)
//   ↓
// router.get callback