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
        setUser({
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        });
        setUserUid(authUser.uid);
      } else {
        setUser({
          displayName: "",

          photoURL: "",
        });
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return userUid;
}
