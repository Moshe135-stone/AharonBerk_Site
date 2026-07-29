import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Aharon Berk",
  description: "The music of Aharon Berk. Full page coming soon.",
};

export default function MusicPage() {
  return (
    <main className="music-coming-soon">
      <a className="entry-monogram" href="/" aria-label="Return home">
        <img
          src="/brand/ab-monogram.svg"
          alt=""
          width="270"
          height="156"
        />
      </a>
      <div>
        <p>Original music</p>
        <h1>Music page coming soon.</h1>
        <a href="/">Return to the entrance</a>
      </div>
    </main>
  );
}
