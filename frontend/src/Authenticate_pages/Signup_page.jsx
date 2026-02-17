import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;

    if (!name) return handleError(responseMessage.USERNAME);
    if (!email) return handleError(responseMessage.EMAIL);
    if (!password) return handleError(responseMessage.PASSWORD);

    try {
      setLoading(true);

      const { data } = await api.post(
        "/user/auth/signup",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        handleSuccess(data.message);
       navigate("/login")
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message || responseMessage.SIGNUP_API
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Auth-container">
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <label>
          Name
          <input className="Auth-input"
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input  className="Auth-input"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input  className="Auth-input"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="Auth-button" disabled={loading}>
          {loading ? <FaSpinner className="btn-spinner" /> : "Signup"}
        </button>
      </form>

      <Link className="Auth-link" to="/login">
        Already have an account? Login
      </Link>
    </div>
  );
}
