import React from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils/Toast_PopUp";
import responseMessage from "../../utils/responseMessage";
import api from "../../api/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } =await api.post(
  "/user/auth/logOut",
   {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

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
      import Button from 'react-bootstrap/Button';
 <button variant="success">Save</button>;

    </div>
  );
}
