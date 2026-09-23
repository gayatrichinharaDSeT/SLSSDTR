-- Hand-authored, additive-only migration.
--
-- This database is shared with DSeT's own backend, which already owns
-- ~19 tables here (academy_registrations, orders, payments, leads, etc.)
-- and has already extended program_enquiry with its own columns — all
-- outside this Prisma schema/migration history. An auto-generated
-- `prisma migrate dev` diff against this database wants to DROP every
-- one of those tables and columns, because it isn't declared in this
-- schema.prisma. That diff must never be applied. This file contains
-- only the statements this app actually needs — new tables and new
-- nullable columns — and touches nothing DSeT owns.

-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('STUDENT', 'FACULTY', 'PROFESSIONAL', 'ENTREPRENEUR', 'SELF_EMPLOYED', 'EXPERIENCED_NO_ENGAGEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('PHARMACEUTICAL', 'MEDICAL_DEVICE', 'MEDICAL_EQUIPMENT', 'SURGICAL_CONSUMABLES', 'HOSPITAL', 'DISTRIBUTOR', 'CONSULTING', 'LABORATORY', 'MARKET_RESEARCH', 'TRAINING', 'OTHERS');

-- AlterTable: new, nullable profile fields on our own "user" table only.
ALTER TABLE "user" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyType" "CompanyType",
ADD COLUMN     "companyTypeOther" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "courseName" TEXT,
ADD COLUMN     "currentYear" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "profession" "Profession",
ADD COLUMN     "professionOther" TEXT,
ADD COLUMN     "specialization" TEXT;

-- CreateTable
CREATE TABLE "customized_module_request" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "organization" TEXT,
    "departments" TEXT[],
    "programId" TEXT,
    "message" TEXT,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "customized_module_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "monthLabel" TEXT NOT NULL,
    "startsOn" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "customized_module_request_userId_idx" ON "customized_module_request"("userId");

-- CreateIndex
CREATE INDEX "customized_module_request_status_idx" ON "customized_module_request"("status");

-- CreateIndex
CREATE INDEX "batch_isActive_idx" ON "batch"("isActive");

-- AddForeignKey
ALTER TABLE "customized_module_request" ADD CONSTRAINT "customized_module_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
