"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";

import Header from "./Header";
import Hero from "./Hero";
import Features from "./landing/Features";
import HowItWorks from "./landing/HowItWorks";
import FinalCTA from "./landing/FinalCTA";
import Footer from "./landing/Footer";
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
    <Box
      component="main"
      sx={{
        minHeight: "100svh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </Box>
  );
};

export default Homepage;
