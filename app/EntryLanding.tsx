const releaseLinks = [
  {
    href: "https://open.spotify.com/artist/2on0c6iQBHGTIn30q7te5Q?si=aBw6EiUFRPaoa9M0yfujMQ",
    label: "Listen on Spotify",
    icon: "/social/spotify.svg",
  },
  {
    href: "https://music.apple.com/us/artist/aharon-berk/1521973943",
    label: "Listen on Apple Music",
    icon: "/social/apple-music.svg",
  },
  {
    href: "https://www.youtube.com/@aharonberkmusic/videos",
    label: "Watch on YouTube",
    icon: "/social/youtube.svg",
  },
];

export function EntryLanding() {
  return (
    <main className="release-entry">
      <section className="release-entry-panel" aria-labelledby="release-entry-title">
        <a
          className="release-entry-close"
          href="/home"
          aria-label="Close new release announcement and enter the site"
        >
          <span aria-hidden="true" />
        </a>

        <h1 id="release-entry-title">
          New
          <br />
          Release
        </h1>

        <nav className="release-entry-links" aria-label="Listen to Mi Adir Avdecha">
          {releaseLinks.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              key={link.label}
            >
              <img src={link.icon} alt="" width="38" height="38" />
            </a>
          ))}
        </nav>
      </section>

      <a
        className="release-entry-artwork"
        href="/music"
        aria-label="Explore the new release Mi Adir Avdecha"
      >
        <img
          src="/music/covers/mi-adir-avdecha.jpg"
          alt="Mi Adir Avdecha by Aharon Berk and Simcha Leiner"
          width="1600"
          height="1600"
          fetchPriority="high"
        />
      </a>
    </main>
  );
}
