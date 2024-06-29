import mongoose,{Schema, Document} from "mongoose";


const MenuItemSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['starters','main courses','breads','rice & biryani','desserts','drinks','sides','appetizers'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    featured: {
        type: Boolean,
        default: false
    }
})

const MenuItem = (mongoose.models.MenuItem) || (mongoose.model("MenuItem",MenuItemSchema));

export default MenuItem;