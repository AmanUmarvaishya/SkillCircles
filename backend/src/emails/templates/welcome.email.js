export const welcomeEmail = ({ name }) => ({
  html: `
    <h2>Welcome to Acme, ${name} 👋</h2>
    <p>We’re excited to have you on board.</p>

    <p>Your account has been created successfully.</p>

    <p>You can now explore all features and start using Acme.</p>

    <br/>
    <p>Best Regards,</p>
    <p><strong>Acme Team</strong></p>
  `,
});
