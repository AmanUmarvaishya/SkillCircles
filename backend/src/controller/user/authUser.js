import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
import { sendEmail } from "../../services/email.js";
import dotenv from "dotenv";
import responseMessage from "../../assets/responseMessage.js";
import { oauth2client } from "../../utils/googleConfig.js";
import { sendOtpToEmail } from "../../services/otp.js";
import { EMAIL_SUBJECTS } from "../../emails/emailSubjects.js";
import { welcomeEmail } from "../../emails/templates/welcome.email.js";
import { signupSuccessEmail } from "../../emails/templates/signupSuccess.email.js";
import { welcomeGoogleEmail } from "../../emails/templates/welcomeGoogle.email.js";
import { otpVerifiedEmail } from "../../emails/templates/otpVerified.email.js";
import { passwordResetEmail } from "../../emails/templates/passwordReset.email.js";
import Session from "../../models/session.js";
dotenv.config();

export const SignUp = async (req, res) => {
  // Check wheather the user with this email already
  const { name, email, password ,role} = req.body;
   try {
    let exist_user = await User.findOne({ email });
    if (exist_user) {
      return res
        .status(400)
        .json({ message: responseMessage.USER_ALREADY_EXIST, success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
 
    const user = await User.create({
      name: name,
      email: email,
      password: secPass,
      role:role

    });
    console.log(user)

    user.isVerified = true;
    await user.save();
    
    await sendEmail(
      email,
      EMAIL_SUBJECTS.SIGNUP_SUCCESS,
      signupSuccessEmail({ name: user.name }).html
    );

    return res.json({
      user,
      message: responseMessage.USER_SUCCESSFULL_SIGNUP,
      success: true,
    });

  } catch (error) {
    res.status(501).json({ error: responseMessage.USER_SIGNUP_ERROR  });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;
    const { date } = userRes.headers;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, date, picture });
    }
       try {
      const existSession = await Session.findOne({ userId: user._id });
      if (existSession) {
        await Session.deleteOne({ userId: user._id });
      }

      await Session.create({ userId: user._id });
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "session not created" });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    await sendEmail(
      email,
      EMAIL_SUBJECTS.GOOGLE_WELCOME,
      welcomeGoogleEmail({ name: name, email: email }).html
    );
    user.isVerified = true;
    user.isLoggedIn = true;
    user.token = token;
    await user.save();
    return res.status(200).json({
      message: `${responseMessage.GOOGLE_SIGNUP} with ${name}`,
      token,
      user,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: responseMessage.INVALID_EMAIL, success: false });
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
      return res
        .status(401)
        .json({ message: responseMessage.INVALID_PASSWORD, success: false });
    }
    
    if (user.isVerified !== true) {
      return res
        .status(400)
        .json({ message: "user Not verified ", success: false });
    }

    try {
      const existSession = await Session.findOne({ userId: user._id });
      if (existSession) {
        await Session.deleteOne({ userId: user._id });
      }

      await Session.create({ userId: user._id });
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "session not created" });
    }

     const token =jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
     user.token = token;
     user.isLoggedIn = true;
     await user.save();
     
         await sendEmail(
           email,
           EMAIL_SUBJECTS.WELCOME,
           welcomeEmail({ name: user.name }).html
         );

    return res.status(200).json({
      token,
      message: responseMessage.USER_SUCCESSFULL_LOGIN,
      success: true,
      user
    });
  } catch (error) {
    return res.status(400).send(responseMessage.USER_LOGIN_ERROR);
  }
};

export const logOut = async (req, res) => {
  try {
    const userId = req.user;
    await Session.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res
      .status(200)
      .json({ message: "logout successful", success: true });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "internal server error" });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    await sendOtpToEmail({ email });
    return res
      .status(200)
      .json({ message: "otp send success full", success: true });
  } catch (error) {
    res.status(400).json({ message: false });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // OTP not generated or already verified
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not generated or already verified",
      });
    }

    // OTP expired
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one",
      });
    }

    //  Hash incoming OTP (same as store time)
    const hashedOtp = await crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Compare hashes
    if (hashedOtp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    
    await sendEmail(
      email,
      EMAIL_SUBJECTS.OTP_VERIFIED,
      otpVerifiedEmail({ name: user.name }).html
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { password, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "password not match" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    user.isVerified = true;
    await user.save();

    await sendEmail(
      email,
      EMAIL_SUBJECTS.PASSWORD_RESET,
      passwordResetEmail({ name: user.name }).html
    );
    return res
      .status(200)
      .json({ message: "password reset susseccfull", success: true });
  } catch (error) {
    return res.status(500).json({ message: "internal error", success: false });
  }
};
