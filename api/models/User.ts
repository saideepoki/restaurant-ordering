import mongoose, {Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer','staff'],
        default: 'customer',
        required: true
    },
    otpHash: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    favorites: [
        {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
        }
    ],
    refreshToken: {
        type: String
    }

});

UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.log(err)
        next(err);
    }
})

UserSchema.methods.isPasswordCorrect = async function(password: string) {
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateAccessToken = async function() {
    const payload = {
        id: this._id,
        username: this.username,
        role: this.role
    }
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

UserSchema.methods.generateRefreshToken = async function() {
    const payload = {
        id: this._id,
    }
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const User = (mongoose.models.User) || (mongoose.model("User",UserSchema));

export default User;