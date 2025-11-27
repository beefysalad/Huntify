"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useUser } from "../hooks/useUser";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div>
      <div>
        Dashboard {user?.name} {user?.email}
      </div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default Dashboard;
