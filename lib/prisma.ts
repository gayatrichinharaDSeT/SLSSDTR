import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires a driver adapter for the runtime client (schema.prisma
// no longer carries a connection URL). One pg Pool per adapter instance;
// the singleton below keeps that to one per process, including across
// Next.js dev-server hot reloads.
function createPrismaClient() {
  const adapter = new PrismaPg(process.env.DATABASE_URL as string);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
