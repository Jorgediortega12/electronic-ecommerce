import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number;
      name: string;
      email: string;
      image?: string;
      provider?: string;
      accessToken?: string;
    };
  }

  interface User {
    id: string | number;
    name: string;
    email: string;
    image?: string;
  }
}
