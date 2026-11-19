import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getVisitorToken } from "@/lib/visitor-token";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";
import { getMyConversation, toMyConversation } from "@/lib/conversation";

/**
 * The signed-in visitor's conversation with Zaid. GET reads it (the Contact
 * page polls this every 30 seconds); POST sends the next message. Both pass
 * the visitor token to the Portfolio API, which takes the identity from it.
 */

const REAUTH = { error: "Your sign-in has expired. Sign in again to carry on.", reauth: true } as const;
const MAX_BODY = 5000;

async function visitorToken(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return null;
  return getVisitorToken(request.headers);
}

export async function GET(request: Request) {
  const token = await visitorToken(request);
  if (!token) return NextResponse.json(REAUTH, { status: 401 });

  const result = await getMyConversation(token);
  switch (result.kind) {
    case "found":
      return NextResponse.json({ conversation: result.conversation });
    case "none":
      return NextResponse.json({ conversation: null });
    case "reauth":
      return NextResponse.json(REAUTH, { status: 401 });
    default:
      return NextResponse.json({ error: "Messages can't be loaded right now." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const token = await visitorToken(request);
  if (!token) return NextResponse.json(REAUTH, { status: 401 });

  let body = "";
  try {
    const payload = (await request.json()) as { body?: unknown };
    body = typeof payload.body === "string" ? payload.body.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || body.length > MAX_BODY) {
    return NextResponse.json(
      { error: `Write a message of up to ${MAX_BODY} characters.` },
      { status: 400 },
    );
  }
  if (!PORTFOLIO_API_BASE) {
    return NextResponse.json({ error: "Messages aren't configured yet." }, { status: 503 });
  }

  try {
    const response = await fetch(`${PORTFOLIO_API_BASE}/api/conversations/mine/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ body }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (response.status === 401) return NextResponse.json(REAUTH, { status: 401 });
    if (response.status === 429) {
      return NextResponse.json(
        { error: "You've sent a lot of messages this hour. Try again a little later." },
        { status: 429 },
      );
    }
    const result = (await response.json().catch(() => null)) as unknown;
    if (response.ok) {
      const conversation = toMyConversation(result);
      if (!conversation) throw new Error("The API answered with an unexpected shape.");
      return NextResponse.json({ conversation });
    }
    if (response.status === 400) {
      const message = (result as { message?: unknown } | null)?.message;
      return NextResponse.json(
        { error: typeof message === "string" ? message : "That message couldn't be sent." },
        { status: 400 },
      );
    }
    throw new Error(`The API answered ${response.status}`);
  } catch (error) {
    console.error("Conversation message failed:", error);
    return NextResponse.json(
      { error: "Your message couldn't be sent. Please try again." },
      { status: 502 },
    );
  }
}
