import { SiteFooter } from "../SiteFooter";
import { SongTickerOutro } from "../SongTickerOutro";
import { WeddingsPage } from "./WeddingsPage";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Jewish Wedding Music with Azamra",
  description:
    "Live music for Chuppas, Horas, receptions and seamless Jewish wedding celebrations with Aharon Berk and Azamra.",
  path: "/weddings",
});

export default function WeddingsRoute() {
  return (
    <main className="weddings-page">
      <WeddingsPage />
      <SiteFooter id="contact" />
      <SongTickerOutro />
    </main>
  );
}
