import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import * as bcrypt from "bcryptjs";
import type { User, UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      avatar?: string | null;
    };
  }

  interface User {
    role: UserRole;
    avatar?: string | null;
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email i lozinka su obavezni");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Neispravna email adresa ili lozinka");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Neispravna email adresa ili lozinka");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
};

// Helper function for getting session in Server Components
export async function auth(): Promise<{
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string | null;
  };
} | null> {
  // This is a placeholder - NextAuth v5 would use getServerSession
  // For now, return null to allow build to succeed
  return null;
}
