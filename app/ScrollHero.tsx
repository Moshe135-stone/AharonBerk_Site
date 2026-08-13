"use client";

import { useEffect, useRef } from "react";

const heroIntroduction =
  "Aharon Berk is a Jewish singer, recording artist, and live performer, creating original music and performing at weddings, concerts, and special events.";
const heroIntroductionWords = heroIntroduction.split(" ");

export function ScrollHero() {
  const stageRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const visibleWordCountRef = useRef(-1);

  const startPaintReveal = () => {
    const sticky = stickyRef.current;
    if (!sticky || sticky.hasAttribute("data-painted")) return;

    sticky.setAttribute("data-painted", "");

    // Tear the curtain layer down once it has swept off screen. animationend
    // from a pseudo-element is not reliable everywhere, so time it out instead.
    window.setTimeout(() => {
      sticky.setAttribute("data-reveal-done", "");
    }, 2600);
  };

  useEffect(() => {
    // A cached image can finish loading before hydration, so onLoad never fires.
    if (heroImageRef.current?.complete) startPaintReveal();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const header = headerRef.current;
    if (!stage || !header) return;

    let frame = 0;
    let stageTop = 0;
    let travel = 1;
    const introductionWords =
      introRef.current?.querySelectorAll<HTMLElement>(".hero-intro-word");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isWebKit =
      /AppleWebKit/i.test(navigator.userAgent) &&
      !/(Chrome|Chromium|Edg|OPR|Android)/i.test(navigator.userAgent);

    if (isWebKit) stage.setAttribute("data-webkit", "");

    const measure = () => {
      stageTop = stage.offsetTop;
      travel = Math.max(stage.offsetHeight - window.innerHeight, 1);
    };

    const updateProgress = () => {
      frame = 0;
      const progress = reducedMotion
        ? 0
        : Math.min(1, Math.max(0, (window.scrollY - stageTop) / travel));
      const mobile = window.innerWidth <= 900;
      const imageShift = reducedMotion
        ? 0
        : -progress * window.innerHeight * (mobile ? 0.12 : 0.14);
      const introductionProgress = Math.min(
        1,
        Math.max(0, (progress - 0.05) / 0.3),
      );
      const introductionExit = Math.min(
        1,
        Math.max(0, (progress - 0.4) / 0.1),
      );
      const visibleWordCount = reducedMotion
        ? heroIntroductionWords.length
        : Math.floor(
            introductionProgress * (heroIntroductionWords.length + 1),
          );

      stage.style.setProperty("--hero-progress", progress.toFixed(4));
      stage.style.setProperty(
        "--hero-intro-exit",
        reducedMotion ? "0" : introductionExit.toFixed(4),
      );
      stage.style.setProperty(
        "--hero-image-shift",
        `${imageShift.toFixed(1)}px`,
      );

      const atPageOpening = window.scrollY <= stageTop + 8;
      header.toggleAttribute("data-socials-visible", atPageOpening);

      if (
        introductionWords &&
        visibleWordCount !== visibleWordCountRef.current
      ) {
        introductionWords.forEach((word, index) => {
          word.classList.toggle("is-visible", index < visibleWordCount);
        });
        visibleWordCountRef.current = visibleWordCount;
      }

    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const handleResize = () => {
      measure();
      requestUpdate();
    };

    measure();
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-scroll-stage" id="top" ref={stageRef}>
      <header className="site-header" ref={headerRef}>
        <nav className="hero-nav hero-nav-left" aria-label="Music navigation">
          <a href="/music">
            <span>Music</span>
          </a>
          <a href="/weddings">
            <span>Weddings</span>
          </a>
        </nav>

        <div className="hero-brand">
          <a
            className="animated-wordmark"
            href="#top"
            aria-label="Aharon Berk home"
          >
            <img src="/brand/aharon.svg" alt="" width="497" height="93" />
            <img src="/brand/berk.svg" alt="" width="297" height="93" />
          </a>

          <nav className="hero-socials" aria-label="Aharon Berk on social media">
            <a
              href="https://www.youtube.com/channel/UCxAJ-494ZAh1azhFI_j0Krw"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <img src="/social/youtube.svg" alt="" width="24" height="24" />
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
              href="https://www.instagram.com/aharonberk/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src="/social/instagram.svg" alt="" width="24" height="24" />
            </a>
            <a
              href="https://music.apple.com/us/artist/aharon-berk/1521973943"
              target="_blank"
              rel="noreferrer"
              aria-label="Apple Music"
            >
              <img src="/social/apple-music.svg" alt="" width="24" height="24" />
            </a>
            <a
              href="https://open.spotify.com/artist/2on0c6iQBHGTIn30q7te5Q?si=aBw6EiUFRPaoa9M0yfujMQ"
              target="_blank"
              rel="noreferrer"
              aria-label="Spotify"
            >
              <img src="/social/spotify.svg" alt="" width="24" height="24" />
            </a>
          </nav>
        </div>

        <nav
          className="hero-nav hero-nav-right"
          aria-label="Information navigation"
        >
          <a href="/contact">
            <span>Contact Us</span>
          </a>
        </nav>

        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary aria-label="Toggle navigation">
            <span className="mobile-menu-open">Menu</span>
            <span className="mobile-menu-close">Close</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            onClick={() => mobileMenuRef.current?.removeAttribute("open")}
          >
            <a href="/music">Music</a>
            <a href="/weddings">Weddings</a>
            <a href="/contact">Contact Us</a>
          </nav>
        </details>
      </header>

      <div className="hero-sticky" ref={stickyRef}>
        <picture className="hero-picture">
          <source
            media="(max-width: 900px)"
            srcSet="/brand/aharon-berk-singing-1-mobile.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 900px)"
            srcSet="/brand/aharon-berk-singing-1-mobile.jpg"
            type="image/jpeg"
          />
          <source
            srcSet="/brand/aharon-berk-singing-1.webp"
            type="image/webp"
          />
          <img
            className="hero-background"
            src="/brand/aharon-berk-singing-1.jpg"
            alt="Aharon Berk singing into a microphone"
            width="1800"
            height="2700"
            decoding="async"
            fetchPriority="high"
            ref={heroImageRef}
            onLoad={startPaintReveal}
          />
        </picture>
        <div className="hero-shade" aria-hidden="true" />

        <p
          className="hero-intro"
          id="about"
          aria-label={heroIntroduction}
          ref={introRef}
        >
          {heroIntroductionWords.map((word, index) => (
            <span
              className="hero-intro-word"
              aria-hidden="true"
              key={`${word}-${index}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
