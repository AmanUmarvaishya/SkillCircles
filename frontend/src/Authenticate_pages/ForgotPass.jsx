import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import api from "../api/axios";
import "./form.moduler.css"

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) return handleError(responseMessage.EMAIL);

    try {
      setLoading(true);

      const { data } = await api.post(
        "/user/auth/send-otp",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        handleSuccess(data.message);
          navigate("/verify-otp", { state: { email } });
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message ||
          responseMessage.FORGOT_PASSWORD_API
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Enter Email</h2>

      <form onSubmit={handleSendOtp}>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? <FaSpinner className="btn-spinner" /> : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
