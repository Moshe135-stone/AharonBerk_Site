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
      <div className="entry-image entry-image-wedding" aria-hidden="true">
        <img
          src="/entry/wedding-canopy.png"
          alt=""
          width="1536"
          height="1024"
          fetchPriority="high"
        />
      </div>
      <div className="entry-image entry-image-music" aria-hidden="true">
        <img
          src="/entry/stacked-vinyl.png"
          alt=""
          width="1536"
          height="1024"
        />
      </div>
      <div className="entry-vignette" aria-hidden="true" />

      <a className="entry-monogram" href="/" aria-label="Aharon Berk home">
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
