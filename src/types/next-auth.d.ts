import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      image?: string | null;
      /** When the stored API visitor token expires (seconds since epoch); 0 if there is none. */
      visitorTokenExpiresAt: number;
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
    /** The Portfolio API's visitor token (30 days). Server-side only (lib/visitor-token.ts). */
    visitorToken?: string;
    /** Its expiry, in seconds since epoch. */
    visitorTokenExpiresAt?: number;
  }
}
