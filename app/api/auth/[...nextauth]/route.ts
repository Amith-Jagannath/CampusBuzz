import { prisma } from "../../../utils/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { CustomPrismaAdapter } from "../../../libs/customPrismaAdapter";
import GitHubProvider from "next-auth/providers/github";
const authOptions: AuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "database", // <-- change this
  },
  callbacks: {
    // async jwt({ token, account }) {
    //   // Persist access_token to the token object
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   console.log("Inside JWT", token);
    //   return token;
    // },
    //async session({ session, user }) {
    // // Access token could be stored in the Account model
    // const dbAccount = await prisma.account.findFirst({
    //   where: {
    //     userId: user.id,
    //     providerId: "google",
    //   },
    // });
    // if (dbAccount?.accessToken) {
    //   (session as any).accessToken = dbAccount.accessToken;
    //   console.log("inside session", session);
    // }
    // console.log("inside session", session);
    // return session;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
