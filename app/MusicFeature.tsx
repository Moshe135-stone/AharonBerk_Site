"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const titleFirstLine = ["Music", "rooted", "in"];
const titleSecondLine = ["meaning"];
const description =
  "Aharon’s songs draw on tefillah, Jewish life and personal emotion, with a sound that is contemporary while remaining rooted in tradition.";
const descriptionWords = description.split(" ");
const titleWordCount = titleFirstLine.length + titleSecondLine.length;
const orbitSlots = ["front", "right", "back", "left"] as const;
const albums = [
  {
    title: "40 Days",
    slug: "40-days",
    spotify: "https://open.spotify.com/album/5ZH20UI0C8JdPthYiwUzcg",
  },
  {
    title: "Nafsheinu",
    slug: "nafsheinu",
    spotify: "https://open.spotify.com/album/0VEbu8A4mTR2e401opxbh7",
  },
  {
    title: "Tefilas Hashla",
    slug: "tefilas-hashla",
    spotify: "https://open.spotify.com/album/745D1UXIIBflDRkx227irz",
  },
  {
    title: "Piha Pascha",
    slug: "piha-pascha",
    spotify: "https://open.spotify.com/album/1U329vXa5l0MxMfAFIEPHp",
  },
] as const;

export function MusicFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const activeAlbumIndexRef = useRef(0);
  const hoverIntentTimerRef = useRef<number | null>(null);
  const orbitUnlockTimerRef = useRef<number | null>(null);
  const orbitLockedRef = useRef(false);
  const tiltFrameRef = useRef(0);
  const tiltTargetRef = useRef({ x: 0, y: 0 });
  const tiltCurrentRef = useRef({ x: 0, y: 0 });
  const visibleTitleWordCountRef = useRef(-1);
  const visibleDescriptionWordCountRef = useRef(-1);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const descriptionElement = descriptionRef.current;
    if (!section || !title || !descriptionElement) return;

    const titleWords =
      title.querySelectorAll<HTMLElement>(".music-feature-word");
    const descriptionWordElements =
      descriptionElement.querySelectorAll<HTMLElement>(".music-feature-word");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const visibleCountFor = (element: HTMLElement, total: number) => {
      if (reducedMotion) return total;

      const elementTop = element.getBoundingClientRect().top;
      const revealStart = window.innerHeight * 0.86;
      const revealEnd = window.innerHeight * 0.52;
      const progress = Math.min(
        1,
        Math.max(
          0,
          (revealStart - elementTop) / (revealStart - revealEnd),
        ),
      );

      return Math.floor(progress * (total + 1));
    };

    const update = () => {
      frame = 0;
      const visibleTitleWordCount = visibleCountFor(title, titleWordCount);
      const visibleDescriptionWordCount = visibleCountFor(
        descriptionElement,
        descriptionWords.length,
      );

      if (
        visibleTitleWordCount !== visibleTitleWordCountRef.current
      ) {
        titleWords.forEach((word, index) => {
          word.classList.toggle(
            "is-visible",
            index < visibleTitleWordCount,
          );
        });
        visibleTitleWordCountRef.current = visibleTitleWordCount;
      }

      if (
        visibleDescriptionWordCount !==
        visibleDescriptionWordCountRef.current
      ) {
        descriptionWordElements.forEach((word, index) => {
          word.classList.toggle(
            "is-visible",
            index < visibleDescriptionWordCount,
          );
        });
        visibleDescriptionWordCountRef.current =
          visibleDescriptionWordCount;
      }

      section.toggleAttribute(
        "data-copy-visible",
        visibleDescriptionWordCount >= descriptionWords.length,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(
    () => () => {
      if (hoverIntentTimerRef.current) {
        window.clearTimeout(hoverIntentTimerRef.current);
      }
      if (orbitUnlockTimerRef.current) {
        window.clearTimeout(orbitUnlockTimerRef.current);
      }
      if (tiltFrameRef.current) {
        window.cancelAnimationFrame(tiltFrameRef.current);
      }
    },
    [],
  );

  const requestTiltUpdate = () => {
    if (tiltFrameRef.current) return;

    const updateTilt = () => {
      const orbit = orbitRef.current;
      if (!orbit) {
        tiltFrameRef.current = 0;
        return;
      }

      const target = tiltTargetRef.current;
      const current = tiltCurrentRef.current;
      current.x += (target.x - current.x) * 0.11;
      current.y += (target.y - current.y) * 0.11;

      orbit.style.setProperty("--album-tilt-x", `${current.x.toFixed(3)}deg`);
      orbit.style.setProperty("--album-tilt-y", `${current.y.toFixed(3)}deg`);

      const isSettled =
        Math.abs(target.x - current.x) < 0.015 &&
        Math.abs(target.y - current.y) < 0.015;

      if (isSettled) {
        current.x = target.x;
        current.y = target.y;
        orbit.style.setProperty("--album-tilt-x", `${target.x}deg`);
        orbit.style.setProperty("--album-tilt-y", `${target.y}deg`);
        tiltFrameRef.current = 0;
        return;
      }

      tiltFrameRef.current = window.requestAnimationFrame(updateTilt);
    };

    tiltFrameRef.current = window.requestAnimationFrame(updateTilt);
  };

  const handleOrbitMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const orbit = orbitRef.current;
    if (!orbit) return;

    const rect = orbit.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

    tiltTargetRef.current.x = pointerY * -5;
    tiltTargetRef.current.y = pointerX * 7;
    requestTiltUpdate();
  };

  const cancelAlbumIntent = () => {
    if (!hoverIntentTimerRef.current) return;
    window.clearTimeout(hoverIntentTimerRef.current);
    hoverIntentTimerRef.current = null;
  };

  const commitAlbumRotation = (index: number) => {
    if (index === activeAlbumIndexRef.current || orbitLockedRef.current) {
      return;
    }

    activeAlbumIndexRef.current = index;
    setActiveAlbumIndex(index);
    orbitLockedRef.current = true;

    if (orbitUnlockTimerRef.current) {
      window.clearTimeout(orbitUnlockTimerRef.current);
    }
    orbitUnlockTimerRef.current = window.setTimeout(() => {
      orbitLockedRef.current = false;
      orbitUnlockTimerRef.current = null;
    }, 950);
  };

  const handleAlbumIntent = (index: number) => {
    cancelAlbumIntent();
    if (index === activeAlbumIndexRef.current || orbitLockedRef.current) {
      return;
    }

    hoverIntentTimerRef.current = window.setTimeout(() => {
      hoverIntentTimerRef.current = null;
      commitAlbumRotation(index);
    }, 140);
  };

  const handleAlbumFocus = (index: number) => {
    cancelAlbumIntent();
    orbitLockedRef.current = false;
    commitAlbumRotation(index);
  };

  const resetOrbitTilt = () => {
    cancelAlbumIntent();
    tiltTargetRef.current.x = 0;
    tiltTargetRef.current.y = 0;
    requestTiltUpdate();
  };

  return (
    <section className="music-feature" id="music" ref={sectionRef}>
      <h2 aria-label="Music rooted in meaning" ref={titleRef}>
        {titleFirstLine.map((word) => (
          <span
            className="music-feature-word"
            aria-hidden="true"
            key={word}
          >
            {word}
          </span>
        ))}
        <br />
        {titleSecondLine.map((word) => (
          <span
            className="music-feature-word"
            aria-hidden="true"
            key={word}
          >
            {word}
          </span>
        ))}
      </h2>
      <div
        className="album-orbit"
        aria-label="Featured releases"
        onPointerMove={handleOrbitMove}
        onPointerLeave={resetOrbitTilt}
        ref={orbitRef}
      >
        <div className="album-orbit-ring">
          {albums.map((album, index) => {
            const slot =
              orbitSlots[
                (index - activeAlbumIndex + albums.length) % albums.length
              ];

            return (
              <a
                className="album-cover"
                data-slot={slot}
                href={album.spotify}
                key={album.slug}
                onFocus={() => handleAlbumFocus(index)}
                onPointerEnter={() => handleAlbumIntent(index)}
                onPointerLeave={cancelAlbumIntent}
                rel="noreferrer"
                target="_blank"
                aria-label={`Listen to ${album.title} on Spotify`}
              >
                <picture>
                  <source
                    srcSet={`/music/covers/${album.slug}.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`/music/covers/${album.slug}.jpg`}
                    alt={`${album.title} album cover`}
                    width="1000"
                    height="1000"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="album-cover-label">
                  <span>{album.title}</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
      <div className="music-feature-copy">
        <p aria-label={description} ref={descriptionRef}>
          {descriptionWords.map((word, index) => (
            <span
              className="music-feature-word"
              aria-hidden="true"
              key={`${word}-${index}`}
            >
              {word}
            </span>
          ))}
        </p>
        <a href="#music-catalog">
          Explore the music <span aria-hidden="true">⟶</span>
        </a>
      </div>
    </section>
  );
}
