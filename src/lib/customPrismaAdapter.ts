import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function CustomAdapter() {
  const originalAdapter = PrismaAdapter(prisma);

  return {
    ...originalAdapter,
    createUser: async (data: any) => {
      const { password, ...rest } = data;
      return prisma.user.create({
        data: rest
      });
    }
  };
}
