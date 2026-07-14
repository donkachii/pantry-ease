"use client";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "../libs/firebase/auth";
import { useUserContext } from "../ui/theme";

function getSessionUid(session) {
  if (!session) {
    return null;
  }
  if (typeof session === "string") {
    return session;
  }
  return session.uid ?? null;
}

export function useUserSession(InitSession) {
  const [userUid, setUserUid] = useState(() => getSessionUid(InitSession));
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      console.log("authUser", authUser);
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
