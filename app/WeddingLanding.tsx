import { ScrollHero } from "./ScrollHero";
import { MusicFeature } from "./MusicFeature";
import { ReleaseCarousel } from "./ReleaseCarousel";
import { WeddingStory } from "./WeddingStory";
import { PerformanceShowcase } from "./PerformanceShowcase";
import { ContactStage } from "./ContactStage";
import { SongTickerOutro } from "./SongTickerOutro";
import { SiteFooter } from "./SiteFooter";
import { musicReleases } from "./content/releases";

export default function WeddingLanding() {
  return (
    <main>
      <ScrollHero />

      <MusicFeature />

      <ReleaseCarousel releases={musicReleases} />

      <WeddingStory />

      <PerformanceShowcase />

      <ContactStage />

      <SiteFooter />

      <SongTickerOutro />
    </main>
  );
}
