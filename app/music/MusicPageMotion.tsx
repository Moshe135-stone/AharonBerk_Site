"use client";

import { useEffect, useRef } from "react";

export function MusicPageMotion() {
  const pageRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".music-page");
    const header = document.querySelector<HTMLElement>(".music-page-header");
    const feature = document.querySelector<HTMLElement>(".music-page-feature");
    const artworkCursor = cursorRef.current;
    if (!page || !header || !feature || !artworkCursor) return;

    pageRef.current = page;
    let frame = 0;
    let armFrame = 0;

    const updateHeader = () => {
      frame = 0;
      const travel = Math.max(window.innerHeight * 3.2, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / travel));
      page.style.setProperty("--hero-progress", progress.toFixed(4));
      header.toggleAttribute("data-socials-visible", window.scrollY <= 8);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    feature.setAttribute("data-motion-ready", "");
    armFrame = window.requestAnimationFrame(() => {
      armFrame = window.requestAnimationFrame(() => {
        feature.setAttribute("data-motion-armed", "");
      });
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        feature.setAttribute("data-in-view", "");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(feature);

    const cursorImage = artworkCursor.querySelector<HTMLImageElement>("img");
    const releaseRows = document.querySelectorAll<HTMLElement>(
      ".music-page-release[data-cursor-artwork]",
    );
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const moveArtworkCursor = (event: MouseEvent) => {
      artworkCursor.style.setProperty("--cursor-x", `${event.clientX + 24}px`);
      artworkCursor.style.setProperty("--cursor-y", `${event.clientY + 24}px`);
    };

    const showArtworkCursor = (event: MouseEvent) => {
      if (!finePointer.matches || !cursorImage) return;
      const row = event.currentTarget as HTMLElement;
      const artwork = row.dataset.cursorArtwork;
      if (!artwork) return;

      cursorImage.src = artwork;
      row.setAttribute("data-artwork-hover", "");
      artworkCursor.setAttribute("data-visible", "");
      moveArtworkCursor(event);
    };

    const hideArtworkCursor = (event: MouseEvent) => {
      (event.currentTarget as HTMLElement).removeAttribute("data-artwork-hover");
      artworkCursor.removeAttribute("data-visible");
    };

    releaseRows.forEach((row) => {
      row.addEventListener("mouseenter", showArtworkCursor);
      row.addEventListener("mousemove", moveArtworkCursor);
      row.addEventListener("mouseleave", hideArtworkCursor);
    });

    updateHeader();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      releaseRows.forEach((row) => {
        row.removeEventListener("mouseenter", showArtworkCursor);
        row.removeEventListener("mousemove", moveArtworkCursor);
        row.removeEventListener("mouseleave", hideArtworkCursor);
      });
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      if (armFrame) window.cancelAnimationFrame(armFrame);
    };
  }, []);

  return (
    <div className="release-artwork-cursor" aria-hidden="true" ref={cursorRef}>
      <img src="/music/covers/tefilas-hashla.webp" alt="" />
    </div>
  );
}

export function MusicPageHeader() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  return (
    <header className="site-header music-page-header">
      <nav className="hero-nav hero-nav-left" aria-label="Wedding navigation">
        <a href="/weddings">
          <span>Weddings</span>
        </a>
      </nav>

      <div className="hero-brand">
        <a className="animated-wordmark" href="/home" aria-label="Aharon Berk home">
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

      <nav className="hero-nav hero-nav-right" aria-label="Information navigation">
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
          <a href="/weddings">Weddings</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </details>
    </header>
  );
}
