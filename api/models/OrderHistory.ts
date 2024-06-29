import mongoose, {Schema, Document} from "mongoose";

export interface OrderHistoryDocument extends Document {
customer: mongoose.Types.ObjectId;
orders: mongoose.Types.ObjectId[]
}

const OrderHistorySchema: Schema<OrderHistoryDocument> = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        }
    ]
})

const OrderHistory = (mongoose.models.OrderHistory) || (mongoose.model<OrderHistoryDocument>('OrderHistory',OrderHistorySchema));

export default OrderHistory;