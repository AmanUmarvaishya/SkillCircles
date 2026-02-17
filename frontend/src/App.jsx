import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Login_page from "./Authenticate_pages/Login_page";
import Signup_page from "./Authenticate_pages/Signup_page";
import Home from "./components/Home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPass from "./Authenticate_pages/ForgotPass";
import VerifyOtp from "./Authenticate_pages/Verify_OTP";
import NewPassword from "./Authenticate_pages/NewPassword";
import { ToastContainer } from "react-toastify";
import Page_Create_Courses from "./components/courses/Create_courses/Page_Create_Courses";
import Page_Edit_Courses from "./components/courses/Edit_courses/Page_Edit_Courses";
import Profile_Page from "./components/User_Profile/Profile_Page";
import Show_Courses from "./components/All_User/Show_Courses";
function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="32712112537-cnnja1igk003654n2o0sqorm1efv474c.apps.googleusercontent.com">
        <div className="bgColor">
          <Login_page />
        </div>
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup_page />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot" element={<ForgotPass />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/new-password" element={<NewPassword />} />


          <Route path="/create-course" element={<Page_Create_Courses />} />
          <Route path="/edit-course" element={<Page_Edit_Courses />} />
           <Route path="/profile" element={<Profile_Page />} />
           <Route path="/show_courses/:id" element ={<Show_Courses/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
