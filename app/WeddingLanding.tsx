import { ScrollHero } from "./ScrollHero";
import { MusicFeature } from "./MusicFeature";
import { ReleaseCarousel } from "./ReleaseCarousel";
import { WeddingStory } from "./WeddingStory";
import { PerformanceShowcase } from "./PerformanceShowcase";
import { ContactStage } from "./ContactStage";
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

      <footer>
        <a className="wordmark wordmark-light" href="#top">
          Aharon Berk
        </a>
        <p>
          Jewish singer, recording artist and live performer based in
          Johannesburg. Available across South Africa and internationally.
        </p>
        <nav aria-label="Footer navigation">
          <a href="#music">Music</a>
          <a href="#weddings">Weddings</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Aharon Berk</p>
      </footer>
    </main>
  );
}
