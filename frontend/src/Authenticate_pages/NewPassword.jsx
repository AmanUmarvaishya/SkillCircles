import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import api from "../api/axios";

export default function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password) return handleError(responseMessage.PASSWORD);
    if (!confirmPassword) return handleError(responseMessage.CONFIRMPASSWORD);
    if (password !== confirmPassword)
      return handleError(responseMessage.SAMEPASSPORD);

    try {
      setLoading(true);

      const { data } = await api.post(
        "/user/auth/reset-password",
        { email, password, confirmPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message ||
          responseMessage.NEW_PASSWORD_API
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create New Password</h2>

      <form onSubmit={handleReset}>
        <label>
          Password
          <input
            type={show ? "text" : "password"}
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Confirm Password
          <input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <span className="icon" onClick={() => setShow(!show)}>
          Show Password {show ? <FiEyeOff /> : <FiEye />}
        </span>

        <button type="submit" disabled={loading}>
          {loading ? <FaSpinner className="btn-spinner" /> : "Save Password"}
        </button>
      </form>
    </div>
  );
}
