import express from "express";

import { isAuth } from "../middleware/isAuth.js";
import { create_courses ,get_courses,show_courses} from "../controller/course/courses.js";
import upload from "../middleware/upload.js";

const CourserRouter = express.Router();

CourserRouter.post("/create",upload.single("image"), create_courses);
CourserRouter.get("/all_courses",get_courses);
CourserRouter.get("/:id",show_courses);



export default CourserRouter;
