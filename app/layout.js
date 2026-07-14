import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme, { UserProvider } from "../ui/theme";
import { fontVariables } from "../ui/fonts";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export const metadata = {
  title: "PantryEase",
  description:
    "Know what you have, when it expires, and what to cook — waste less with PantryEase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <StoreProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
