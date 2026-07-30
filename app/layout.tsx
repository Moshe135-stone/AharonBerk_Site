import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "./SmoothCursor";

export const metadata: Metadata = {
  title: "Aharon Berk | Weddings & Music",
  description:
    "Explore live Jewish wedding performances and original music by Aharon Berk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SmoothCursor />
      </body>
    </html>
  );
}
