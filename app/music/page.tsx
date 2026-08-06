import type { Metadata } from "next";
import { musicPageContent } from "../content/music-page";
import { SiteFooter } from "../SiteFooter";
import { SongTickerOutro } from "../SongTickerOutro";
import { MusicPageHeader, MusicPageMotion } from "./MusicPageMotion";

export const metadata: Metadata = {
  title: "Music | Aharon Berk",
  description:
    "Explore Aharon Berk’s latest release, selected Jewish music and videos.",
};

export default function MusicPage() {
  const { hero, featuredRelease, platforms, releases } = musicPageContent;

  return (
    <main className="music-page">
      <MusicPageHeader />
      <MusicPageMotion />
      <section className="music-page-hero">
        <h1>{hero.title}</h1>
        <p>{hero.introduction}</p>
        <nav className="music-page-actions" aria-label="Music destinations">
          {hero.links.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label}<span aria-hidden="true" />
            </a>
          ))}
        </nav>
      </section>

      <section
        className="music-page-feature"
        aria-labelledby="featured-release-title"
        data-motion-ready
      >
        <div className="music-page-feature-copy">
          <p className="music-page-kicker">Latest release</p>
          <h2 id="featured-release-title">{featuredRelease.title}</h2>
          <p className="music-page-year">{featuredRelease.year}</p>
          <p className="music-page-description">{featuredRelease.description}</p>
          <nav className="music-page-platforms" aria-label="Listen to the latest release">
            {platforms.map((platform) => (
              <a
                href={platform.href}
                key={platform.label}
                target="_blank"
                rel="noreferrer"
                aria-label={platform.label}
              >
                <img src={platform.icon} alt="" width="64" height="64" />
              </a>
            ))}
          </nav>
        </div>

        {featuredRelease.artwork ? (
          <a
            className="music-page-cover"
            href={featuredRelease.links.listen}
            target="_blank"
            rel="noreferrer"
            aria-label={`Listen to ${featuredRelease.title}`}
          >
            <picture>
              <source media="(max-width: 700px)" srcSet={featuredRelease.artwork.mobile} />
              <img
                src={featuredRelease.artwork.desktop}
                alt={featuredRelease.artwork.alt}
                width="1280"
                height="1284"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </a>
        ) : null}
      </section>

      <section className="music-page-catalog" aria-label="Selected releases">
        {releases.map((release) => (
          <article
            className="music-page-release"
            data-cursor-artwork={release.artwork?.desktop}
            key={release.slug}
          >
            <div className="music-page-release-heading">
              <h2>{release.title}</h2>
              <time>{release.year}</time>
            </div>
            <nav aria-label={`${release.title} links`}>
              <a href={release.links.watch} target="_blank" rel="noreferrer">
                Watch now<span aria-hidden="true" />
              </a>
              <a href={release.links.listen} target="_blank" rel="noreferrer">
                Listen<span aria-hidden="true" />
              </a>
            </nav>
          </article>
        ))}
      </section>

      <SiteFooter id="contact" />
      <SongTickerOutro />
    </main>
  );
}
