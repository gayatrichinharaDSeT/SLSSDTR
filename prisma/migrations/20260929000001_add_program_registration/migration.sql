-- Hand-authored, additive-only migration (see prisma/schema.prisma's top
-- comment and prior migrations for why: this database is shared live with
-- DSet Academy's own backend, and `prisma migrate dev`/`db push` would
-- compute a diff that drops every table/column DSet owns that isn't in
-- this app's schema. This file was derived from `prisma migrate diff`'s
-- output with every DROP/ALTER-DROP statement against DSet-owned objects
-- removed, keeping only what's genuinely new for this app. Apply with
-- `prisma migrate deploy` only — never `migrate dev`/`db push`/`reset`.

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateTable
CREATE TABLE "program_registration" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "organization" TEXT,
    "preferredBatch" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "internalOrderId" TEXT NOT NULL,
    "providerOrderId" TEXT,
    "providerPaymentId" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "program_registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "program_registration_internalOrderId_key" ON "program_registration"("internalOrderId");

-- CreateIndex
CREATE INDEX "program_registration_userId_idx" ON "program_registration"("userId");

-- CreateIndex
CREATE INDEX "program_registration_programId_idx" ON "program_registration"("programId");

-- CreateIndex
CREATE INDEX "program_registration_status_idx" ON "program_registration"("status");

-- AddForeignKey
ALTER TABLE "program_registration" ADD CONSTRAINT "program_registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
