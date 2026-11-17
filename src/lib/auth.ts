import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/**
 * The `exp` claim (seconds) of a Google ID token, or 0 if it can't be read.
 * The token was just handed over by Google, so it's decoded, not verified:
 * the Portfolio API verifies it on every request that uses it.
 */
function idTokenExpiry(idToken: string): number {
  try {
    const part = idToken.split(".")[1] ?? "";
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))) as {
      exp?: unknown;
    };
    return typeof payload.exp === "number" ? payload.exp : 0;
  } catch {
    return 0;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
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

        // The Google ID token is the visitor's credential for their own
        // testimonial at the Portfolio API. It stays in this encrypted cookie
        // and is read server-side (lib/google-token.ts); the session below
        // only exposes when it expires. It lasts one hour.
        if (account.id_token) {
          token.idToken = account.id_token;
          token.idTokenExpiresAt = idTokenExpiry(account.id_token);
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
        session.user.googleTokenExpiresAt =
          typeof token.idTokenExpiresAt === "number" ? token.idTokenExpiresAt : 0;
      }

      return session;
    },
  },
});
