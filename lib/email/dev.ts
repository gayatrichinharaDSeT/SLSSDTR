import type { EmailProvider } from "./types";

// Never sends real email. Used whenever no transactional email provider is
// configured, so auth flows (verification, password reset) keep working
// in local development without any external account.
export const devEmailProvider: EmailProvider = {
  name: "dev-console",
  async send(message) {
    const replyToLine = message.replyTo ? ` (reply-to: ${message.replyTo})` : "";
    console.log(
      `[email:dev] Would send to ${message.to}${replyToLine} — "${message.subject}"\n${message.text}`
    );
  },
};
