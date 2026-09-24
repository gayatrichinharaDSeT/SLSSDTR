import { devEmailProvider } from "./dev";
import { createSmtpProvider } from "./smtp";
import type { EmailMessage, EmailProvider } from "./types";

// Auth logic and API routes call sendEmail() and never touch a specific
// provider. Provider selection happens once, here, based on whether
// SMTP_HOST/SMTP_USER/SMTP_PASS/SMTP_PORT/SMTP_FROM are all configured —
// unset in development by default, which is intentional (see
// lib/email/dev.ts).
function resolveProvider(): EmailProvider {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const port = Number(process.env.SMTP_PORT);

  if (host && user && pass && from && Number.isInteger(port) && port > 0) {
    return createSmtpProvider({ host, port, user, pass, from });
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
