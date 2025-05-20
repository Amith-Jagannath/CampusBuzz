import { prisma } from "../../../utils/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { CustomPrismaAdapter } from "../../../libs/customPrismaAdapter";
const authOptions: AuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt", // <-- change this
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist access_token to the token object
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log("Inside JWT", token);
      return token;
    },
    async session({ session, token }) {
      // Send access_token to the client
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      console.log("inside session", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
