import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./config/db-config";
import { comparePassword } from "./lib/utils";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", name: "email" },
        password: { label: "Password", type: "password", name: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Invalid credentials");
          }
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordValid = await comparePassword(
            credentials.password as string,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return {
            id: user.id,
            email: user.email,
            name: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Failed to authenticate user");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}/dashboard`;
      if (new URL(url).origin === baseUrl) return `${baseUrl}/dashboard`;
      return baseUrl;
    },
  },
});
