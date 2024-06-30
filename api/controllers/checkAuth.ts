import jwt from 'jsonwebtoken';
import User from '../models/User';

export async function checkAuth(req, res) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ isAuthenticated: false, message: 'No token provided' });
    }

    // Verify token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ isAuthenticated: false, message: 'Token is not valid' });
      }

      // Check if user exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ isAuthenticated: false, message: 'User not found' });
      }

      // Authentication successful
      res.status(200).json({ isAuthenticated: true });
    });
  } catch (error) {
    res.status(500).json({ isAuthenticated: false, message: 'Internal Server Error' });
  }
}
