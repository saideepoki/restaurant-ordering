import mongoose, {Schema, Document} from "mongoose";


const OrderHistorySchema: Schema = new Schema({
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

const OrderHistory = (mongoose.models.OrderHistory) || (mongoose.model('OrderHistory',OrderHistorySchema));

export default OrderHistory;