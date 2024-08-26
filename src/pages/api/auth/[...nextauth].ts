import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  role?: string;
}
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
      
        if (user && credentials?.password) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
      
          if (isValidPassword) {
            return {
              ...user,
              id: user.id.toString(), // Convert id to string
            };
          }
        }
      
        // Return null if user data is invalid
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
