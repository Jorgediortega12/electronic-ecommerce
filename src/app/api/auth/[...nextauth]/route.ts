import { CustomAdapter } from "@/lib/customPrismaAdapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  adapter: CustomAdapter(),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = Number(token.sub);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = String(user.id);
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Permite redirección a la misma base
      if (url.startsWith(baseUrl)) return url;
      // Previene open redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/product`;
    }
  }
});

export { handler as GET, handler as POST };
