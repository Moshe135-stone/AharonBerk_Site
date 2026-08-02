"use client";

import { useEffect } from "react";

export function SongTickerBehavior() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".song-ticker-stage");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!section || !footer) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const supportsScrollEnd = "onscrollend" in window;
    let idleTimer = 0;
    let releaseTimer = 0;
    let frame = 0;
    let lastScrollY = window.scrollY;
    let snapping = false;

    const sectionHasEntered = () => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight - 2 && rect.bottom > 0;
    };

    const snapBack = () => {
      section.removeAttribute("data-scrolling");
      if (snapping) return;

      const target =
        window.scrollY +
        footer.getBoundingClientRect().bottom -
        window.innerHeight;

      snapping = true;
      window.scrollTo({
        top: Math.max(0, target),
        behavior: reducedMotion ? "auto" : "smooth",
      });
      releaseTimer = window.setTimeout(
        () => {
          snapping = false;
          lastScrollY = window.scrollY;
        },
        reducedMotion ? 0 : 650,
      );
    };

    const revealWhileScrolling = () => {
      if (snapping || !sectionHasEntered()) return;
      section.setAttribute("data-scrolling", "");
      window.clearTimeout(idleTimer);
      if (!supportsScrollEnd) {
        idleTimer = window.setTimeout(snapBack, 850);
      }
    };

    const handleScrollEnd = () => {
      if (
        snapping ||
        !sectionHasEntered() ||
        !section.hasAttribute("data-scrolling")
      ) {
        return;
      }
      snapBack();
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const currentScrollY = window.scrollY;
        if (!snapping && currentScrollY > lastScrollY) {
          revealWhileScrolling();
        }
        lastScrollY = currentScrollY;
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) revealWhileScrolling();
    };

    const handleTouchMove = () => revealWhileScrolling();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    if (supportsScrollEnd) {
      window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      if (supportsScrollEnd) {
        window.removeEventListener("scrollend", handleScrollEnd);
      }
      window.clearTimeout(idleTimer);
      window.clearTimeout(releaseTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
