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

    const course = new Course({
      title,
      description,
      category,
      level,
      language,
      priceType,
      price: priceType === "Paid" ? price : 0,
       image: req.file.path,
    });

    
await course.save()
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
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
}

export const show_courses=async(req,res)=>{
const course = await Course.findById(req.params.id);
  res.json({
   success: true,
   course
});
  }
