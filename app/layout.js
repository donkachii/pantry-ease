import * as React from "react";
import { fontVariables } from "../ui/fonts";
import Providers from "./Providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
