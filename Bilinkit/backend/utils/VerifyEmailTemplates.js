const verifyEmailTemplates = ({ name, url }) => {
    return `
    <h1>Welcome to Bilinkit</h1>
    <p>Dear ${name},</p>
    <p>Thank you for signing up for Bilinkit. Please verify your email by clicking the below link:</p>
    <a href="${url}">Verify Email</a>
    <p>If you did not sign up for Bilinkit, please ignore this email.</p>
    `;
};