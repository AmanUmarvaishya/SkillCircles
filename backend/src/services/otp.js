import { hashOtp, generateOtp } from "../utils/cyrptoOtp.js";
import { sendEmail } from "./email.js";
import User from "../models/User.js";
import { otpSendEmail } from "../emails/templates/otpSend.email.js";
import { EMAIL_SUBJECTS } from "../emails/emailSubjects.js";

export const sendOtpToEmail = async ({ email }) => {
  try {
     const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Enter right email " });
  }
  
  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiry = new Date(Date.now() + 5 * 60 * 1000);
  user.otp = otpHash;
  user.otpExpiry = expiry;

  await sendEmail(
    email,
    EMAIL_SUBJECTS.OTP_SEND,
    otpSendEmail({ name: user.name, otp }).html
  );

  await user.save();
  } catch (error) {
     return res.status(401).json({
      success: false,
      message: "otp has not send",
    });
  }
 

};
