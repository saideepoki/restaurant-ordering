import mongoose,{Schema, Document} from "mongoose";

export type MenuItemCategory =
  | 'starters'
  | 'main courses'
  | 'breads'
  | 'rice & biryani'
  | 'desserts'
  | 'drinks'
  | 'sides'
  | 'appetizers';

export interface MenuItemDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: MenuItemCategory;
    imageUrl: string;
    featured: boolean;
}

const MenuItemSchema: Schema<MenuItemDocument> = new Schema({
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
    featured: {
        type: Boolean,
        default: false
    }
})

const MenuItem = (mongoose.models.MenuItem) || (mongoose.model<MenuItemDocument>("MenuItem",MenuItemSchema));

export default MenuItem;