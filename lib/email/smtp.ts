import nodemailer from "nodemailer";
import type { EmailProvider } from "./types";

// Talks to any standard SMTP server via Nodemailer. Swapping providers
// later means adding a sibling file here and changing the selection in
// index.ts — auth.ts and the API routes that call sendEmail() don't change.
export function createSmtpProvider(config: {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}): EmailProvider {
  // 465 is implicit TLS ("secure"); 587 (and everything else) is STARTTLS,
  // negotiated after an initial plaintext connection — nodemailer expects
  // secure: false for that case even though the connection ends up
  // encrypted.
  const secure = config.port === 465;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure,
    auth: { user: config.user, pass: config.pass },
  });

  return {
    name: "smtp",
    async send(message) {
      await transporter.sendMail({
        from: config.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.replyTo ? { replyTo: message.replyTo } : {}),
      });
    },
  };
}
