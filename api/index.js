import mongoose from "mongoose";
import { populateMenuItems } from "./utils/populateMenuItems.js";
import { featuredItems } from "./controllers/featuredItems.js";
import { menuItems } from "./controllers/menuItems.js";
import { authenticateToken } from "./middleware/authenticateToken.js";
import orderRouter from "./routes/order.routes.js";
import cartRouter from "./routes/cart.routes.js";
import staffRouter from "./routes/staff.routes.js";
import { authorizeRole } from "./middleware/authorizeRoles.js";
import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 4000;

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

app.get('/',(req,res) => {
    res.json({ message: 'Welcome to the dashboard!'});
})

app.get('/featuredItems',featuredItems);

app.get('/menuItems',menuItems);

// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use('/user',userRouter);
app.use('/staff', staffRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);


app.listen(port);