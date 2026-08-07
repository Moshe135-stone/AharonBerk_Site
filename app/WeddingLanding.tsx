import { ScrollHero } from "./ScrollHero";
import { MusicFeature } from "./MusicFeature";
import { ReleaseCarousel } from "./ReleaseCarousel";
import { WeddingStory } from "./WeddingStory";
import { PerformanceShowcase } from "./PerformanceShowcase";
import { ContactStage } from "./ContactStage";
import { SongTickerOutro } from "./SongTickerOutro";
import { SiteFooter } from "./SiteFooter";
import { getFeaturedReleases, getPerformances, getWatchPage } from "./sanity/queries";
import { toMusicFeatureAlbum, toMusicRelease, toPerformanceItem } from "./sanity/adapters";

export default async function WeddingLanding() {
  const [performances, watchPage, featuredReleases] = await Promise.all([
    getPerformances(),
    getWatchPage(),
    getFeaturedReleases(),
  ]);

  const performanceItems = performances.map(toPerformanceItem);
  const musicReleases = featuredReleases.map(toMusicRelease);
  // The orbit widget has exactly 4 fixed visual slots (front/right/back/left),
  // so it always shows the 4 most recent featured releases.
  const orbitAlbums = featuredReleases.slice(-4).map(toMusicFeatureAlbum);

  return (
    <main>
      <ScrollHero />

      <MusicFeature albums={orbitAlbums} />

      <ReleaseCarousel releases={musicReleases} />

      <WeddingStory />

      <PerformanceShowcase
        performances={performanceItems}
        watchPage={watchPage ?? undefined}
      />

      <ContactStage />

      <SiteFooter />

      <SongTickerOutro />
    </main>
  );
}
