import { NextResponse } from "next/server";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company: string;
}

const MAX_LENGTHS: Record<keyof Omit<ContactPayload, "company">, number> = {
  name: 120,
  email: 200,
  phone: 30,
  subject: 200,
  message: 5000,
};

function sanitize(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    name: sanitize(body.name, MAX_LENGTHS.name),
    email: sanitize(body.email, MAX_LENGTHS.email),
    phone: sanitize(body.phone, MAX_LENGTHS.phone),
    subject: sanitize(body.subject, MAX_LENGTHS.subject),
    message: sanitize(body.message, MAX_LENGTHS.message),
  };

  if (!payload.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.message.length < 10) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message of at least 10 characters are required." },
      { status: 400 },
    );
  }

  // Messages are saved in the Portfolio database through the API (since
  // 2026-11-17; before that, a Google Sheet). Visitors don't sign in: the
  // site's server proves itself with the site key, which only it knows.
  const siteKey = process.env.PORTFOLIO_API_SITE_KEY;
  if (!PORTFOLIO_API_BASE || !siteKey) {
    console.error("PORTFOLIO_API_URL or PORTFOLIO_API_SITE_KEY is not configured.");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${PORTFOLIO_API_BASE}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Site-Key": siteKey },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status === 201) return NextResponse.json({ ok: true });

    if (response.status === 400) {
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      return NextResponse.json(
        { error: result?.message ?? "Please check the form and try again." },
        { status: 400 },
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { error: "Too many messages right now. Try again in a minute." },
        { status: 429 },
      );
    }

    throw new Error(`The API answered ${response.status}`);
  } catch (error) {
    console.error("Contact form saving failed:", error);
    return NextResponse.json(
      { error: "Could not record your message. Please try again later." },
      { status: 502 },
    );
  }
}
