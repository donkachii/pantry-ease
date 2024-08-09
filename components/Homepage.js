"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "./Header";
import Hero from "./Hero";
import { useUserSession } from "../hooks/use-user-session";

const Homepage = ({ session }) => {
  const router = useRouter();
  const userSessionId = useUserSession(JSON.parse(session));

  useEffect(() => {
    if (userSessionId) {
      router.push("/dashboard");
    }
  }, [userSessionId, router]);

  return (
    <>
      <Header />
      <Hero />
    </>
  );
};

export default Homepage;
