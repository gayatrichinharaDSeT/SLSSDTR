import { config as loadEnv } from "dotenv";
loadEnv();
loadEnv({ path: ".env.local", override: true });

import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

// Creates (or promotes) exactly one development admin account, driven
// entirely by env vars — never a hard-coded credential. Safe to re-run:
// if the account already exists, it's just ensured to be ADMIN and
// verified rather than re-created.
async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      "[seed] ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin account creation."
    );
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: "ADMIN", emailVerified: true },
    });
    console.log(`[seed] Existing user ${email} ensured as ADMIN.`);
    return;
  }

  // Goes through Better Auth's own sign-up flow so the password is
  // hashed exactly the way sign-in later expects it, rather than the
  // seed script reimplementing Better Auth's hashing.
  const result = await auth.api.signUpEmail({
    body: { name: "SLSSDTR Admin", email, password },
  });

  await prisma.user.update({
    where: { id: result.user.id },
    data: { role: "ADMIN", emailVerified: true },
  });

  console.log(`[seed] Created ADMIN account for ${email}.`);
}

main()
  .catch((error) => {
    console.error("[seed] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
