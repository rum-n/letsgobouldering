import { PrismaClient } from "@prisma/client";

// Check if we're in a development environment
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Use a global variable for Prisma client during development to avoid multiple instances
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

// If we're not in production, attach the client to the global object
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
