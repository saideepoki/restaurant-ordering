export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming role is stored in req.user after authentication
        if (allowedRoles.includes(userRole)) {
            next(); // Role is allowed, so continue to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
        }
    };
};
