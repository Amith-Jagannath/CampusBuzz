import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../../prisma/app/generated/prisma/client";

import type { Adapter, AdapterUser } from "next-auth/adapters";
import type { AdapterAccount } from "next-auth/adapters";

const prisma = new PrismaClient();

export function CustomPrismaAdapter(p = prisma): Adapter {
  const baseAdapter = PrismaAdapter(p);

  return {
    ...baseAdapter,

    getUserByAccount: async ({
      provider,
      providerAccountId,
    }): Promise<AdapterUser | null> => {
      const account = await p.account.findUnique({
        where: {
          providerId_providerAccountId: {
            providerId: provider,
            providerAccountId: providerAccountId,
          },
        },
        include: { user: true },
      });

      if (!account?.user) return null;

      const user = account.user;

      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email ?? "",
        emailVerified: user.emailVerified,
        image: user.image ?? null,
      };
    },
    async linkAccount(account: AdapterAccount) {
      await p.account.create({
        data: {
          userId: account.userId,
          providerType: account.type, // this is the key: Prisma expects 'providerType'
          providerId: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at
            ? new Date(account.expires_at * 1000)
            : null,
        },
      });
    },
    createSession: async (data) => {
      const account = await p.account.findFirst({
        where: {
          userId: data.userId,
        },
        orderBy: {
          updatedAt: "desc", // in case there are multiple accounts (Google, GitHub, etc.)
        },
      });
      return await p.session.create({
        data: {
          sessionToken: data.sessionToken,
          expires: data.expires,
          accessToken: account?.accessToken ?? "",
          user: {
            connect: {
              id: data.userId, // Connect the existing user by id
            },
          },
        },
      });
    },

   
  };
}
