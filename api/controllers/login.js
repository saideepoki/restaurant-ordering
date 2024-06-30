import User from "../models/User.js";

export async function loginUser(req, res) {
    const { identifier, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
            role: 'customer'
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        // Set cookies
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.status(200).json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function loginStaff(req, res) {
    const { identifier, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
            role: 'staff'
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        // Set cookies
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.status(200).json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
