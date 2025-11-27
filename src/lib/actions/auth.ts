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
