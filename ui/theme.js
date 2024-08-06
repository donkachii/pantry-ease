"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { createContext, useContext, useState } from "react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;

const Context = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    displayName: "",
    photoURL: "",
  });
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
