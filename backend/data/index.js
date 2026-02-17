import mongoose from "mongoose";
import Course from "../src/models/Course.js";
import { sampleCourses } from "./Course.js";

const MONGO_URI='mongodb://localhost:27017/userdata'

async function main() {
    await mongoose.connect(MONGO_URI)
}
main().then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})

const initDB = async()=>{
    await Course.deleteMany({});
    // sampleCourses.data=sampleCourses.data.map((obj)=>({...obj , owner:'67dc53cbbdb3fd302c96b149',}))
    await Course.insertMany(sampleCourses);
    console.log("data was initialized");

}
initDB();