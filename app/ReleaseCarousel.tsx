"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
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
  const suppressClickUntilRef = useRef(0);
  const dragRef = useRef({
    active: false,
    moved: false,
    pointerId: -1,
    startScrollLeft: 0,
    startX: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const section = sectionRef.current;
    if (!viewport || !section) return;

    const handleWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const atStart = viewport.scrollLeft <= 1;
      const atEnd =
        viewport.scrollLeft + viewport.clientWidth >=
        viewport.scrollWidth - 1;

      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      event.preventDefault();
      viewport.scrollLeft += delta;
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startScrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId || !viewport) {
      return;
    }

    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) > 5) {
      drag.moved = true;
      sectionRef.current?.classList.add("is-dragging");
    }
    if (!drag.moved) return;

    event.preventDefault();
    viewport.scrollLeft = drag.startScrollLeft - distance;
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId || !viewport) {
      return;
    }

    drag.active = false;
    sectionRef.current?.classList.remove("is-dragging");

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.moved) {
      suppressClickUntilRef.current = Date.now() + 350;
      moveTo(Math.round(viewport.scrollLeft / viewport.clientWidth));
    }
  };

  const suppressClickAfterDrag = (event: MouseEvent<HTMLElement>) => {
    if (Date.now() >= suppressClickUntilRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <section
      className="release-carousel"
      id="music-catalog"
      aria-label="Music releases"
      aria-roledescription="carousel"
      onClickCapture={suppressClickAfterDrag}
      onPointerCancel={finishPointerDrag}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerDrag}
      ref={sectionRef}
    >
      <div className="release-carousel-indicators" aria-label="Choose a release">
        {releases.map((release, index) => (
          <button
            type="button"
            className={index === activeIndex ? "is-active" : undefined}
            aria-label={`Show ${release.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            key={release.id}
            onClick={() => moveTo(index)}
          />
        ))}
      </div>

      <button
        className="release-carousel-arrow release-carousel-arrow-left"
        type="button"
        aria-label="Previous release"
        onClick={() => moveTo(activeIndex - 1)}
      >
        ←
      </button>

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

      <button
        className="release-carousel-arrow release-carousel-arrow-right"
        type="button"
        aria-label="Next release"
        onClick={() => moveTo(activeIndex + 1)}
      >
        →
      </button>

      <p className="release-carousel-hint">
        Scroll, swipe or use the arrow keys
      </p>
    </section>
  );
}
