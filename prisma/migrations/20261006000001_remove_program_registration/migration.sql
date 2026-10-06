-- Hand-authored, scoped-only migration (see prior migrations in this repo
-- for why: this database is shared live with DSet Academy's own backend,
-- and `prisma migrate dev`/`db push` would compute a diff touching every
-- table DSet owns). This one genuinely does drop something — but only the
-- table/enum this app itself created two weeks ago for a Razorpay-proxy
-- integration that's been superseded by a simpler "link out to DSet
-- Academy's own registration page" approach. Verified program_registration
-- had 0 rows before this was written — nothing is lost. Apply with
-- `prisma migrate deploy` only.

DROP TABLE "program_registration";
DROP TYPE "PaymentStatus";
