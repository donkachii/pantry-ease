"use client";

import { removeSession } from "@/actions/auth-actions";
import { signOutWithGoogle } from "@/libs/firebase/auth";
import { Button } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
