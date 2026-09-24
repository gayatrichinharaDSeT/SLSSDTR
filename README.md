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
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | No | Without all five set, all emails (auth + the 3 form flows below) are logged to the server console instead of sent (see `lib/email/` and §7) |
| `ADMIN_NOTIFICATION_EMAIL` | No | If set, program enquiry / contact / customized module submissions also send a notification email here |
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
- Email/password auth is enabled with `requireEmailVerification: false` — a deliberate phase-1 choice: gating sign-in on verification would lock every user out until real SMTP credentials (see §7) are configured. The verification email still sends on sign-up (`emailVerification.sendOnSignUp: true`); the flow is fully wired and just needs those credentials to go live end-to-end.
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
- A successful contact/enquiry save never fails because of email — see §7 for the full email notification system.

## 7. Email Notifications

Three form flows each send two emails: a confirmation to the person who submitted the form, and a notification to the SLSSDTR admin inbox. **A failed or unconfigured email never fails the form submission** — the database write always happens first, and both emails are sent fire-and-forget afterward with their own error handling (see `app/api/program-enquiries/route.ts`, `app/api/contact/route.ts`, `app/api/customized-modules/route.ts`).

| Flow | User confirmation | Admin notification |
|---|---|---|
| Program Enquiry (`/api/program-enquiries`) | Yes — confirms the program they enquired about | Yes — name, email, phone, organization, program, preferred batch, message |
| Contact Form (`/api/contact`) | Yes | Yes — name, email, phone, organization, interest, message |
| Customized Modules (`/api/customized-modules`) | Yes | Yes — name, email, phone, organization, related program, departments, message |

