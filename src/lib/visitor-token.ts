// Server-only: reads the encrypted Auth.js cookie. Never import this from a
// client component.
import { getToken } from "next-auth/jwt";

/** Treat the token as stale a minute early, so it can't expire mid-request. */
const MARGIN_MS = 60_000;

/** True while a visitor token with this expiry (seconds) is still usable. */
export function hasFreshVisitorToken(expiresAt: number | undefined): boolean {
  return typeof expiresAt === "number" && expiresAt * 1000 > Date.now() + MARGIN_MS;
}

/**
 * The signed-in visitor's Portfolio API visitor token (30 days, issued at
 * sign-in in exchange for the Google ID token; see lib/auth.ts), or null when
 * there's no session, the session predates the visitor token, or the token
 * has expired. The API takes it as the bearer token for the visitor's own
 * testimonial and conversation.
 *
 * The cookie is `__Secure-authjs.session-token` over HTTPS and
 * `authjs.session-token` on localhost, so both are tried.
 */
export async function getVisitorToken(headers: Headers): Promise<string | null> {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  for (const secureCookie of [true, false]) {
    const token = await getToken({ req: { headers }, secret, secureCookie });
    if (!token) continue;
    return typeof token.visitorToken === "string" && hasFreshVisitorToken(token.visitorTokenExpiresAt)
      ? token.visitorToken
      : null;
  }
  return null;
}
