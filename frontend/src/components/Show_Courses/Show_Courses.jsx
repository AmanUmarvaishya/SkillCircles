import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

export default function Show_Course() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchSingleCourse = async () => {
      try {
        const res = await api.get(`/user/courses/${id}`);
        setCourse(res.data.course);
      } catch (error) {

      }
    };

    fetchSingleCourse();
  }, [id]);


  return (
     <> 
       <Navbar></Navbar>
    <div className="container mt-5" data-aos="fade-left">
      <div className="card shadow p-4">
        <h1> {course?.createdBy}</h1>
        <img
          src={course?.image}
          style={{ height: "400px", objectFit: "cover" }}
          className="mb-4"
          data-aos="zoom-out"
        />
        <h2>{course?.title}</h2>
        <p className="text-muted">{course?.category}</p>
        <p>{course?.description}</p>
        <h4 className="text-primary">₹ {course?.price}</h4>
        <p><strong>Level:</strong> {course?.level}</p>
        <p><strong>Language:</strong> {course?.language}</p>
     <button type="submit" className="btn btn-primary w-100" data-aos="zoom-in"> Buy Now</button>
      </div>

    </div>

    
    <br></br>
    <br /><br />
<Footer></Footer>
    </>
  );
}
