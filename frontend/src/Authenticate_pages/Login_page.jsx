import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import api from "../api/axios";
import './form.moduler.css'


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
        localStorage.setItem("user-info", JSON.stringify(data.user));
       navigate("/home")
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
    <div className="Auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>
          Email
          <input className="Auth-input"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input className="Auth-input"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="Auth-button" disabled={loading}>
          {loading ? <FaSpinner className="btn-spinner" /> : "Login"}
        </button>

        <Link className="Auth-link" to="/forgot">
          Forgot Password?
        </Link>

        <Link className="Auth-link" to="/signup">
          Create Account
        </Link>
      </form>

      <div className="Auth-googleInside">
        <GoogleLogin />
      </div>
    </div>
  );
}
