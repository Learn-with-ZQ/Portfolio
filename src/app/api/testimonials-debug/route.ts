import { NextResponse } from "next/server";

// Temporary diagnostic endpoint — reports what the deployed server sees when it
// tries to read testimonials from the Apps Script. Does NOT expose secrets in
// full. Delete this route once the live testimonials are confirmed working.
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.TESTIMONIAL_WEBHOOK_URL;

  const info: Record<string, unknown> = {
    envVarPresent: Boolean(url),
    urlLength: url ? url.length : 0,
    urlTail: url ? url.slice(-18) : null,
    startsWithHttps: url ? url.startsWith("https://") : false,
    hasSurroundingWhitespace: url ? url !== url.trim() : false,
  };

  if (!url) {
    info.conclusion =
      "TESTIMONIAL_WEBHOOK_URL is NOT set for this deployment. Add it in Vercel → Settings → Environment Variables (Production) and redeploy.";
    return NextResponse.json(info, { status: 200 });
  }

  try {
    const res = await fetch(url.trim(), { cache: "no-store", redirect: "follow" });
    info.fetchStatus = res.status;
    info.contentType = res.headers.get("content-type");
    const text = await res.text();
    info.bodyPreview = text.slice(0, 220);
    try {
      const data = JSON.parse(text);
      info.parsedIsArray = Array.isArray(data);
      info.parsedCount = Array.isArray(data) ? data.length : null;
    } catch {
      info.parsedCount = "response was not JSON";
    }
  } catch (error) {
    info.fetchError = error instanceof Error ? error.message : String(error);
  }

  return NextResponse.json(info, { status: 200 });
}
