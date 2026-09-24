import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const appUrl = process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [appUrl],

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    // Not gating sign-in on verification in this phase — doing so would
    // lock every user out until a real SMTP provider is configured (see
    // lib/email/). The verification email still sends on sign-up below, so
    // the flow is fully wired and just needs SMTP_HOST/SMTP_USER/SMTP_PASS/
    // SMTP_PORT/SMTP_FROM to go live end-to-end.
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your SLSSDTR password",
        text: `Reset your SLSSDTR password: ${url}\n\nIf you didn't request this, you can ignore this email.`,
        html: `<p>Reset your SLSSDTR password by opening this link:</p><p><a href="${url}">${url}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your SLSSDTR email",
        text: `Verify your email address: ${url}`,
        html: `<p>Verify your email address by opening this link:</p><p><a href="${url}">${url}</a></p>`,
      });
    },
  },

  // USER/ADMIN cover this phase. role is server-controlled (input: false)
  // so no request body — signup or profile update — can ever set or
  // change it; see lib/permissions.ts for the server-side enforcement
  // that actually gates /dashboard and /admin.
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: false,
        defaultValue: "USER",
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      organization: {
        type: "string",
        required: false,
        input: true,
      },
      location: { type: "string", required: false, input: true },
      country: { type: "string", required: false, input: true },
      profession: { type: "string", required: false, input: true },
      professionOther: { type: "string", required: false, input: true },
      courseName: { type: "string", required: false, input: true },
      institution: { type: "string", required: false, input: true },
      currentYear: { type: "string", required: false, input: true },
      specialization: { type: "string", required: false, input: true },
      companyName: { type: "string", required: false, input: true },
      companyType: { type: "string", required: false, input: true },
      companyTypeOther: { type: "string", required: false, input: true },
    },
  },

  // Keeps Better Auth's session cookie writes working from Server
  // Components/Actions under the Next.js App Router; must be last.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
