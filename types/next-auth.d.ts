import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string; // custom
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
