import type { Metadata } from "next";
import { SiteFooter } from "../SiteFooter";
import { SongTickerOutro } from "../SongTickerOutro";
import { MusicPageHeader, MusicPageMotion } from "./MusicPageMotion";
import { getFeaturedReleases, getMusicPage, getReleases } from "../sanity/queries";
import { urlForImage } from "../sanity/client";

export const metadata: Metadata = {
  title: "Music | Aharon Berk",
  description:
    "Explore Aharon Berk’s latest release, selected Jewish music and videos.",
};

export default async function MusicPage() {
  const [musicPage, featuredReleases, allReleases] = await Promise.all([
    getMusicPage(),
    getFeaturedReleases(),
    getReleases(),
  ]);

  const featuredSlugs = new Set(featuredReleases.map((r) => r.slug));
  const catalogReleases = allReleases.filter((r) => !featuredSlugs.has(r.slug));

  const hero = {
    title: musicPage?.heroTitle ?? "Music",
    introduction: musicPage?.heroIntroduction ?? "",
    links: musicPage?.heroLinks ?? [],
  };
  const platforms = musicPage?.platforms ?? [];

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

      {featuredReleases.map((featuredRelease, index) => {
        const coverUrl = urlForImage(featuredRelease.coverArt).width(640).height(640).url();

        return (
          <section
            className={`music-page-feature ${index % 2 ? "music-page-feature-reverse" : ""}`}
            aria-labelledby={`featured-release-title-${featuredRelease.slug}`}
            data-feature-index={index}
            data-motion-ready
            key={featuredRelease.slug}
          >
            <div className="music-page-feature-copy">
              <p className="music-page-kicker">Featured release</p>
              <h2 id={`featured-release-title-${featuredRelease.slug}`}>
                {featuredRelease.title}
              </h2>
              <p className="music-page-year">{featuredRelease.dateLabel}</p>
              <p className="music-page-description">{featuredRelease.description}</p>
              {featuredRelease.listenUrl ? (
                <nav
                  className="music-page-platforms"
                  aria-label={`Listen to ${featuredRelease.title}`}
                >
                  {platforms.map((platform) => (
                    <a
                      href={
                        platform.label === "Listen on Spotify"
                          ? featuredRelease.listenUrl
                          : platform.href
                      }
                      key={platform.label}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${platform.label}: ${featuredRelease.title}`}
                    >
                      <img
                        src={urlForImage(platform.icon).width(64).height(64).url()}
                        alt=""
                        width="64"
                        height="64"
                      />
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="music-page-feature-status">Links coming soon</p>
              )}
            </div>

            {featuredRelease.listenUrl ? (
              <a
                className="music-page-cover"
                href={featuredRelease.listenUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Listen to ${featuredRelease.title}`}
              >
                <img
                  src={coverUrl}
                  alt={`${featuredRelease.title} cover artwork`}
                  width="640"
                  height="640"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </a>
            ) : (
              <div className="music-page-cover">
                <img
                  src={coverUrl}
                  alt={`${featuredRelease.title} cover artwork`}
                  width="640"
                  height="640"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </div>
            )}
          </section>
        );
      })}

      <section className="music-page-catalog" aria-label="Selected releases">
        {catalogReleases.map((release) => (
          <article
            className="music-page-release"
            data-cursor-artwork={urlForImage(release.coverArt).width(400).height(400).url()}
            key={release.slug}
          >
            <div className="music-page-release-heading">
              <h2>{release.title}</h2>
              <time>{release.dateLabel}</time>
            </div>
            {release.watchUrl || release.listenUrl ? (
              <nav aria-label={`${release.title} links`}>
                {release.watchUrl ? (
                  <a href={release.watchUrl} target="_blank" rel="noreferrer">
                    Watch now<span aria-hidden="true" />
                  </a>
                ) : null}
                {release.listenUrl ? (
                  <a href={release.listenUrl} target="_blank" rel="noreferrer">
                    Listen<span aria-hidden="true" />
                  </a>
                ) : null}
              </nav>
            ) : (
              <p className="music-page-release-pending">Links coming soon</p>
            )}
          </article>
        ))}
      </section>

      <SiteFooter id="contact" />
      <SongTickerOutro />
    </main>
  );
}
