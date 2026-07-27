import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aharon Berk | Jewish Singer, Recording Artist & Wedding Music",
  description:
    "Original Jewish music and live wedding performances by Aharon Berk and Azamra. Chuppas, Horas and receptions in South Africa and internationally.",
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
