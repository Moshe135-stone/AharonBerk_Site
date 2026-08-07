"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { MusicRelease } from "./content/releases";

function ReleaseSlide({
  release,
  index,
  total,
  isActive,
}: {
  release: MusicRelease;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const coverArtwork = (
    <picture>
      <source srcSet={release.cover.webp} />
      <img
        src={release.cover.fallback}
        alt={release.cover.alt}
        width="1000"
        height="1000"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );

  return (
    <article
      className={`release-carousel-slide ${isActive ? "is-active" : ""}`}
      aria-label={`${index + 1} of ${total}: ${release.title}`}
      data-release-id={release.id}
    >
      <div className="release-carousel-content">
        {release.links.listen ? (
          <a
            className="release-carousel-cover"
            href={release.links.listen}
            target="_blank"
            rel="noreferrer"
            aria-label={`Listen to ${release.title}`}
          >
            {coverArtwork}
          </a>
        ) : (
          <div className="release-carousel-cover">{coverArtwork}</div>
        )}

        <div className="release-carousel-meta">
          {release.publishedAt ? (
            <time dateTime={release.publishedAt}>{release.dateLabel}</time>
          ) : (
            <span>{release.dateLabel}</span>
          )}
          <strong>{release.format}</strong>
        </div>

        <div className="release-carousel-details" aria-hidden={!isActive}>
          <h2>{release.title}</h2>
          <p>{release.description}</p>

          {release.links.listen || release.links.watch ? (
            <div className="release-carousel-actions">
              {release.links.listen ? (
                <a
                  href={release.links.listen}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={isActive ? undefined : -1}
                >
                  Listen <span aria-hidden="true">⟶</span>
                </a>
              ) : null}
              {release.links.watch ? (
              <a
                href={release.links.watch}
                target="_blank"
                rel="noreferrer"
                tabIndex={isActive ? undefined : -1}
              >
                Watch now <span aria-hidden="true">⟶</span>
              </a>
              ) : null}
            </div>
          ) : (
            <p className="release-carousel-status">Links coming soon</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ReleaseCarousel({
  releases,
}: {
  releases: readonly MusicRelease[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const section = sectionRef.current;
    if (!viewport || !section) return;

    let settleTimer = 0;
    let wheelUnlockTimer = 0;
    let wheelLocked = false;

    const settleOnNearestRelease = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const nextIndex = Math.min(
          releases.length - 1,
          Math.max(
            0,
            Math.round(viewport.scrollLeft / viewport.clientWidth),
          ),
        );

        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        wheelLocked = false;
      }, 150);
    };

    const handleScroll = () => {
      setActiveIndex((currentIndex) =>
        currentIndex === -1 ? currentIndex : -1,
      );
      settleOnNearestRelease();
    };

    const handleWheel = (event: WheelEvent) => {
      const horizontalIntent =
        Math.abs(event.deltaX) >= 0.05 &&
        Math.abs(event.deltaX) > Math.abs(event.deltaY) * 0.55;
      if (!horizontalIntent) return;

      event.preventDefault();
      if (wheelLocked) return;

      const direction = event.deltaX > 0 ? 1 : -1;
      const nextIndex = Math.min(
        releases.length - 1,
        Math.max(0, activeIndexRef.current + direction),
      );
      if (nextIndex === activeIndexRef.current) return;

      wheelLocked = true;
      setActiveIndex(-1);
      viewport.scrollTo({
        left: nextIndex * viewport.clientWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });

      window.clearTimeout(wheelUnlockTimer);
      wheelUnlockTimer = window.setTimeout(() => {
        wheelLocked = false;
      }, 900);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    viewport.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      viewport.removeEventListener("scroll", handleScroll);
      window.clearTimeout(settleTimer);
      window.clearTimeout(wheelUnlockTimer);
    };
  }, [releases.length]);

  const moveTo = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextIndex = Math.min(
      releases.length - 1,
      Math.max(0, index),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollTo({
      left: nextIndex * viewport.clientWidth,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(-1);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(activeIndexRef.current + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(activeIndexRef.current - 1);
    }
  };

  return (
    <section
      className="release-carousel"
      id="music-catalog"
      aria-label="Music releases"
      aria-roledescription="carousel"
      ref={sectionRef}
    >
      <div className="release-carousel-indicators" aria-hidden="true">
        {releases.map((release, index) => (
          <span
            className={index === activeIndex ? "is-active" : undefined}
            key={release.id}
          />
        ))}
      </div>

      <div
        className="release-carousel-viewport"
        ref={viewportRef}
        onKeyDown={handleKeyboard}
        tabIndex={0}
      >
        <div className="release-carousel-track">
          {releases.map((release, index) => (
            <ReleaseSlide
              release={release}
              index={index}
              total={releases.length}
              isActive={index === activeIndex}
              key={release.id}
            />
          ))}
        </div>
      </div>

      <p className="release-carousel-hint">
        Swipe or scroll left / right
      </p>
    </section>
  );
}
