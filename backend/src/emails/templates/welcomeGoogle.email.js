export const welcomeGoogleEmail = ({ name, email }) => ({
  html: `
    <h2>Welcome to Acme, ${name} 👋</h2>

    <p>You have successfully signed up using <strong>Google</strong>.</p>

    <p><strong>Email:</strong> ${email}</p>

    <p>No password setup is required.</p>

    <br/>
    <p>Cheers,</p>
    <p><strong>Acme Team</strong></p>
  `,
});
