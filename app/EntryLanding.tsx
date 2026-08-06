"use client";

import { useState } from "react";

type EntryChoice = "weddings" | "music";

const choices: Array<{
  id: EntryChoice;
  href: string;
  label: string;
  description: string;
}> = [
  {
    id: "weddings",
    href: "/weddings",
    label: "Weddings",
    description: "Live music for Chuppas, Horas and receptions",
  },
  {
    id: "music",
    href: "/music",
    label: "Music",
    description: "Original releases and selected recordings",
  },
];

export function EntryLanding() {
  const [activeChoice, setActiveChoice] =
    useState<EntryChoice>("weddings");

  return (
    <main className="entry-landing" data-active={activeChoice}>
      <a
        className="entry-skip"
        href="/home"
        aria-label="Continue to the Aharon Berk home page"
      >
        <span>Enter site</span>
      </a>

      <div className="entry-image entry-image-wedding" aria-hidden="true">
        <picture>
          <source srcSet="/entry/aharon-image-6.webp" type="image/webp" />
          <img
            src="/entry/aharon-image-6.jpg"
            alt=""
            width="1600"
            height="1179"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="entry-image entry-image-music" aria-hidden="true">
        <picture>
          <source srcSet="/entry/aharon-image-5.webp" type="image/webp" />
          <img
            src="/entry/aharon-image-5.jpg"
            alt=""
            width="1600"
            height="1064"
            decoding="async"
          />
        </picture>
      </div>
      <div className="entry-vignette" aria-hidden="true" />

      <a className="entry-monogram" href="/home" aria-label="Aharon Berk home">
        <img
          src="/brand/ab-monogram.svg"
          alt=""
          width="270"
          height="156"
        />
      </a>

      <nav className="entry-choices" aria-label="Choose an experience">
        {choices.map((choice) => (
          <a
            className="entry-choice"
            data-choice={choice.id}
            href={choice.href}
            key={choice.id}
            onFocus={() => setActiveChoice(choice.id)}
            onPointerEnter={() => setActiveChoice(choice.id)}
          >
            <span className="entry-choice-label">{choice.label}</span>
            <span className="entry-choice-description">
              {choice.description}
            </span>
          </a>
        ))}
      </nav>

      <p className="entry-active-caption" aria-live="polite">
        {activeChoice === "weddings"
          ? "Aharon Berk & Azamra"
          : "Aharon Berk · Recording artist"}
      </p>
    </main>
  );
}
