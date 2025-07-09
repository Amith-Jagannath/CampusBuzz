import { prisma } from "../../../utils/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.username = dbUser.username || "";
        }
      }
      console.log("session:", session);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
