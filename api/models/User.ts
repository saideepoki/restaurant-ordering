import mongoose, {Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';

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

const User = (mongoose.models.User) || (mongoose.model("User",UserSchema));

export default User;