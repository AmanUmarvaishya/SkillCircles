

import express from "express";
import cors from "cors";
import authRouter from './routes/auth.js'
import { requestTime } from "./middleware/requestTime.js";// import {DateTime} from 'luxon'
const app = express();
import dotenv from "dotenv";
import CourserRouter from "./routes/course.js";
dotenv.config();
app.use(
  cors({
    // origin: "https://skill-circles.vercel.app",
    origin: process.env.CLIENT_URL, // React URL
    credentials: true,              // cookies / auth allow
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.get('/',(req,res)=>{
    res.send("Backend running..")
})
app.use('/user/auth',requestTime, authRouter)
app.use('/user/courses',requestTime, CourserRouter)

export default app;
