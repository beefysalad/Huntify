"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

type AppUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  hasPassword: boolean;
};

export function useUser() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  const user = useMemo<AppUser | null>(() => {
    if (!session?.user?.id) return null;
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      hasPassword: session.user.hasPassword ?? false,
    };
  }, [session]);

  const isAuthenticated = !!user && !loading;
  const needsPassword = isAuthenticated && !user?.hasPassword;

  return { user, loading, isAuthenticated, needsPassword };
}
