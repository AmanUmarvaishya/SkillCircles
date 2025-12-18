import express from "express";

import {
  login,
  SignUp,
  logOut,
  googleLogin,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controller/user/authUser.js";
import { isAuth } from "../middleware/isAuth.js";
import { loginSchema, otpSchema, signupSchema,otpVerifySchema, resetPasswordSchema } from "../validation/auth.validation.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/google", googleLogin);
router.post("/signup", validate(signupSchema), SignUp);

router.post("/login",validate(loginSchema) ,login);
router.post("/logOut", isAuth, logOut);
router.post("/send-otp",validate(otpSchema), sendOtp);
router.post("/verify-otp",validate(otpVerifySchema), verifyOtp);
router.post("/reset-password",validate(resetPasswordSchema), resetPassword);

export default router;