**Provider**: SMTP, sent via [Nodemailer](https://nodemailer.com) — works with any standard SMTP server/relay the SLSSDTR business email account provides (Google Workspace, Microsoft 365, Zoho Mail, a hosting provider's SMTP, or a transactional-email SMTP relay). Implemented in `lib/email/`:
- `lib/email/types.ts` — the provider-agnostic `EmailMessage`/`EmailProvider` interface (includes an optional `replyTo`).
- `lib/email/smtp.ts` — sends via Nodemailer's SMTP transport, built from the 5 `SMTP_*` env vars below.
- `lib/email/dev.ts` — fallback used whenever the `SMTP_*` variables aren't all set: logs the email to the server console instead of sending it. This is what's active today — **no real email is being sent yet**.
- `lib/email/templates.ts` — the branded HTML + plain-text templates (SLSSDTR navy header, consistent layout) for all 6 emails above, plus the shared layout/detail-row helpers they're built from.
- `lib/email/index.ts` — `sendEmail()`, the single entry point every call site uses; picks the SMTP provider automatically once all 5 `SMTP_*` env vars are set, with zero code changes needed elsewhere.

Admin notification emails also set `Reply-To` to the submitter's own address, so the SLSSDTR team can reply directly from their inbox without exposing that address as the technical sender.

### Environment variables required

| Variable | Required for real sending | Notes |
|---|---|---|
| `SMTP_HOST` | Yes | The mail server hostname, e.g. `smtp.your-provider.com` |
| `SMTP_PORT` | Yes | `465` (implicit TLS) or `587` (STARTTLS) are the two common ports. The app sets `secure: true` automatically for port `465` and `secure: false` for everything else (including `587`) — standard SMTP behavior, not something to configure separately. |
| `SMTP_USER` | Yes | The mailbox/account username for the address in `SMTP_FROM` |
| `SMTP_PASS` | Yes | The mailbox/account password (or an app password / SMTP-specific credential, depending on the provider) |
| `SMTP_FROM` | Yes | The verified sender, e.g. `SLSSDTR <notifications@slssdtr.example>` |
| `ADMIN_NOTIFICATION_EMAIL` | No (but needed for the admin-side notification to actually go anywhere) | The inbox that receives the 3 forms' notification emails — can be any real inbox the SLSSDTR team checks |

All 5 `SMTP_*` variables must be set together — the app falls back to the dev-console logger if any one of them is missing.

### What Sir needs to provide/configure later

1. **The official SLSSDTR business email account and its SMTP details** — host, port, username, and password (or app password) for that mailbox, from whichever provider hosts it (Google Workspace, Microsoft 365, Zoho Mail, hosting-provider email, etc.).
2. **The exact `SMTP_FROM` address** to send as (e.g. `SLSSDTR <hello@slssdtr.com>`) — typically the same mailbox as #1, or an alias on it.
3. **The inbox for `ADMIN_NOTIFICATION_EMAIL`** — which real mailbox the SLSSDTR team wants form notifications sent to (can be the same address as #1).
4. **Any sending-domain setup the mailbox provider requires** — most providers (Google Workspace, Microsoft 365, etc.) already have SPF/DKIM configured for their own domains; if the domain is self-hosted or newly set up, whoever manages its DNS may need to confirm SPF/DKIM records are in place so outgoing mail isn't flagged as spam. This is provider-specific and outside this app's code.

### Activating it in Vercel once the above is ready

1. Vercel Project → Settings → Environment Variables.
2. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ADMIN_NOTIFICATION_EMAIL` to the **Production** environment (values in #1–3 above).
3. Redeploy (env var changes require a new deployment to take effect — the same pattern already used for `ADMIN_PANEL_ENABLED`, see §10).
4. Verify: submit a real program enquiry, contact form, and customized module request on the live site, and confirm both the confirmation email and the admin notification arrive.

Until all five `SMTP_*` variables are set, the system keeps working exactly as it does today — submissions save to the database normally, and `lib/email/dev.ts` logs what each email would have said to the server console instead of sending it.

## 8. Security

- All public POST endpoints (`/api/contact`, `/api/program-enquiries`) are rate-limited (`lib/rate-limit.ts`) — 5 requests per 10 minutes per IP. **This is an in-memory, single-instance limiter**, fine for development, not sufficient on Vercel's multi-instance serverless model (see the file's own comment for the Upstash Redis upgrade path).
- Every mutation is authorized server-side: role checks never trust a client-supplied value; `ProgramEnquiry`/profile updates are always scoped to the session's own `userId`, never an id from the request body.
- Responses never leak raw Prisma errors, stack traces, or secrets — `lib/api-response.ts`'s `apiInternalError()` logs full context server-side and returns a generic message.
- No password hashes, session tokens, or auth secrets are ever selected/returned by the admin users API or page.

## 9. API Endpoints

| Endpoint | Methods | Auth |
|---|---|---|
| `/api/auth/[...all]` | GET/POST | Better Auth (public + session-dependent) |
| `/api/contact` | POST | Public, rate-limited |
| `/api/program-enquiries` | POST | Public (guest or signed-in), rate-limited |
| `/api/profile` | GET/PATCH | Signed-in user, own record only |
| `/api/admin/users` | GET | Admin only |
| `/api/admin/enquiries` | GET/PATCH | Admin only |
| `/api/admin/messages` | GET/PATCH | Admin only |

## 10. Vercel Deployment

1. Push this repository to Git and import it into Vercel.
2. Provision PostgreSQL (Vercel Marketplace → Prisma Postgres/Neon, or your own Neon/Supabase project) and copy its connection string.
3. In Vercel's project settings, set: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (your production URL), `NEXT_PUBLIC_APP_URL` (same), and optionally `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` / `ADMIN_NOTIFICATION_EMAIL` (see §7 for exact steps).
4. `@prisma/client`/`pg`/`prisma` are already in Next.js's default `serverExternalPackages` list, and `postinstall` runs `prisma generate` — no extra Vercel build configuration is needed for Prisma itself.
5. Apply migrations against the production database once, before or during first deploy: `npm run db:deploy` (never `db:push` in production).
6. Deploy.
7. Verify: sign up, sign in, sign out, `/dashboard` loads, an admin account (seed one via `npm run db:seed` against the production `DATABASE_URL`, or promote a signed-up user's `role` to `ADMIN` directly) can reach `/admin`.
8. Verify the contact form and a program enquiry each save a row (check `/admin/messages` and `/admin/enquiries`).

This has **not** been deployed to Vercel as part of this work — the steps above are documented, not executed. The local build (`npm run build`), a real local `prisma migrate dev` + `db seed`, and a full HTTP smoke test (signup/login/contact/enquiries/admin) all ran successfully against a live Neon Postgres database during development; a production Vercel deploy still needs to be run and checked separately.

## 11. Known Limitations (Phase 1)

- Rate limiting is in-memory only (see Security above).
- Email delivery requires all 5 `SMTP_*` variables (`SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS`/`SMTP_FROM`); without them, everything (auth links and all 3 form flows) is logged to the server console, not emailed — see §7 for what's needed to activate real sending.
- `requireEmailVerification` is off by default (see Authentication Architecture above).
- Admin user management is read-only; enquiry/message status updates are the only admin write actions in this phase.
- No LMS, payments, certificates, or advanced CMS — intentionally out of scope; the schema and route structure are designed not to require a rewrite when those are added.
