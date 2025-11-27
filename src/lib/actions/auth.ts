"use server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { auth, signIn } from "../auth";

type RegisterInput = {
  email: string;
  password: string;
  name?: string;
};

type CredentialsInput = {
  email: string;
  password: string;
};

export async function signInWithGoogle() {
  await signIn("google");
}

export async function registerUser(input: RegisterInput) {
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  const name = input.name?.trim();
  const normalizedName = name && name.length > 0 ? name : null;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name: normalizedName,
      hashedPassword,
    },
  });
}

export async function signInWithCredentials(input: CredentialsInput) {
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export async function getUser() {
  return auth();
}

export async function setPasswordForCurrentUser(password: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be signed in to set a password.");
  }

  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { hashedPassword: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.hashedPassword) {
    throw new Error("Password already set for this account.");
  }

  const hashedPassword = await bcrypt.hash(trimmedPassword, 12);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { hashedPassword },
  });
}
