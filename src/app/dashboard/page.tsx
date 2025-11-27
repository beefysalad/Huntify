"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useUser } from "../hooks/useUser";
import SetPasswordCard from "../components/shared/Auth/set-password-card";

const Dashboard = () => {
  const { user, needsPassword } = useUser();
  return (
    <div className='space-y-6'>
      <div>
        Dashboard {user?.name} {user?.email}
      </div>
      <Button onClick={() => signOut()}>Sign out</Button>

      {needsPassword && (
        <div>
          <SetPasswordCard />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
