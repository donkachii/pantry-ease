"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInWithGoogle } from "../../libs/firebase/auth";
import { createSession } from "../../actions/auth-actions";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../ui/theme";
import { firestore } from "../../libs/firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PantryEase
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useUserContext();

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      const userRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        // User exists, update the last login time
        await updateDoc(userRef, {
          lastLogin: serverTimestamp(),
        });
      } else {
        // User does not exist, create a new user document
        await setDoc(userRef, {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      }

      setUser({
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      });

      const userDetails = {
        displayName: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
      };

      await createSession(JSON.stringify(userDetails));
      router.push("/dashboard");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Button fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleSignIn}>
          Continue With Google
        </Button>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
