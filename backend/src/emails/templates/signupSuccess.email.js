export const signupSuccessEmail = ({ name }) => ({
  html: `
    <h2>Signup Successful 🎉</h2>

    <p>Hello ${name},</p>

    <p>Your Acme account has been created successfully.</p>

    <p>You can now log in and start using our services.</p>

    <br/>
    <p>Thanks for joining us,</p>
    <p><strong>Acme Team</strong></p>
  `,
});
