import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      image?: string | null;
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
  }
}
