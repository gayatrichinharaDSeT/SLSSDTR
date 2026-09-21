import type { EmailProvider } from "./types";

// Never sends real email. Used whenever no transactional email provider is
// configured, so auth flows (verification, password reset) keep working
// in local development without any external account.
export const devEmailProvider: EmailProvider = {
  name: "dev-console",
  async send(message) {
    console.log(
      `[email:dev] Would send to ${message.to} — "${message.subject}"\n${message.text}`
    );
  },
};
