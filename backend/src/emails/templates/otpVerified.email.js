export const otpVerifiedEmail = ({ name }) => ({
  html: `
    <h2>OTP Verified ✅</h2>

    <p>Hello ${name},</p>

    <p>Your OTP has been verified successfully.</p>

    <p>Your account is now secure and active.</p>

    <br/>
    <p>Regards,</p>
    <p><strong>Acme Team</strong></p>
  `,
});
