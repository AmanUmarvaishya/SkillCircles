import React, { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    language: "",
    priceType: "Free",
    price: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("level", formData.level);
    data.append("language", formData.language);
    data.append("priceType", formData.priceType);
    data.append("price", formData.priceType === "Paid" ? formData.price : 0);
    data.append("image", image);

    try {
      await axios.post(
        "http://localhost:8080/user/courses/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
      );
      alert("Course created successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Create New Course</h3>

          <form onSubmit={handleSubmit}>
            {/* Course Image */}
            <div className="mb-3">
              <label className="form-label">Course Image *</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            {/* Course Title */}
            <div className="mb-3">
              <label className="form-label">Course Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Short Description */}
            <div className="mb-3">
              <label className="form-label">Short Description *</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option>Web Development</option>
                <option>Mobile App Development</option>
                <option>Cloud Computing</option>
                <option>Data Science</option>
                <option>Interview Preparation</option>
                <option>Government Exam</option>
                <option>Banking Exam</option>
              </select>
            </div>

            {/* Course Level */}
            <div className="mb-3">
              <label className="form-label">Course Level *</label>
              <select
                className="form-select"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Select Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Language */}
            <div className="mb-3">
              <label className="form-label">Language *</label>
              <select
                className="form-select"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              >
                <option value="">Select Language</option>
                <option>Hindi</option>
                <option>English</option>
                <option>Hinglish</option>
              </select>
            </div>

            {/* Price Type */}
            <div className="mb-3">
              <label className="form-label">Price Type *</label>
              <select
                className="form-select"
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                required
              >
                <option>Free</option>
                <option>Paid</option>
              </select>
            </div>

            {/* Course Price */}
            {formData.priceType === "Paid" && (
              <div className="mb-4">
                <label className="form-label">Course Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
