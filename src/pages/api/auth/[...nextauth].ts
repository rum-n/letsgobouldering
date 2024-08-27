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
        try {
          console.log("Authorize method called");
      
          if (!credentials?.email || !credentials.password) {
            console.error("Missing credentials");
            return null;
          }
      
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
      
          if (!user) {
            console.error("No user found with the email:", credentials.email);
            return null;
          }
      
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
      
          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials.email);
            return null;
          }
      
          console.log("User authenticated successfully:", user.email);
      
          return {
            ...user,
            id: user.id.toString(),
            role: user.role, // Ensure that the role is included if it exists
          };
        } catch (error) {
          console.error("Error in authorize method:", error);
          return null;
        }
      }
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
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user = {
            ...session.user,
            id: token.id,
            role: token.role,
          } as User;
        }
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
