import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getGoogleIdToken } from "@/lib/google-token";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";
import { toMyTestimonial } from "@/lib/testimonials";

/**
 * Saves the signed-in visitor's testimonial (new or edited) through the
 * Portfolio API's `PUT /api/testimonials/mine`, with their Google ID token as
 * the bearer token. The API takes who they are from that token, uploads any
 * reference letter to Drive, and puts the testimonial back in review.
 *
 * 4 MB, not 5: Vercel refuses request bodies over 4.5 MB, so a bigger letter
 * would never reach this route.
 */
const MAX_FILE_SIZE = 4 * 1024 * 1024;

// The API may take up to ~25 s (Drive upload, then the save). Vercel's
// default function limit can be shorter than the route's own 30 s wait.
export const maxDuration = 60;
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const PHONE_PATTERN = /^[+\d][\d\s\-()]{6,29}$/;

const REAUTH = {
  error: "Your Google sign-in has expired. Sign in again to save.",
  reauth: true,
} as const;

function readText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getExtension(name: string) {
  return name.toLowerCase().split(".").pop() ?? "";
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Please sign in with Google to submit a testimonial." },
      { status: 401 },
    );
  }

  const idToken = await getGoogleIdToken(request.headers);
  if (!idToken) return NextResponse.json(REAUTH, { status: 401 });

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
  const removeDocument = formData.get("removeDocument") === "true";
  const fileEntry = formData.get("referenceLetter");
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  if (
    !PHONE_PATTERN.test(phone) ||
    !subject ||
    message.length < 10 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return NextResponse.json(
      {
        error:
          "A valid phone number, a subject, a testimonial of at least 10 characters, and a rating are required.",
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
      { error: "Reference letters must be a PDF, DOC, or DOCX file of 4 MB or less." },
      { status: 400 },
    );
  }

  if (!PORTFOLIO_API_BASE) {
    console.error("PORTFOLIO_API_URL is not configured.");
    return NextResponse.json(
      { error: "Testimonials are not configured yet." },
      { status: 503 },
    );
  }

  // Only the form's own fields: identity comes from the Google token.
  const body = new FormData();
  body.set("phone", phone);
  body.set("subject", subject);
  body.set("message", message);
  body.set("rating", String(rating));
  if (file) body.set("referenceLetter", file, file.name);
  else if (removeDocument) body.set("removeDocument", "true");

  try {
    const response = await fetch(`${PORTFOLIO_API_BASE}/api/testimonials/mine`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${idToken}` },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    if (response.status === 401) return NextResponse.json(REAUTH, { status: 401 });

    if (response.status === 429) {
      return NextResponse.json(
        { error: "You've saved many times in the last hour. Try again later." },
        { status: 429 },
      );
    }

    const result = (await response.json().catch(() => null)) as unknown;

    if (response.ok) {
      const testimonial = toMyTestimonial(result);
      if (!testimonial) throw new Error("The API answered with an unexpected shape.");
      return NextResponse.json({ ok: true, testimonial });
    }

    if ([400, 502, 503].includes(response.status)) {
      const apiMessage = (result as { message?: unknown } | null)?.message;
      return NextResponse.json(
        {
          error:
            typeof apiMessage === "string"
              ? apiMessage
              : "Could not save your testimonial. Please try again later.",
        },
        { status: response.status },
      );
    }

    throw new Error(`The API answered ${response.status}`);
  } catch (error) {
    console.error("Testimonial saving failed:", error);
    return NextResponse.json(
      { error: "Could not save your testimonial. Please try again later." },
      { status: 502 },
    );
  }
}
