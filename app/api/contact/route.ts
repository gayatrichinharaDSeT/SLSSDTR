import { NextResponse } from "next/server";

// Future integration: replace the console.log below with
// prisma.contactMessage.create({ data }) once PostgreSQL + Prisma
// are connected (see prisma/schema.prisma).

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  interest?: string;
  message: string;
};

function isValidPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.email === "string" &&
    payload.email.trim().length > 0 &&
    typeof payload.message === "string" &&
    payload.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  console.log("SLSSDTR contact enquiry received:", body);

  return NextResponse.json({ ok: true });
}
