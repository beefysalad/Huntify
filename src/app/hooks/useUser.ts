"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useUser() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  // Memoize user so it doesn't change unnecessarily
  const user = useMemo(() => {
    if (!session) return null;
    return session.user; // user object from NextAuth
  }, [session]);

  return { user, loading };
}
