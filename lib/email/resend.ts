import type { EmailProvider } from "./types";

// Talks to Resend's REST API directly (no SDK dependency) so the rest of
// the app never imports a provider-specific package. Swapping providers
// later means adding a sibling file here and changing the selection in
// index.ts — auth.ts and the API routes that call sendEmail() don't change.
export function createResendProvider(apiKey: string, from: string): EmailProvider {
  return {
    name: "resend",
    async send(message) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: message.to,
          subject: message.subject,
          html: message.html,
          text: message.text,
          ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Resend request failed (${response.status}): ${body}`);
      }
    },
  };
}
