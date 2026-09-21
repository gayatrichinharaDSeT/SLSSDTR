# SLSSDTR

School of Life Science – Skill Development, Training & Research — institutional website with a Next.js/Prisma/Better Auth backend foundation (authentication, roles, contact form, program enquiries, user + admin dashboards).

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- PostgreSQL + Prisma 7 (`@prisma/adapter-pg` driver adapter)
- Better Auth (email/password, sessions, email verification, password reset)
- Zod for server-side validation

## 1. Local Setup

### Required software

- Node.js 20+
- A PostgreSQL database (local install, Docker, or a hosted provider — Neon, Supabase, Railway, Vercel Postgres, etc.)

### Steps

```bash
npm install                  # also runs `prisma generate` via postinstall
cp .env.example .env.local   # fill in real values (see below)
npm run db:migrate           # applies prisma/migrations/, creates the schema
npm run db:seed              # creates one ADMIN account from ADMIN_EMAIL/ADMIN_PASSWORD
npm run dev
```

Open http://localhost:3000.

### Environment variables

See `.env.example` for the full list with descriptions. At minimum:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | Yes | The app's own URL |
| `RESEND_API_KEY` / `EMAIL_FROM` | No | Without these, verification/reset emails are logged to the server console instead of sent (see `lib/email/`) |
| `CONTACT_NOTIFICATION_EMAIL` | No | If set, contact/enquiry submissions also send a notification email here |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | No | Used only by `npm run db:seed` |

This project reads both `.env` and `.env.local` (Next.js convention: `.env.local` overrides `.env`). Neither is committed — `.gitignore` excludes all `.env*` files, including `.env.example`; if you want the example file itself tracked in git for teammates, add an explicit exception (`git add -f .env.example`) or narrow the `.env*` rule.

### Database scripts

```bash
npm run db:generate   # regenerate the Prisma client after a schema change
npm run db:migrate    # create + apply a migration (development)
npm run db:deploy     # apply existing migrations only (production/CI — never generates new ones)
npm run db:push       # push schema without a migration file (prototyping only — do not use in production)
npm run db:seed       # run prisma/seed.ts
npm run db:studio     # open Prisma Studio
```

## 2. Authentication Architecture

