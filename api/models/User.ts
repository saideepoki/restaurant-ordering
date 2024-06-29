import mongoose, {Schema, Document} from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    otpHash: string;
    otpExpires: Date;
    isVerified: boolean;
    role: "customer" | "staff";
}

const UserSchema: Schema<UserDocument> = new Schema({
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

const User = (mongoose.models.User) || (mongoose.model<UserDocument>("User",UserSchema));

export default User;