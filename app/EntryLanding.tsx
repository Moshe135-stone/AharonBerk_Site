import { redirect } from "next/navigation";
import { getNewReleasePopover } from "./sanity/queries";
import { urlForImage } from "./sanity/client";

export async function EntryLanding() {
  const popover = await getNewReleasePopover();
  if (!popover || !popover.enabled) redirect("/home");

  const artworkUrl = urlForImage(popover.artwork).width(1600).height(1600).url();

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

        <div className="release-entry-heading">
          {popover.kicker ? <p>{popover.kicker}</p> : null}
          <h1 id="release-entry-title">
            {popover.title}
            {popover.subtitle ? <span>{popover.subtitle}</span> : null}
          </h1>
        </div>

        {popover.links.length > 0 ? (
          <div className="release-entry-availability">
            <p>Available on</p>
            <nav
              className="release-entry-links"
              aria-label={`Listen to ${popover.title}${popover.subtitle ? ` ${popover.subtitle}` : ""}`}
            >
              {popover.links.map((link) => (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  key={link.label}
                >
                  <img
                    src={urlForImage(link.icon).width(76).height(76).url()}
                    alt=""
                    width="38"
                    height="38"
                  />
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </section>

      <a
        className="release-entry-artwork"
        href={popover.exploreUrl || "/music"}
        aria-label={`Explore the new release ${popover.title}${popover.subtitle ? ` ${popover.subtitle}` : ""}`}
      >
        <img
          src={artworkUrl}
          alt={popover.artworkAlt}
          width="1600"
          height="1600"
          fetchPriority="high"
        />
      </a>
    </main>
  );
}
