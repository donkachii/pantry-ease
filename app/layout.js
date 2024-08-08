import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme, { UserProvider } from "../ui/theme";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "PantryEase",
  description:
    "Welcome to PantryEase: Your Ultimate AI Pantry Management Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
