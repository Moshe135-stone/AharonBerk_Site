"use client";

import { useEffect, useRef, useState } from "react";

const weddingVideo = "/weddings/videos/HORAS_1_v4.mp4";

const services = [
  {
    id: "chuppa",
    title: "Chuppa",
    image: "/weddings/chuppa.jpg",
    imageAlt: "Aharon Berk singing with musicians beneath a wedding canopy",
    description:
      "Each Chuppa is planned around the couple, the ceremony and the atmosphere they want to create. The core setup includes Aharon on vocals, piano or keyboard, professional sound and a sound engineer. Violin, cello, acoustic guitar, flute, saxophone, percussion, a string ensemble and custom arrangements are available by request.",
  },
  {
    id: "horas-reception",
    title: "Horas & Reception",
    image: "/weddings/horas-reception.jpg",
    imageAlt: "Azamra performing live at a wedding reception",
    description:
      "Azamra offers a full live band for Horas and wedding receptions, with a sound and lineup tailored to the venue and celebration. Additional instruments such as brass or electric violin can be included where appropriate.",
  },
  {
    id: "seamless-experience",
    title: "One seamless musical experience",
    image: "/weddings/seamless-experience.jpg",
    imageAlt: "Aharon Berk singing at an outdoor wedding",
    description:
      "For couples booking more than one part of the wedding, Azamra can carry the music from the Chuppa into cocktails, the Hora and reception, with one coordinated team and sound setup.",
  },
] as const;

function WeddingsHeader() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  return (
    <header className="site-header weddings-page-header" data-socials-visible>
      <nav className="hero-nav hero-nav-left" aria-label="Primary navigation">
        <a href="/home"><span>Home</span></a>
        <a href="/music"><span>Music</span></a>
      </nav>

      <div className="hero-brand">
        <a className="animated-wordmark" href="/home" aria-label="Aharon Berk home">
          <img src="/brand/aharon.svg" alt="" width="497" height="93" />
          <img src="/brand/berk.svg" alt="" width="297" height="93" />
        </a>

        <nav className="hero-socials" aria-label="Aharon Berk on social media">
          <a href="https://www.youtube.com/channel/UCxAJ-494ZAh1azhFI_j0Krw" target="_blank" rel="noreferrer" aria-label="YouTube"><img src="/social/youtube.svg" alt="" width="24" height="24" /></a>
          <a href="https://www.facebook.com/AharonBerk" target="_blank" rel="noreferrer" aria-label="Facebook"><img src="/social/facebook.svg" alt="" width="24" height="24" /></a>
          <a href="https://www.instagram.com/aharonberk/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="/social/instagram.svg" alt="" width="24" height="24" /></a>
          <a href="https://music.apple.com/us/artist/aharon-berk/1521973943" target="_blank" rel="noreferrer" aria-label="Apple Music"><img src="/social/apple-music.svg" alt="" width="24" height="24" /></a>
          <a href="https://open.spotify.com/artist/2on0c6iQBHGTIn30q7te5Q?si=aBw6EiUFRPaoa9M0yfujMQ" target="_blank" rel="noreferrer" aria-label="Spotify"><img src="/social/spotify.svg" alt="" width="24" height="24" /></a>
        </nav>
      </div>

      <nav className="hero-nav hero-nav-right" aria-label="Information navigation">
        <a href="/contact"><span>Contact Us</span></a>
      </nav>

      <details className="mobile-menu" ref={mobileMenuRef}>
        <summary aria-label="Toggle navigation">
          <span className="mobile-menu-open">Menu</span>
          <span className="mobile-menu-close">Close</span>
        </summary>
        <nav aria-label="Mobile navigation" onClick={() => mobileMenuRef.current?.removeAttribute("open")}>
          <a href="/home">Home</a>
          <a href="/music">Music</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </details>
    </header>
  );
}

export function WeddingsPage() {
  const [openService, setOpenService] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const header = page?.querySelector<HTMLElement>(".weddings-page-header");
    if (!page || !header) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight * 3.2, 1)));
      page.style.setProperty("--hero-progress", progress.toFixed(4));
      header.toggleAttribute("data-socials-visible", window.scrollY <= 8);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toggleSound = () => {
    const nextSoundState = !soundEnabled;
    setSoundEnabled(nextSoundState);
    if (filmVideoRef.current) {
      filmVideoRef.current.muted = !nextSoundState;
      void filmVideoRef.current.play();
    }
  };

  return (
    <div className="weddings-page-content" ref={pageRef}>
      <WeddingsHeader />

      <section className="weddings-hero" id="top" aria-labelledby="weddings-title">
        <img className="weddings-hero-image" src="/weddings/wedding-image-3.png" alt="Aharon Berk and Azamra performing at a wedding" width="960" height="1280" fetchPriority="high" />
        <div className="weddings-hero-shade" aria-hidden="true" />
        <div className="weddings-hero-copy">
          <h1 id="weddings-title">Weddings</h1>
          <p>Aharon Berk and Azamra provide live music for Chuppas, Horas and receptions. The aim is simple: music that feels meaningful, joyful and professionally handled from beginning to end.</p>
          <a className="weddings-availability" href="/contact">Check availability<span aria-hidden="true" /></a>
        </div>
      </section>

      <section className="weddings-film-stage" aria-labelledby="weddings-film-title">
        <div className="weddings-film-copy">
          <p className="weddings-film-kicker">Aharon Berk × Azamra</p>
          <h2 id="weddings-film-title">Hear the room come alive.</h2>
        </div>
        <div className="weddings-canopy-player">
          <video
            ref={filmVideoRef}
            src={weddingVideo}
            muted={!soundEnabled}
            loop
            playsInline
            autoPlay
            preload="metadata"
          />
          <button
            className="weddings-sound-toggle"
            type="button"
            aria-pressed={soundEnabled}
            onClick={toggleSound}
          >
            <span aria-hidden="true" />
            {soundEnabled ? "Sound on" : "Turn sound on"}
          </button>
        </div>
      </section>

      <section className="weddings-services" aria-labelledby="wedding-services-title">
        <p className="weddings-services-kicker">The full celebration</p>
        <h2 id="wedding-services-title">One band. Every moment.</h2>
        <div className="weddings-accordion">
          {services.map((service, index) => {
            const isOpen = openService === service.id;
            return (
              <article className="weddings-service" data-open={isOpen ? "" : undefined} key={service.id}>
                <button type="button" aria-expanded={isOpen} aria-controls={`${service.id}-panel`} onClick={() => setOpenService(isOpen ? null : service.id)}>
                  <span className="weddings-service-index">0{index + 1}</span>
                  <span className="weddings-service-title">{service.title}</span>
                  <span className="weddings-service-toggle" aria-hidden="true" />
                </button>
                <div className="weddings-service-panel" id={`${service.id}-panel`} aria-hidden={!isOpen}>
                  <div>
                    <div className="weddings-service-media">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                      />
                      <div className="weddings-service-overlay">
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="weddings-cta">
        <p>Planning your celebration?</p>
        <a href="/contact">Check availability<span aria-hidden="true" /></a>
      </section>
    </div>
  );
}
