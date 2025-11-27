"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const user = session?.user;

  // Define public routes
  const publicRoutes = ["/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (loading) return;

    // Protected route & NO user → redirect to login
    if (!isPublicRoute && !user) {
      router.replace("/");
    }

    // Public route & user already exists → redirect to dashboard
    if (isPublicRoute && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, isPublicRoute, router]);

  // ⛳ 1. Show spinner while session is loading
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // ⛳ 2. Show spinner while redirecting
  if ((!isPublicRoute && !user) || (isPublicRoute && user)) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // ⛳ 3. Render page
  return <>{children}</>;
}
