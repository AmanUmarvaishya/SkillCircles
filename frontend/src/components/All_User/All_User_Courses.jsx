import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function All_User_Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/user/courses/all_courses");
        // Agar backend se array directly aa raha hai
        setCourses(res.data.All_courses);
        console.log(res.data.All_courses)
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {courses.slice(0, 10).map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card h-100 shadow">
            <Link to={`/show_courses/${course._id}`}>
            <img
                src={course.image}
                className="card-img-top"
                alt={course.title}
                style={{ height: "200px", objectFit: "cover" }}
              />

              </Link>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text fw-bold text-primary">
                  ₹ {course.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
