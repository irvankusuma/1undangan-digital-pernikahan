import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Undangan Digital",
  description: "Platform undangan digital modern dan scalable",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
