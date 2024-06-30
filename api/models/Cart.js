// models/CartItem.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const CartItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);

export default CartItem;
