import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
      }

      return session;
    },
  },
});
