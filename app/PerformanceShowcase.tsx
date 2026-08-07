"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent,
  type UIEvent,
  type WheelEvent,
} from "react";

export type PerformanceItem = {
  id: string;
  title: string;
  duration: string;
  image: string;
  url: string;
  position?: string;
};

export type WatchPageCopy = {
  heading: string;
  watchMoreLabel: string;
  watchMoreUrl: string;
};

const defaultWatchPageCopy: WatchPageCopy = {
  heading: "Watch Aharon perform",
  watchMoreLabel: "Watch more",
  watchMoreUrl: "https://www.youtube.com/@aharonberkmusic/videos",
};

export function PerformanceShowcase({
  performances,
  watchPage = defaultWatchPageCopy,
}: {
  performances: PerformanceItem[];
  watchPage?: WatchPageCopy;
}) {
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
          <span
            key={performance.id}
            className={`performance-media-fill ${
              index === activeIndex ? "is-active" : ""
            }`}
            style={{
              backgroundImage: `url("${performance.image}")`,
              backgroundPosition: performance.position ?? "center",
            }}
          />
        ))}
      </div>

      <div className="performance-shade" aria-hidden="true" />

      <h2 className="performance-title site-h1-style">{watchPage.heading}</h2>

      <a
        className="performance-watch-more"
        href={watchPage.watchMoreUrl}
        target="_blank"
        rel="noreferrer"
      >
        {watchPage.watchMoreLabel} <span aria-hidden="true">→</span>
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
            <a
              className={`performance-timeline-item ${
                index === activeIndex ? "is-active" : ""
              }`}
              href={performance.url}
              target="_blank"
              rel="noreferrer"
              key={performance.id}
              data-performance-index={index}
              aria-label={`Watch ${performance.title} on YouTube`}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className="performance-item-title">
                {performance.title}
              </span>
              <span className="performance-item-date">
                {performance.duration}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
