"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import type { MusicRelease } from "./content/releases";

function ReleaseSlide({
  release,
  index,
  total,
}: {
  release: MusicRelease;
  index: number;
  total: number;
}) {
  return (
    <article
      className="release-carousel-slide"
      aria-label={`${index + 1} of ${total}: ${release.title}`}
      data-release-id={release.id}
    >
      <div className="release-carousel-content">
        <a
          className="release-carousel-cover"
          href={release.links.listen}
          target="_blank"
          rel="noreferrer"
          aria-label={`Listen to ${release.title} on Spotify`}
        >
          <picture>
            <source srcSet={release.cover.webp} type="image/webp" />
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
        </a>

        <div className="release-carousel-meta">
          {release.publishedAt ? (
            <time dateTime={release.publishedAt}>{release.dateLabel}</time>
          ) : (
            <span>{release.dateLabel}</span>
          )}
          <strong>{release.format}</strong>
        </div>

        <h2>{release.title}</h2>
        <p>{release.description}</p>

        <div className="release-carousel-actions">
          <a href={release.links.listen} target="_blank" rel="noreferrer">
            Listen <span aria-hidden="true">⟶</span>
          </a>
          {release.links.watch ? (
            <a href={release.links.watch} target="_blank" rel="noreferrer">
              Watch now <span aria-hidden="true">⟶</span>
            </a>
          ) : null}
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
  const scrollFrameRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const section = sectionRef.current;
    if (!viewport || !section) return;

    let gestureEndTimer = 0;

    const settleOnNearestRelease = () => {
      window.clearTimeout(gestureEndTimer);
      gestureEndTimer = window.setTimeout(() => {
        section.classList.remove("is-wheel-scrolling");
        const nextIndex = Math.min(
          releases.length - 1,
          Math.max(
            0,
            Math.round(viewport.scrollLeft / viewport.clientWidth),
          ),
        );

        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        viewport.scrollTo({
          left: nextIndex * viewport.clientWidth,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      }, 110);
    };

    const handleWheel = (event: WheelEvent) => {
      const horizontalIntent =
        Math.abs(event.deltaX) >= 0.5 &&
        Math.abs(event.deltaX) > Math.abs(event.deltaY) * 0.55;
      if (!horizontalIntent) return;

      event.preventDefault();
      section.classList.add("is-wheel-scrolling");

      const deltaMultiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? viewport.clientWidth
            : 1.2;

      viewport.scrollLeft += event.deltaX * deltaMultiplier;
      settleOnNearestRelease();
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      window.clearTimeout(gestureEndTimer);
      section.classList.remove("is-wheel-scrolling");
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [releases.length]);

  const moveTo = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nextIndex =
      (index + releases.length) % releases.length;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollTo({
      left: nextIndex * viewport.clientWidth,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  const updateActiveSlide = (event: UIEvent<HTMLDivElement>) => {
    if (scrollFrameRef.current) return;

    const viewport = event.currentTarget;
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      const nextIndex = Math.min(
        releases.length - 1,
        Math.max(0, Math.round(viewport.scrollLeft / viewport.clientWidth)),
      );
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    });
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(activeIndex - 1);
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
        onScroll={updateActiveSlide}
        tabIndex={0}
      >
        <div className="release-carousel-track">
          {releases.map((release, index) => (
            <ReleaseSlide
              release={release}
              index={index}
              total={releases.length}
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
