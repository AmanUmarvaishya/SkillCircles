import mongoose from "mongoose";
import { Schema } from "mongoose";
import { type } from "os";
const courseSchema = new mongoose.Schema(
  {

      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
              ref:"User"
          },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
  

    description: {
      type: String,
      required: true,
      trim: true,
    },

       image: {
        type: String,
        default:
            "https://photographylife.com/wp-content/uploads/2014/06/Nikon-D810-Image-Sample-6.jpg"
    },
    

    category :{
      type: String,
    },

    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    language: {
      type: String,
      required: true,
      enum: ["Hindi", "English", "Hinglish"],
    },

    priceType: {
      type: String,
      enum: ["Free", "Paid"],
      default: "Free",
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
