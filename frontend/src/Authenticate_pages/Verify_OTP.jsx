import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import api from "../api/axios";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);

  /* ⏱️ TIMER */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ✅ VERIFY OTP */
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) return handleError(responseMessage.OTP);

    try {
      setLoading(true);

      const { data } = await api.post(
        "/user/auth/verify-otp",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        handleSuccess(data.message);
          navigate("/new-password", { state: { email } });
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message ||
          responseMessage.VERIFY_OTP_API
      );
    } finally {
      setLoading(false);
    }
  };

  /* 🔁 RESEND OTP */
  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      const { data } = await api.post(
        "/user/auth/send-otp",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        handleSuccess("OTP resent successfully");
        setTimer(60); // reset timer
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(responseMessage.FORGOT_PASSWORD_API);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="Auth-container">
      <h2>Verify OTP</h2>

      <h4>
        OTP has been sent to <b>{email}</b>{" "}
        <Link className="link" to="/forgot">
          Edit Email
        </Link>
      </h4>

      <form onSubmit={handleVerify}>
        <label>
          Enter 6 digit OTP
          <input className="Auth-input"
            type="number"
            placeholder="Enter 6 digit OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </label>

        <button type="submit" className="Auth-button" disabled={loading}>
          {loading ? <FaSpinner className="btn-spinner" /> : "Verify OTP"}
        </button>
      </form>

      {/* ⏱️ TIMER + RESEND */}
      <div className="otp-footer">
        {timer > 0 ? (
          <p className="timer-text">
            Resend OTP in <b>{timer}s</b>
          </p>
        ) : (
          <button
            className="Auth-button"
            onClick={handleResendOtp}
            disabled={resendLoading}
          >
            {resendLoading ? (
              <FaSpinner className="btn-spinner" />
            ) : (
              "Resend OTP"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
