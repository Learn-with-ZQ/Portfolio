// Server-only: reads the encrypted Auth.js cookie. Never import this from a
// client component.
import { getToken } from "next-auth/jwt";

/**
 * A Google ID token lasts one hour. Treat it as stale a minute early, so it
 * can't expire between the page loading and the API checking it.
 */
const MARGIN_MS = 60_000;

/** True while a Google ID token with this `exp` (seconds) is still usable. */
export function hasFreshGoogleToken(expiresAt: number | undefined): boolean {
  return typeof expiresAt === "number" && expiresAt * 1000 > Date.now() + MARGIN_MS;
}

/**
 * The signed-in visitor's Google ID token, from the Auth.js session cookie, or
 * null when there's no session, the session predates storing the token, or
 * the token is no longer fresh. The Portfolio API takes it as the bearer token
 * for the visitor's own testimonial.
 *
 * The cookie is `__Secure-authjs.session-token` over HTTPS and
 * `authjs.session-token` on localhost, so both are tried.
 */
export async function getGoogleIdToken(headers: Headers): Promise<string | null> {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  for (const secureCookie of [true, false]) {
    const token = await getToken({ req: { headers }, secret, secureCookie });
    if (!token) continue;
    return typeof token.idToken === "string" && hasFreshGoogleToken(token.idTokenExpiresAt)
      ? token.idToken
      : null;
  }
  return null;
}
