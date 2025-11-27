"use client";

import api from "@/src/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import type { AxiosError } from "axios";

type RegisterVariables = {
  name: string;
  email: string;
  password: string;
};

type SignInVariables = {
  email: string;
  password: string;
};

type SetPasswordVariables = {
  password: string;
};

type ApiErrorBody =
  | string
  | string[]
  | Record<string, string | string[]>
  | undefined;

const SIGN_IN_ERROR_MAP: Record<string, string> = {
  CredentialsSignin:
    "Email or password is incorrect, or this account only uses Google sign-in.",
};

function formatApiError(
  error: AxiosError<{ error?: ApiErrorBody }>,
  fallback: string
) {
  const payload = error.response?.data?.error;

  if (typeof payload === "string") {
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.join(" ");
  }

  if (payload && typeof payload === "object") {
    const values = Object.values(payload).flatMap((value) =>
      Array.isArray(value) ? value : [value]
    );
    if (values.length > 0) {
      return values.join(" ");
    }
  }

  return error.message || fallback;
}

function mapSignInError(code?: string | null) {
  if (!code) {
    return "Unable to sign in. Please try again.";
  }

  return SIGN_IN_ERROR_MAP[code] ?? "Unable to sign in right now.";
}

async function registerRequest(variables: RegisterVariables) {
  try {
    const response = await api.post("/auth/register", variables);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: ApiErrorBody }>;
    throw new Error(
      formatApiError(
        axiosError,
        "Unable to create account. Please check your details."
      )
    );
  }
}

async function credentialsSignIn(variables: SignInVariables) {
  const result = await signIn("credentials", {
    redirect: false,
    email: variables.email,
    password: variables.password,
  });

  if (!result || result.error) {
    throw new Error(mapSignInError(result?.error));
  }

  return result;
}

async function setPasswordRequest(variables: SetPasswordVariables) {
  try {
    const response = await api.post("/auth/set-password", variables);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: ApiErrorBody }>;
    throw new Error(
      formatApiError(
        axiosError,
        "Unable to set a password right now. Please try again."
      )
    );
  }
}

export function useAuthMutations() {
  const registerMutation = useMutation({
    mutationFn: registerRequest,
  });

  const signInMutation = useMutation({
    mutationFn: credentialsSignIn,
  });

  const setPasswordMutation = useMutation({
    mutationFn: setPasswordRequest,
  });

  return {
    registerMutation,
    signInMutation,
    setPasswordMutation,
  };
}
