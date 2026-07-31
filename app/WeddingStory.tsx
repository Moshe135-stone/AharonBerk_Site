"use client";

import { useEffect, useRef } from "react";

const storyCopy = [
  <>
    Through Azamra, Aharon offers live music for Chuppas, Horas and receptions,
    with professional musicians, sound and personal guidance from the planning
    stage through to the wedding day.
  </>,
  <>
    <strong>Chuppas:</strong> Heartfelt live vocals with piano or keyboard,
    professional sound and the option to add strings, guitar, flute, saxophone,
    percussion or custom arrangements.
  </>,
  <>
    <strong>Horas and receptions:</strong> A full live band for energetic Jewish
    dancing and reception music, with additional musicians available to suit
    the occasion.
  </>,
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function WeddingStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canopyImageRef = useRef<HTMLImageElement>(null);
  const copyRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canopyImage = canopyImageRef.current;

    if (!section || !sticky || !canopyImage) {
      return;
    }

    let animationFrame = 0;
    let revealTimer = 0;

    const paint = () => {
      animationFrame = 0;

      const rect = section.getBoundingClientRect();

      if (
        canopyImage.complete &&
        rect.top <= window.innerHeight * 0.82 &&
        !sticky.hasAttribute("data-canopy-painted")
      ) {
        sticky.setAttribute("data-canopy-painted", "");
        revealTimer = window.setTimeout(() => {
          sticky.setAttribute("data-canopy-reveal-done", "");
        }, 2500);
      }

      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      const collaborationProgress = clamp(progress / 0.18);
      const copyReveal = clamp((progress - 0.14) / 0.08);
      const copyPosition = clamp((progress - 0.24) / 0.58) * 2;
      const compactLayout = window.innerWidth <= 700;
      const startX = compactLayout
        ? Math.max(24, (window.innerWidth - 160) / 2)
        : window.innerWidth * 0.24;
      const endX = compactLayout ? 8 : window.innerWidth * 0.1;
      const startY = window.innerHeight * (compactLayout ? 0.34 : 0.42);
      const endY = window.innerHeight * (compactLayout ? 0.32 : 0.38);
      const compactScale = compactLayout ? 0.72 : 0.44;

      sticky.style.setProperty(
        "--wedding-collab-x",
        `${startX + (endX - startX) * collaborationProgress}px`,
      );
      sticky.style.setProperty(
        "--wedding-collab-y",
        `${startY + (endY - startY) * collaborationProgress}px`,
      );
      sticky.style.setProperty(
        "--wedding-collab-scale",
        (
          1 -
          collaborationProgress * (1 - compactScale)
        ).toFixed(4),
      );
      sticky.style.setProperty(
        "--wedding-collab-opacity",
        "1",
      );
      copyRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const delta = index - copyPosition;
        const distance = Math.abs(delta);
        const opacity =
          delta < 0
            ? Math.max(0, 1 - distance * 1.55)
            : Math.max(0, 1 - distance * 0.88);

        const visualOpacity = opacity * copyReveal;

        const finalCopyOffset =
          index === storyCopy.length - 1 ? -10 : 0;

        item.style.setProperty(
          "--wedding-item-y",
          `${delta * 44 + finalCopyOffset}vh`,
        );
        item.style.setProperty(
          "--wedding-item-opacity",
          visualOpacity.toFixed(4),
        );
        item.style.setProperty(
          "--wedding-item-blur",
          `${(1 - visualOpacity) * 5}px`,
        );
      });
    };

    const requestPaint = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(paint);
      }
    };

    paint();
    canopyImage.addEventListener("load", requestPaint);
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);

    return () => {
      canopyImage.removeEventListener("load", requestPaint);
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section className="wedding-story" id="weddings" ref={sectionRef}>
      <div className="wedding-story-sticky" ref={stickyRef}>
        <picture className="wedding-story-art" aria-hidden="true">
          <source
            srcSet="/weddings/canopy-bg.webp"
            type="image/webp"
          />
          <img
            src="/weddings/canopy-bg.png"
            alt=""
            width="2560"
            height="1707"
            loading="lazy"
            decoding="async"
            ref={canopyImageRef}
          />
        </picture>

        <div
          className="wedding-collab"
          aria-label="Aharon Berk in collaboration with Azamra"
        >
          <span className="wedding-collab-wordmark" aria-hidden="true">
            <img src="/brand/aharon.svg" alt="" width="372" height="70" />
            <img src="/brand/berk.svg" alt="" width="223" height="69" />
          </span>
          <span className="wedding-collab-cross" aria-hidden="true">
            ×
          </span>
          <span className="wedding-collab-azamra" aria-hidden="true">
            Azamra
          </span>
        </div>

        <div className="wedding-story-copy-window">
          {storyCopy.map((copy, index) => (
            <p
              className="wedding-story-copy"
              key={index}
              ref={(element) => {
                copyRefs.current[index] = element;
              }}
            >
              {copy}
            </p>
          ))}
        </div>

        <a className="wedding-story-explore" href="#music-catalog">
          Explore the music <span aria-hidden="true">⟶</span>
        </a>
      </div>
    </section>
  );
}
