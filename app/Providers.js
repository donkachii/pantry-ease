"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme, { UserProvider } from "../ui/theme";
import StoreProvider from "./StoreProvider";

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <StoreProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </UserProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
  );
}
