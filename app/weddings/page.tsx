import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weddings | Aharon Berk",
  description:
    "The Aharon Berk and Azamra weddings page is currently under development.",
};

export default function WeddingsPage() {
  return (
    <main className="weddings-coming-soon">
      <a className="entry-monogram" href="/home" aria-label="Aharon Berk home">
        <img
          src="/brand/ab-monogram.svg"
          alt=""
          width="270"
          height="156"
        />
      </a>
      <div>
        <p>Aharon Berk × Azamra</p>
        <h1>Our weddings page is under development.</h1>
        <p className="coming-soon-note">
          We’re preparing a new home for Chuppas, Horas and celebrations.
        </p>
        <a href="/home">Continue to the home page</a>
      </div>
    </main>
  );
}
