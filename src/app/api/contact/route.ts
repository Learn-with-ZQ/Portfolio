import { NextResponse } from "next/server";

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

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("CONTACT_WEBHOOK_URL is not configured.");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    // Apps Script reports its own errors as HTTP 200 HTML pages, so a status
    // check is not enough — require the script's JSON success payload.
    const responseText = await response.text();
    let result: { ok?: boolean } | null = null;
    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Webhook returned non-JSON response: ${responseText.slice(0, 300)}`,
      );
    }
    if (result?.ok !== true) {
      throw new Error(`Webhook reported failure: ${responseText.slice(0, 300)}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form forwarding failed:", error);
    return NextResponse.json(
      { error: "Could not record your message. Please try again later." },
      { status: 502 },
    );
  }
}
