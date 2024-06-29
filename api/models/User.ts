import mongoose, {Schema, Document} from "mongoose";



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
    }

})

const User = (mongoose.models.User) || (mongoose.model("User",UserSchema));

export default User;