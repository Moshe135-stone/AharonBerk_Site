import { ScrollHero } from "./ScrollHero";
import { MusicFeature } from "./MusicFeature";
import { ReleaseCarousel } from "./ReleaseCarousel";
import { WeddingStory } from "./WeddingStory";
import { PerformanceShowcase } from "./PerformanceShowcase";
import { ContactStage } from "./ContactStage";
import { SongTickerOutro } from "./SongTickerOutro";
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

      <footer className="site-footer">
        <a className="footer-monogram" href="#top" aria-label="Back to top">
          <img
            src="/brand/ab-monogram.svg"
            alt="Aharon Berk"
            width="270"
            height="156"
          />
        </a>

        <div className="footer-connect">
          <div className="footer-social-block">
            <p className="footer-social-label">Find Aharon on</p>
            <nav className="footer-socials" aria-label="Find Aharon online">
              <a
                href="https://www.instagram.com/aharonberk/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src="/social/instagram.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://www.facebook.com/AharonBerk"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <img src="/social/facebook.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxAJ-494ZAh1azhFI_j0Krw"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <img src="/social/youtube.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://open.spotify.com/artist/2on0c6iQBHGTIn30q7te5Q?si=aBw6EiUFRPaoa9M0yfujMQ"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
              >
                <img src="/social/spotify.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://music.apple.com/us/artist/aharon-berk/1521973943"
                target="_blank"
                rel="noreferrer"
                aria-label="Apple Music"
              >
                <img src="/social/apple-music.svg" alt="" width="24" height="24" />
              </a>
            </nav>
          </div>

          <div className="footer-contact-block">
            <p className="footer-social-label">Contact Aharon</p>
            <nav className="footer-contact-links" aria-label="Contact Aharon">
              <a href="mailto:aharon@azamra.co.za" aria-label="Email Aharon Berk">
                <img src="/contact/email.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=27722185278"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Aharon Berk"
              >
                <img
                  src="/contact/whatsapp-icon.svg"
                  alt=""
                  width="24"
                  height="24"
                />
              </a>
            </nav>
          </div>
        </div>

        <div className="footer-content">
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#music">Music</a>
            <span aria-hidden="true">|</span>
            <a href="#weddings">Weddings</a>
            <span aria-hidden="true">|</span>
            <a href="#about">About</a>
            <span aria-hidden="true">|</span>
            <a href="#contact">Contact</a>
          </nav>

          <div className="footer-copy">
            <p className="footer-bio">
              Aharon Berk is a Jewish singer, recording artist and live
              performer based in Johannesburg, and the founder and lead
              vocalist of Azamra.
            </p>
            <p className="footer-location">
              Based in Johannesburg. Available in Cape Town, across South
              Africa and internationally.
            </p>
          </div>

          <div className="footer-legal">
            <p className="copyright">© {new Date().getFullYear()} Aharon Berk</p>
            <a
              className="footer-credit"
              href="https://www.thecreativestone.net"
              target="_blank"
              rel="noreferrer"
            >
              Powered by The Creative Stone
            </a>
          </div>
        </div>
      </footer>

      <SongTickerOutro />
    </main>
  );
}
