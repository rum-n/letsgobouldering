import { PrismaClient } from "@prisma/client";

declare global {
  // This prevents issues with hot-reloading in development environments
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
