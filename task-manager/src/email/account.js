import {Resend} from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ name, email }) {
  try {
    const response = await resend.emails.send({
      from: "hameedattimileyinoyewopo@gmail.com",
      to: email,
      subject: `Welcome ${name}!`,
      html: `
        <h2>Hello ${name},</h2>
        <p>Welcome to our platform. We’re happy to have you here!</p>
      `,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}