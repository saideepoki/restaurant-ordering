import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }

        try {
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            req.user = { id: user._id, role: user.role };
            next();
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
};
