import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      hasPassword?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    hashedPassword?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    hasPassword?: boolean;
  }
}


