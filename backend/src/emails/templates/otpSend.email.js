export const otpSendEmail = ({ name, otp }) => ({
  html: `
    <h2>OTP Verification</h2>

    <p>Hello ${name},</p>

    <p>Your One-Time Password (OTP) is:</p>

    <h1 style="letter-spacing: 4px;">${otp}</h1>

    <p>This OTP is valid for <strong>10 minutes</strong>.</p>

    <p>If you did not request this, please ignore this email.</p>

    <br/>
    <p>Security Team</p>
    <p><strong>Acme</strong></p>
  `,
});
