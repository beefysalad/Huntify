import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

type UserWithPassword =
  | (Awaited<ReturnType<typeof prisma.user.findUnique>> & {
      hashedPassword?: string | null;
    })
  | null;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        const user = (await prisma.user.findUnique({
          where: { email },
        })) as UserWithPassword;

        const hashedPassword = user?.hashedPassword;

        if (!hashedPassword) {
          return null;
        }

        const isValid = await bcrypt.compare(password, hashedPassword);

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        const hasPassword =
          typeof token.hasPassword === "boolean" ? token.hasPassword : false;
        session.user.hasPassword = hasPassword;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        if ("hashedPassword" in user) {
          token.hasPassword = Boolean(
            (user as { hashedPassword?: string | null }).hashedPassword
          );
        } else if (user.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { hashedPassword: true },
          });
          token.hasPassword = !!dbUser?.hashedPassword;
        }
      } else if (token.sub && token.hasPassword === undefined) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { hashedPassword: true },
        });
        token.hasPassword = !!dbUser?.hashedPassword;
      }

      if (trigger === "update" && typeof session?.hasPassword === "boolean") {
        token.hasPassword = session.hasPassword;
      }

      return token;
    },
  },
});
