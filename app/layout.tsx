import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
