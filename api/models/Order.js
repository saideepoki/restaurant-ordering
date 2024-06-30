import mongoose, {Schema, Document} from "mongoose";


const OrderSchema = new Schema({
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

OrderSchema.methods.calculateTotalAmount = function () {
    let total = 0;
    this.items.forEach((item) => {
      // Assuming MenuItem model has a price field
      total += item.quantity * item.menuItem.price;
    });
    this.totalAmount = total;
  };

const Order = (mongoose.models.Order) || (mongoose.model('Order',OrderSchema));

export default Order;