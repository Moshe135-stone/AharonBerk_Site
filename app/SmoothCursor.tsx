"use client";

import { useEffect, useRef } from "react";

const trailLength = 7;

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const cursor = cursorRef.current;

    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    const dots = Array.from(
      cursor.querySelectorAll<HTMLElement>(".smooth-cursor-dot"),
    );
    const points = dots.map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    const target = { ...points[0] };
    let frame = 0;
    let hasPosition = false;

    document.documentElement.classList.add("has-smooth-cursor");

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!hasPosition) {
        points.forEach((point) => {
          point.x = target.x;
          point.y = target.y;
        });
        cursor.setAttribute("data-visible", "");
        hasPosition = true;
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const element =
        event.target instanceof Element ? event.target : undefined;
      cursor.toggleAttribute(
        "data-light-surface",
        Boolean(element?.closest(".wedding-story")),
      );
      cursor.toggleAttribute(
        "data-hover",
        Boolean(
          element?.closest(
            "a, button, summary, input, select, textarea, [role='button']",
          ),
        ),
      );
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        cursor.removeAttribute("data-visible");
        cursor.removeAttribute("data-hover");
        cursor.removeAttribute("data-light-surface");
        hasPosition = false;
      }
    };

    const animate = () => {
      let leader = target;

      points.forEach((point, index) => {
        const easing = index === 0 ? 0.34 : 0.3;
        point.x += (leader.x - point.x) * easing;
        point.y += (leader.y - point.y) * easing;
        dots[index].style.transform =
          `translate3d(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px, 0) ` +
          "translate(-50%, -50%)";
        leader = point;
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut, {
      passive: true,
    });
    frame = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("has-smooth-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="smooth-cursor" aria-hidden="true" ref={cursorRef}>
      {Array.from({ length: trailLength }, (_, index) => (
        <span className="smooth-cursor-dot" key={index} />
      ))}
    </div>
  );
}
