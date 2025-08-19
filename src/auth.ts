import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
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
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user) {
        const role = user.role || "STUDENT";
        await prisma.user.update({
          where: { id: user.id },
          data: { role },
        });
        if (role === "TEACHER") {
          const existingTeacher = await prisma.teacher.findUnique({
            where: { userId: user.id },
          });
          if (!existingTeacher) {
            await prisma.teacher.create({
              data: { userId: user.id },
            });
          }
        } else {
          const existingStudent = await prisma.student.findUnique({
            where: { userId: user.id },
          });
          if (!existingStudent) {
            await prisma.student.create({
              data: { userId: user.id },
            });
          }
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register",
  },
});
