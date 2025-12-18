import mongoose from "mongoose"
import { Schema } from "mongoose";
import { type } from "os";

//Schema design for the store user information in the formate
const UserSession = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
  

const Session = mongoose.model("session", UserSession);
export default Session;
