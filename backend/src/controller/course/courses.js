import { scryptSync } from "crypto";
import Course from "../../models/Course.js";

export const create_courses = async (req, res) => {
  try {
    const { title, description, category, level, language, priceType, price } =
      req.body;
   
    // basic validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Course image is required",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      level,
      language,
      priceType,
      price: priceType === "Paid" ? price : 0,
       image: req.file.path,
    });
    // console.log(course)
await course.save()
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const get_courses =async(req,res)=>{
   let All_courses = await Course.find({});
   res.status(200).json({
    success: true,
    message : "all Courses available",
    All_courses
     })
   console.log("hii")
}

export const show_courses=async(req,res)=>{
const course = await Course.findById(req.params.id);
  res.json({
   success: true,
   course
});
  console.log("kkk")
  }
