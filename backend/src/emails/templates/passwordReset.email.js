export const passwordResetEmail = ({ name }) => ({
  html: `
    <h2>Password Reset Successful 🔒</h2>

    <p>Hello ${name},</p>

    <p>Your password has been reset successfully.</p>

    <p>If you did not perform this action, please contact support immediately.</p>

    <br/>
    <p>Stay Safe,</p>
    <p><strong>Acme Security Team</strong></p>
  `,
});
