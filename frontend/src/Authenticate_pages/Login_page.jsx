import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import api from "../api/axios";

export default function Login_page() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email) return handleError(responseMessage.EMAIL);
    if (!password) return handleError(responseMessage.PASSWORD);

    try {
      setLoading(true);

      const { data } = await api.post(
       "/user/auth/login",
        loginInfo,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (data.success) {
        handleSuccess(data.message);
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/home"), 1500);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message || responseMessage.LOGIN_API
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? <FaSpinner className="btn-spinner" /> : "Login"}
        </button>

        <Link className="link" to="/forgot">
          Forgot Password?
        </Link>

        <Link className="link" to="/signup">
          Create Account
        </Link>
      </form>

      <div className="googleInside">
        <GoogleLogin />
      </div>
    </div>
  );
}
