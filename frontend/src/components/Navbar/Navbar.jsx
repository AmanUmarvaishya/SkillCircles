import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/Toast_PopUp";
import responseMessage from "../../utils/responseMessage";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
       const token = localStorage.getItem("token");
       console.log(token)
      const { data } =axios.post(
  "http://localhost:8080/api/auth/logOut",
  { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
);


      if (data.success) {
        handleSuccess(data.message || "Logout successful");

        // local storage clean
        localStorage.removeItem("token");

        navigate("/login");
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message || responseMessage.LOGOUT_API
      );
    }
  };

  return (
    <div className="navbar">
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}
