-- Additive only. One new nullable text column on our own program_enquiry
-- table, matching the plain-text `batch` convention DSeT already uses on
-- academy_registrations — no FK, so it never blocks an insert (ours or
-- DSeT's) that doesn't set it.
ALTER TABLE "program_enquiry" ADD COLUMN "preferredBatch" TEXT;
