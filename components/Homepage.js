"use client";

import React from "react";

import Header from "./Header";
import Hero from "./Hero";
import { useUserSession } from "@/hooks/use-user-session";
import Dashboard from "@/app/dashboard/page";

const Homepage = ({ session }) => {
  const userSessionId = useUserSession(session);
  console.log("🚀 ~ Home ~ userSessionId:", userSessionId);

  return (
    <>
      {!userSessionId ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default Homepage;
