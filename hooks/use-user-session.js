"use client";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "../libs/firebase/auth";
import { useUserContext } from "../ui/theme";

export function useUserSession(InitSession) {
  const [userUid, setUserUid] = useState(InitSession);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
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
