import register from "./controllers/register";
import mongoose from "mongoose";

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


mongoose.connect(process.env.MONGODB_URL ?? "")
.then(() => console.log("Connected to DB Successfully"))
.catch((err) => console.error(err))


app.get('/',(req: any,res: any) => {
    res.json("Home route")
})

app.post('/register', register);

app.listen(4000);