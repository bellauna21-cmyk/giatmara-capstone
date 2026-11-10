// src/backend/db/prisma.ts
// Singleton Prisma Client helper (with safe fallback when DATABASE_URL is not configured yet)

export interface PrismaLikeClient {
  $connect?: () => Promise<void>;
}

const globalForPrisma = globalThis as unknown as {
  prismaClient: unknown | undefined;
};

export function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalForPrisma.prismaClient) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient } = require("@prisma/client");
      globalForPrisma.prismaClient = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      });
    } catch {
      return null;
    }
  }

  return globalForPrisma.prismaClient;
}

