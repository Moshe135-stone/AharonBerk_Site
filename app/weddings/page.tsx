import type { Metadata } from "next";
import { SiteFooter } from "../SiteFooter";
import { SongTickerOutro } from "../SongTickerOutro";
import { WeddingsPage } from "./WeddingsPage";

export const metadata: Metadata = {
  title: "Weddings | Aharon Berk & Azamra",
  description:
    "Live music for Chuppas, Horas, receptions and seamless Jewish wedding celebrations with Aharon Berk and Azamra.",
};

export default function WeddingsRoute() {
  return (
    <main className="weddings-page">
      <WeddingsPage />
      <SiteFooter id="contact" />
      <SongTickerOutro />
    </main>
  );
}
