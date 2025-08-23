import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDb from "./config/dbConnection.js";
const PORT = 9080;

import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';


dotenv.config();

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT=${PORT}`);
})