import mongoose, {Schema, Document} from "mongoose";


export interface OrderItem {
    menuItem: Schema.Types.ObjectId;
    quantity: number;
}
export interface OrderDocument extends Document {
    customer: mongoose.Types.ObjectId;
    tableNumber: number;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'completed';
    createdAt: Date;
}

const OrderSchema: Schema<OrderDocument> = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tableNumber: {
        type: Number,
        required: true
    },
    items: [
        {
            menuItem: {
                type: Schema.Types.ObjectId,
                ref: 'MenuItem',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','completed'],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = (mongoose.models.Order) || (mongoose.model<OrderDocument>('Order',OrderSchema));

export default Order;