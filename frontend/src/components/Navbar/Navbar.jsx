import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils/Toast_PopUp";
import responseMessage from "../../utils/responseMessage";
import api from "../../api/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await api.post(
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
      handleError(error?.response?.data?.message || responseMessage.LOGOUT_API);
    }
  };

  const user = localStorage.getItem('user-info') 
  const userName= JSON.parse(user)
  return (
    <div classNameName="navbar">
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">

    {/* LEFT : LOGO */}
    <a className="navbar-brand" href="/home">
      <img
        src=""
        alt="Logo"
        width="40"
        height="40"
      />
    </a>

    {/* TOGGLER */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {/* CENTER : SEARCH */}
      <form className="d-flex mx-auto m-2" role="search" style={{ width: "60%" ,height:"40px"}}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
        />
        <button className="btn btn-outline-success"  style={{ width: "30%" }}type="submit">
          Search Courese
        </button>
      </form>
    <h4>{userName.name.split(" ")[0]}</h4>
      {/* RIGHT : LINKS + PROFILE */}
      <ul className="navbar-nav ms-auto align-items-center gap-3">

       <Link onClick={handleLogOut} >Logout</Link>

        <Link className="nav-link" to="/create-course">Create_Course</Link>        


        {/* PROFILE IMAGE */}
        <li className="nav-item dropdown">
          <Link
            to="/profile"
            className="nav-link p-0"
            data-bs-toggle="dropdown"
          >
            <img
              src={userName.picture}
              alt="profile"
              width="40"
              height="40"
              className="rounded-circle border"
            />
          </Link>

        </li>

      </ul>

    </div>
  </div>
</nav>


    </div>
  );
}
