const jwt = require('jsonwebtoken');

export function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; // Attach user data from token payload to request object
    next(); 
  });
}

