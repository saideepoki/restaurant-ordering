import mongoose from "mongoose";
import { populateMenuItems } from "./utils/populateMenuItems";
import { featuredItems } from "./controllers/featuredItems";
import { menuItems } from "./controllers/menuItems";
import cookieParser from "cookie-Parser";
import { authenticateToken } from "./middleware/authenticateToken";
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URL ?? "")
.then(() => console.log("Connected to DB Successfully"))
.catch((err) => console.error(err))
// populateMenuItems();


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())



app.get('/',(req: any,res: any) => {
    res.json({ message: 'Welcome to the dashboard!'});
})

app.get('/featuredItems',featuredItems);

app.get('/menuItems',menuItems);

// routes import
import userRouter from "./routes/user.routes";

// routes declaration
app.use('/user',userRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);


app.listen(4000);