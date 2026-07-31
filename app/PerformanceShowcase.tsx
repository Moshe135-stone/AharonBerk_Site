"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent,
  type UIEvent,
  type WheelEvent,
} from "react";

type PerformanceItem = {
  id: string;
  title: string;
  date: string;
  image: string;
  position?: string;
};

const performances: PerformanceItem[] = [
  {
    id: "friedman-bach",
    title: "Friedman & Bach wedding",
    date: "2/3/26",
    image: "/performance/friedman-bach.webp",
    position: "50% 42%",
  },
  {
    id: "yeshiva-college",
    title: "Yeshiva College event",
    date: "11/3/25",
    image: "/performance/yeshiva-college.webp",
    position: "50% 44%",
  },
  {
    id: "maharsha",
    title: "Maharsha",
    date: "11/3/25",
    image: "/performance/maharsha.webp",
    position: "50% 50%",
  },
  {
    id: "sukkos-578",
    title: "Sukkos 578",
    date: "11/3/25",
    image: "/performance/sukkos-578.webp",
    position: "50% 44%",
  },
];

export function PerformanceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const revealTimelineFromPointer = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const revealDepth = Math.min(bounds.height * 0.24, 210);
      setTimelineVisible(event.clientY >= bounds.bottom - revealDepth);
    },
    [],
  );

  const syncActiveItem = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      const track = event.currentTarget;
      scrollFrameRef.current = requestAnimationFrame(() => {
        const trackBounds = track.getBoundingClientRect();
        const trackCenter = trackBounds.left + trackBounds.width / 2;
        const cards = Array.from(
          track.querySelectorAll<HTMLElement>("[data-performance-index]"),
        );

        let closestIndex = activeIndex;
        let closestDistance = Number.POSITIVE_INFINITY;

        for (const card of cards) {
          const cardBounds = card.getBoundingClientRect();
          const distance = Math.abs(
            cardBounds.left + cardBounds.width / 2 - trackCenter,
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = Number(card.dataset.performanceIndex);
          }
        }

        setActiveIndex(closestIndex);
        scrollFrameRef.current = null;
      });
    },
    [activeIndex],
  );

  const translateWheelToTimeline = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const track = timelineRef.current;
      if (!track) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (Math.abs(delta) < 1) return;

      const movingTowardStart = delta < 0 && track.scrollLeft > 0;
      const movingTowardEnd =
        delta > 0 &&
        track.scrollLeft < track.scrollWidth - track.clientWidth - 1;

      if (movingTowardStart || movingTowardEnd) {
        event.preventDefault();
        track.scrollLeft += delta;
      }
    },
    [],
  );

  return (
    <section
      className="performance-showcase"
      id="performances"
      data-timeline-visible={timelineVisible ? "true" : "false"}
      onPointerMove={revealTimelineFromPointer}
      onPointerLeave={() => setTimelineVisible(true)}
    >
      <div className="performance-media" aria-hidden="true">
        {performances.map((performance, index) => (
          <img
            key={performance.id}
            className={index === activeIndex ? "is-active" : ""}
            src={performance.image}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            style={{ objectPosition: performance.position }}
          />
        ))}
      </div>

      <div className="performance-shade" aria-hidden="true" />

      <h2 className="performance-title">
        Watch Aharon
        <br />
        perform
      </h2>

      <a className="performance-watch-more" href="#performance-timeline">
        Watch more <span aria-hidden="true">→</span>
      </a>

      <div
        className="performance-timeline-reveal-zone"
        aria-hidden="true"
        onPointerEnter={() => setTimelineVisible(true)}
      />

      <div
        className="performance-timeline"
        id="performance-timeline"
        onPointerEnter={() => setTimelineVisible(true)}
        onWheel={translateWheelToTimeline}
      >
        <div
          className="performance-timeline-track"
          ref={timelineRef}
          onScroll={syncActiveItem}
          aria-label="Performance videos"
        >
          {performances.map((performance, index) => (
            <button
              className={`performance-timeline-item ${
                index === activeIndex ? "is-active" : ""
              }`}
              type="button"
              key={performance.id}
              data-performance-index={index}
              aria-pressed={index === activeIndex}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <span className="performance-item-title">
                {performance.title}
              </span>
              <span className="performance-item-date">{performance.date}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
