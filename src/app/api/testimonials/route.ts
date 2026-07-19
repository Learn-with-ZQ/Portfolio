import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

function readText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getExtension(name: string) {
  return name.toLowerCase().split(".").pop() ?? "";
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export async function POST(request: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || !user.email) {
    return NextResponse.json(
      { error: "Please sign in with Google to submit a testimonial." },
      { status: 401 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (readText(formData.get("company"), 120)) return NextResponse.json({ ok: true });

  const phone = readText(formData.get("phone"), 30);
  const subject = readText(formData.get("subject"), 200);
  const message = readText(formData.get("message"), 5_000);
  const rating = Number(readText(formData.get("rating"), 1));
  const fileEntry = formData.get("referenceLetter");
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  if (
    !phone ||
    !subject ||
    message.length < 10 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return NextResponse.json(
      {
        error:
          "Phone number, subject, a message of at least 10 characters, and a rating are required.",
      },
      { status: 400 },
    );
  }

  if (
    file &&
    (file.size > MAX_FILE_SIZE ||
      !ALLOWED_FILE_TYPES.has(file.type) ||
      !ALLOWED_EXTENSIONS.has(getExtension(file.name)))
  ) {
    return NextResponse.json(
      { error: "Reference letters must be a PDF, DOC, or DOCX file smaller than 5 MB." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.TESTIMONIAL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("TESTIMONIAL_WEBHOOK_URL is not configured.");
    return NextResponse.json(
      { error: "Testimonial submissions are not configured yet." },
      { status: 503 },
    );
  }

  const payload: Record<string, string | number> = {
    googleUserId: user.id,
    name: user.name?.trim() || user.email.split("@")[0],
    email: user.email,
    phone,
    subject,
    message,
    rating,
    provider: user.provider || "google",
    submittedAt: new Date().toISOString(),
  };

  if (file) {
    payload.fileName = safeFileName(file.name);
    payload.fileType = file.type;
    payload.fileBase64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);

    const responseText = await response.text();
    let result: { ok?: boolean } | null = null;
    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error("Webhook returned a non-JSON response.");
    }
    if (result?.ok !== true) throw new Error("Webhook reported a failure.");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Testimonial forwarding failed:", error);
    return NextResponse.json(
      { error: "Could not record your testimonial. Please try again later." },
      { status: 502 },
    );
  }
}
