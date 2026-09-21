// dotenv's default config() only reads .env — it does not know about
// Next.js's own .env.local/.env.production.local convention, so both are
// loaded explicitly here (.env.local last, with override, to match
// Next.js's own precedence) so the Prisma CLI sees the same DATABASE_URL
// the app itself would use.
import { config as loadEnv } from "dotenv";
loadEnv();
loadEnv({ path: ".env.local", override: true });

import { defineConfig, env } from "prisma/config";

// Prisma 7 moved the database connection out of schema.prisma. This file is
// read by the Prisma CLI only (migrate/studio/seed) — the Next.js app never
// imports it. The app's own runtime connection lives in lib/prisma.ts via
// the @prisma/adapter-pg driver adapter.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
