import mongoose from "mongoose";
import { Schema } from "mongoose";

//Schema design for the store user information in the formate
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required :true
    },
   role: {
  type: String,
  required:true,
  enum: ["student", "teacher"],
  default: "student"
},
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    picture: { type: String },
    date: {
      //here date is automatically create and store when user give our information
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
User.createIndexes();
export default User;
