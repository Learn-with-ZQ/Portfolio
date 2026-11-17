import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      image?: string | null;
      /** When the stored Google ID token expires (seconds since epoch); 0 if there is none. */
      googleTokenExpiresAt: number;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    provider?: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
    provider?: string;
    image?: string | null;
    /** Google ID token from sign-in. Server-side only (lib/google-token.ts). */
    idToken?: string;
    /** Its `exp` claim, in seconds. */
    idTokenExpiresAt?: number;
  }
}