- **Better Auth** (`lib/auth.ts`) with the Prisma adapter (`better-auth/adapters/prisma`) and the `@prisma/adapter-pg` driver adapter (required by Prisma 7 — see below).
- Route handler: `app/api/auth/[...all]/route.ts` mounts every Better Auth endpoint (`sign-up`, `sign-in`, `sign-out`, `request-password-reset`, `reset-password`, `verify-email`, `get-session`, …) under `/api/auth`.
- Client: `lib/auth-client.ts` (`better-auth/react`), used from the auth forms in `components/auth/` and the nav's session check.
- Email/password auth is enabled with `requireEmailVerification: false` — a deliberate phase-1 choice: gating sign-in on verification would lock every user out until a real email provider (`RESEND_API_KEY`) is configured. The verification email still sends on sign-up (`emailVerification.sendOnSignUp: true`); the flow is fully wired and just needs a real provider to go live end-to-end.
- **Route protection**: `proxy.ts` (Next.js 16's current convention — `middleware.ts` is deprecated in this Next version) does a coarse, edge-safe check for `/dashboard/*` and `/admin/*`: is a session cookie present at all. It cannot verify the session or check role at the edge. The actual authorization is `requireUser()` / `requireAdmin()` in `lib/permissions.ts`, called from `app/dashboard/layout.tsx` and `app/admin/layout.tsx`, which re-verify the session against the database on every request and redirect if it's missing, expired, or (for admin) not role `ADMIN`.
- API routes use `getApiUser()` / `getApiAdmin()` (same file) and return `401`/`403` rather than redirecting.

### Roles

`Role` enum in `prisma/schema.prisma`: `USER`, `ADMIN` today. The comment on the enum notes future values (`STUDENT`, `FACULTY`, `TRAINER`, `ENTREPRENEUR`, `SUPER_ADMIN`) can be appended later without a migration touching existing rows. `role` is declared with `input: false` in `lib/auth.ts`'s `user.additionalFields` — no request body (signup, profile update) can ever set or change it; verified against a live signup request during this build (a payload with `"role":"ADMIN"` injected is silently ignored, account is created as `USER`).

## 3. Database

`prisma/schema.prisma`: `User`, `Session`, `Account`, `Verification` (Better Auth's required models, with `phone`/`organization`/`role` added to `User`), `ContactMessage`, `ProgramEnquiry`. Deliberately excludes `Course`/`Enrollment`/`Payment`/etc. — see the schema's comments for how those attach later.

**Prisma 7 note**: the connection URL no longer lives in `schema.prisma` (`datasource.url` is rejected by the CLI). It lives in two places instead:
- `prisma.config.ts` — read by the Prisma CLI (`migrate`, `studio`, `db seed`) via `env("DATABASE_URL")`, loading `.env` then `.env.local`.
- `lib/prisma.ts` — the app's runtime client, constructed with `@prisma/adapter-pg`'s `PrismaPg` driver adapter.

## 4. User Dashboard (`/dashboard`)

Account area, not an LMS: Overview (name, email, verification status, enquiry count, recent enquiries), Profile (name/phone/organization — never role/email/id), My Enquiries (strictly scoped to the session's own `userId`), Settings (account info + logout).

## 5. Admin Dashboard (`/admin`)

`ADMIN`-only: Overview (real counts — total users, new enquiries, contact messages, recent enquiries; zero/empty states when the database is empty, never fake data), Users (read-only list, safe fields only — no password hashes or tokens), Enquiries (filterable list + status updates via `PATCH /api/admin/enquiries`), Messages (same pattern via `PATCH /api/admin/messages`).

## 6. Contact Form & Program Enquiries

- `components/contact/ContactForm.tsx` is unchanged visually — only `app/api/contact/route.ts` was rewritten (Zod validation, Prisma persistence, rate limiting, safe error responses). The form's existing `response.ok` check needed no changes since it already tolerates the new envelope.
- `POST /api/program-enquiries` supports guest and signed-in submissions. `programId` is validated against `data/programs.ts`'s real slugs (`student-ai`, `faculty-ai`, `entrepreneur-ai`, `train-the-trainer`) — an invalid id is rejected before it reaches the database.
- Each program page (`components/programs/ProgramDetail.tsx`) got one new "Enquire Now" button that opens a modal (`components/programs/ProgramEnquiryModal.tsx`) with the program pre-selected; the existing "Contact Us" / "View All Programs" buttons were kept, just demoted to secondary/ghost styling.
- A successful contact/enquiry save never fails because of email — notification email (only if `CONTACT_NOTIFICATION_EMAIL` is set) is fire-and-forget after the database write.

## 7. Security

- All public POST endpoints (`/api/contact`, `/api/program-enquiries`) are rate-limited (`lib/rate-limit.ts`) — 5 requests per 10 minutes per IP. **This is an in-memory, single-instance limiter**, fine for development, not sufficient on Vercel's multi-instance serverless model (see the file's own comment for the Upstash Redis upgrade path).
- Every mutation is authorized server-side: role checks never trust a client-supplied value; `ProgramEnquiry`/profile updates are always scoped to the session's own `userId`, never an id from the request body.
- Responses never leak raw Prisma errors, stack traces, or secrets — `lib/api-response.ts`'s `apiInternalError()` logs full context server-side and returns a generic message.
- No password hashes, session tokens, or auth secrets are ever selected/returned by the admin users API or page.

## 8. API Endpoints

| Endpoint | Methods | Auth |
|---|---|---|
| `/api/auth/[...all]` | GET/POST | Better Auth (public + session-dependent) |
| `/api/contact` | POST | Public, rate-limited |
| `/api/program-enquiries` | POST | Public (guest or signed-in), rate-limited |
| `/api/profile` | GET/PATCH | Signed-in user, own record only |
| `/api/admin/users` | GET | Admin only |
| `/api/admin/enquiries` | GET/PATCH | Admin only |
| `/api/admin/messages` | GET/PATCH | Admin only |

## 9. Vercel Deployment

1. Push this repository to Git and import it into Vercel.
2. Provision PostgreSQL (Vercel Marketplace → Prisma Postgres/Neon, or your own Neon/Supabase project) and copy its connection string.
3. In Vercel's project settings, set: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (your production URL), `NEXT_PUBLIC_APP_URL` (same), and optionally `RESEND_API_KEY` / `EMAIL_FROM` / `CONTACT_NOTIFICATION_EMAIL`.
4. `@prisma/client`/`pg`/`prisma` are already in Next.js's default `serverExternalPackages` list, and `postinstall` runs `prisma generate` — no extra Vercel build configuration is needed for Prisma itself.
5. Apply migrations against the production database once, before or during first deploy: `npm run db:deploy` (never `db:push` in production).
6. Deploy.
7. Verify: sign up, sign in, sign out, `/dashboard` loads, an admin account (seed one via `npm run db:seed` against the production `DATABASE_URL`, or promote a signed-up user's `role` to `ADMIN` directly) can reach `/admin`.
8. Verify the contact form and a program enquiry each save a row (check `/admin/messages` and `/admin/enquiries`).

This has **not** been deployed to Vercel as part of this work — the steps above are documented, not executed. The local build (`npm run build`), a real local `prisma migrate dev` + `db seed`, and a full HTTP smoke test (signup/login/contact/enquiries/admin) all ran successfully against a live Neon Postgres database during development; a production Vercel deploy still needs to be run and checked separately.

## 10. Known Limitations (Phase 1)

- Rate limiting is in-memory only (see Security above).
- Email delivery requires `RESEND_API_KEY`/`EMAIL_FROM`; without them, verification and reset links are logged to the server console, not emailed.
- `requireEmailVerification` is off by default (see Authentication Architecture above).
- Admin user management is read-only; enquiry/message status updates are the only admin write actions in this phase.
- No LMS, payments, certificates, or advanced CMS — intentionally out of scope; the schema and route structure are designed not to require a rewrite when those are added.
