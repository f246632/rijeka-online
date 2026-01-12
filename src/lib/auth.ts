import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import * as bcrypt from "bcryptjs";
import type { User, UserRole } from "@prisma/client";

// Development mode - allows login without database
const DEV_MODE = process.env.NODE_ENV === "development" || !process.env.DATABASE_URL;

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

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    avatar?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DEV_MODE ? undefined : (PrismaAdapter(prisma) as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email i lozinka su obavezni");
        }

        // Development mode - hardcoded test users
        if (DEV_MODE) {
          const devUsers = {
            "admin@rijeka.online": {
              id: "dev-admin",
              email: "admin@rijeka.online",
              name: "Admin",
              role: "ADMIN" as UserRole,
              password: "admin123",
            },
            "marko@rijeka.online": {
              id: "dev-editor",
              email: "marko@rijeka.online",
              name: "Marko Horvat",
              role: "EDITOR" as UserRole,
              password: "editor123",
            },
            "ana@rijeka.online": {
              id: "dev-author",
              email: "ana@rijeka.online",
              name: "Ana Kovač",
              role: "AUTHOR" as UserRole,
              password: "author123",
            },
          };

          const devUser = devUsers[credentials.email as keyof typeof devUsers];

          if (devUser && devUser.password === credentials.password) {
            console.log("✅ Dev mode login successful:", devUser.email);
            return {
              id: devUser.id,
              email: devUser.email,
              name: devUser.name,
              role: devUser.role,
              avatar: null,
            };
          } else {
            throw new Error("Neispravna email adresa ili lozinka");
          }
        }

        // Production mode - database authentication
        try {
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
        } catch (error) {
          throw new Error("Greška pri autentifikaciji");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
});
