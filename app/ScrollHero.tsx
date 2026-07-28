"use client";

import { useEffect, useRef } from "react";

export function ScrollHero() {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateProgress = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const travel = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const progress = reducedMotion
        ? 0
        : Math.min(1, Math.max(0, -rect.top / travel));

      stage.style.setProperty("--hero-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-scroll-stage" id="top" ref={stageRef}>
      <header className="site-header">
        <nav className="hero-nav hero-nav-left" aria-label="Music navigation">
          <a href="#music">Music</a>
          <a href="#weddings">Weddings</a>
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
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
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

      <div className="hero-sticky">
        <img
          className="hero-background"
          src="/brand/aharon-berk-singing-1.png"
          alt="Aharon Berk singing into a microphone"
          width="1800"
          height="2700"
          fetchPriority="high"
        />
        <div className="hero-shade" aria-hidden="true" />

        <p className="hero-kicker">Singer · Recording artist · Live performer</p>
        <p className="scroll-cue" aria-hidden="true">
          Scroll to explore <span />
        </p>
      </div>
    </section>
  );
}
