"use client";

import { useEffect, useRef } from "react";

export function ScrollHero() {
  const stageRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const startPaintReveal = () => {
    stickyRef.current?.setAttribute("data-painted", "");
  };

  useEffect(() => {
    // A cached image can finish loading before hydration, so onLoad never fires.
    if (heroImageRef.current?.complete) startPaintReveal();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    let stageTop = 0;
    let travel = 1;
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

      stage.style.setProperty("--hero-progress", progress.toFixed(4));
      stage.style.setProperty(
        "--hero-image-shift",
        `${imageShift.toFixed(1)}px`,
      );
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
      <header className="site-header">
        <nav className="hero-nav hero-nav-left" aria-label="Music navigation">
          <a href="#music">
            <span>Music</span>
          </a>
          <a href="#weddings">
            <span>Weddings</span>
          </a>
        </nav>

        <a
          className="animated-wordmark"
          href="#top"
          aria-label="Aharon Berk home"
        >
          <img src="/brand/aharon.svg" alt="" width="497" height="93" />
          <img src="/brand/berk.svg" alt="" width="297" height="93" />
        </a>

        <nav
          className="hero-nav hero-nav-right"
          aria-label="Information navigation"
        >
          <a href="#about">
            <span>About</span>
          </a>
          <a href="#contact">
            <span>Contact</span>
          </a>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#music">Music</a>
            <a href="#weddings">Weddings</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
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

        <p className="hero-kicker">
          Singer · Recording artist · Live performer
        </p>
        <p className="scroll-cue" aria-hidden="true">
          Scroll to explore <span />
        </p>
      </div>
    </section>
  );
}
