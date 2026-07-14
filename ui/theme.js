"use client";

import { createTheme } from "@mui/material/styles";
import { createContext, useContext, useState } from "react";

const fontBody = "var(--font-body), system-ui, sans-serif";
const fontDisplay = "var(--font-display), Georgia, serif";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2F5D3A",
      light: "#4A7A55",
      dark: "#1E3D28",
      contrastText: "#F3F6F1",
    },
    secondary: {
      main: "#C6D93A",
      light: "#D8E66A",
      dark: "#A8B82A",
      contrastText: "#1A2E1F",
    },
    background: {
      default: "#F3F6F1",
      paper: "#FAFCF8",
    },
    text: {
      primary: "#1A2E1F",
      secondary: "#4A5C4E",
    },
    divider: "rgba(47, 93, 58, 0.12)",
  },
  typography: {
    fontFamily: fontBody,
    h1: {
      fontFamily: fontDisplay,
      fontWeight: 600,
    },
    h2: {
      fontFamily: fontDisplay,
      fontWeight: 600,
    },
    h3: {
      fontFamily: fontDisplay,
      fontWeight: 600,
    },
    h4: {
      fontFamily: fontDisplay,
      fontWeight: 600,
    },
    h5: {
      fontFamily: fontDisplay,
      fontWeight: 500,
    },
    h6: {
      fontFamily: fontDisplay,
      fontWeight: 500,
    },
    button: {
      fontFamily: fontBody,
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 24,
          paddingBlock: 10,
          boxShadow: "none",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            boxShadow: "none",
            transform: "translateY(-2px)",
          },
        },
        containedPrimary: {
          backgroundColor: "#2F5D3A",
          "&:hover": {
            backgroundColor: "#1E3D28",
          },
        },
        containedSecondary: {
          backgroundColor: "#C6D93A",
          color: "#1A2E1F",
          "&:hover": {
            backgroundColor: "#D8E66A",
          },
        },
      },
    },
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
