import { devEmailProvider } from "./dev";
import { createResendProvider } from "./resend";
import type { EmailMessage, EmailProvider } from "./types";

// Auth logic and API routes call sendEmail() and never touch a specific
// provider. Provider selection happens once, here, based on whether
// RESEND_API_KEY / EMAIL_FROM are configured — unset in development by
// default, which is intentional (see lib/email/dev.ts).
function resolveProvider(): EmailProvider {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (apiKey && from) {
    return createResendProvider(apiKey, from);
  }

  return devEmailProvider;
}

const provider = resolveProvider();

export async function sendEmail(message: EmailMessage): Promise<void> {
  await provider.send(message);
}

export function isEmailProviderConfigured(): boolean {
  return provider.name !== "dev-console";
}

export type { EmailMessage } from "./types";
