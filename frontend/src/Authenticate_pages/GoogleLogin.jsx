import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Toast_PopUp";
import responseMessage from "../utils/responseMessage";
import { googleAuth } from "../api/axios";
import "./form.moduler.css"

function GoogleLogin() {
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {  
      if (authResult["code"]) {//google server connect and find code
        const result = await googleAuth(authResult["code"]);        
        const { email, name ,picture} = result.data.user; //find user email , name
        const token = result.data.token;
        const obj = { email, name, token,picture };        
        localStorage.setItem("token", JSON.stringify(obj.token));
         localStorage.setItem("user-info", JSON.stringify(obj));
        if(result){
          handleSuccess(result.data.message)
        }
          navigate("/home");
      }
    } catch (error) {
      handleError(responseMessage.GOOGLE_SIGNUP_API)
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div>
      <button onClick={googleLogin} className="Auth-button">
        Sign in with google 
      </button>
        
    </div>
    
  );
}

export default GoogleLogin;
