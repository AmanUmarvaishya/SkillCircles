

import express from "express";
import cors from "cors";
import authRouter from './routes/auth.js'
import { requestTime } from "./middleware/requestTime.js";// import {DateTime} from 'luxon'
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // React URL
    credentials: true,              // cookies / auth allow
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Backend running..")
})
app.use('/user/auth',requestTime, authRouter)

export default app;
