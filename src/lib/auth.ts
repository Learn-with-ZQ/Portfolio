import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";

/** The site's Auth.js session, and the API visitor token inside it: 30 days. */
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

/**
 * Trades the one-hour Google ID token from sign-in for the Portfolio API's own
 * visitor token (30 days), so visitors sign in once a month rather than every
 * hour. The API verifies the Google token before issuing it. Null if the API
 * can't be reached: the visitor is then asked to sign in again when they use
 * a testimonial or a conversation.
 */
async function exchangeForVisitorToken(
  idToken: string,
): Promise<{ token: string; expiresAt: number } | null> {
  if (!PORTFOLIO_API_BASE) return null;
  try {
    const response = await fetch(`${PORTFOLIO_API_BASE}/api/visitor/session`, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.warn(`Visitor token exchange failed: the API answered ${response.status}`);
      return null;
    }
    const result = (await response.json()) as { token?: unknown; expiresAt?: unknown };
    const expiresAt = typeof result.expiresAt === "string" ? Date.parse(result.expiresAt) : NaN;
    return typeof result.token === "string" && !Number.isNaN(expiresAt)
      ? { token: result.token, expiresAt: Math.floor(expiresAt / 1000) }
      : null;
  } catch (error) {
    console.warn("Visitor token exchange failed:", error);
    return null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile) {
        const googleProfile = profile as {
          sub?: string;
          picture?: string;
        };

        token.googleId = googleProfile.sub ?? token.sub;
        token.provider = account.provider;
        token.image = googleProfile.picture ?? token.picture;

        // The visitor's credential at the Portfolio API (testimonials and
        // conversations). It stays in this encrypted cookie and is read
        // server-side (lib/visitor-token.ts); the session below only exposes
        // when it expires. The Google ID token itself is not kept.
        delete token.visitorToken;
        delete token.visitorTokenExpiresAt;
        if (account.id_token) {
          const visitor = await exchangeForVisitorToken(account.id_token);
          if (visitor) {
            token.visitorToken = visitor.token;
            token.visitorTokenExpiresAt = visitor.expiresAt;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id =
          typeof token.googleId === "string"
            ? token.googleId
            : typeof token.sub === "string"
              ? token.sub
              : "";
        session.user.provider = typeof token.provider === "string" ? token.provider : "google";
        session.user.image =
          typeof token.image === "string" ? token.image : session.user.image;
        // Never the token itself: the session is readable by browser code.
        session.user.visitorTokenExpiresAt =
          typeof token.visitorTokenExpiresAt === "number" ? token.visitorTokenExpiresAt : 0;
      }

      return session;
    },
  },
});
