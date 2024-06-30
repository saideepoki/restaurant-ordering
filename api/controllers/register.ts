// controllers/register.js
import User from '../models/User';
import { Request, Response } from 'express';
import crypto from 'crypto';
import { sendVerificationEmail } from '../helpers/sendVerificationEmail';

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUserByUsername = await User.findOne({
        username: username,
        isVerified: true,
    })
    if(existingUserByUsername) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const existingUser = await User.findOne({ email });
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    if (existingUser) {
        if(existingUser.isVerified) {
            return res.status(400).json({ success: false, message: 'Email id already exists and verified' });
        }
        else {
            existingUser.otpHash = otpHash
            existingUser.otpExpires = otpExpires
            await existingUser.save();
        }
    }
    else {
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            otpHash: otpHash,
            otpExpires: otpExpires,
        });

        await newUser.save();
    }

    //send otp
    const emailResponse = sendVerificationEmail(email, otp);
    console.log(`Sending mail to ${email}`)
    if(!emailResponse) {
        return res.status(500).json({ success: false, message: 'Error sending verification email' });
    }
    return res.status(200).json({ success: true, message: 'Verification email sent'})
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}

export default registerUser;
