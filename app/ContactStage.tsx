"use client";

import { useEffect, useRef } from "react";

const contactWords = ["Get", "in", "touch"];

export function ContactStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visibleWordCountRef = useRef(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;

    if (!section || !image || !title) return;

    const words = title.querySelectorAll<HTMLElement>(".contact-stage-word");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let revealTimer = 0;

    const startPaintReveal = () => {
      if (
        section.hasAttribute("data-contact-painted") ||
        section.getBoundingClientRect().top > window.innerHeight * 0.84
      ) {
        return;
      }

      section.setAttribute("data-contact-painted", "");
      revealTimer = window.setTimeout(() => {
        section.setAttribute("data-contact-reveal-done", "");
      }, 2600);
    };

    const update = () => {
      animationFrame = 0;
      const rect = section.getBoundingClientRect();
      const revealStart = window.innerHeight * 0.86;
      const revealEnd = window.innerHeight * 0.42;
      const progress = reducedMotion
        ? 1
        : Math.min(
            1,
            Math.max(0, (revealStart - rect.top) / (revealStart - revealEnd)),
          );
      const visibleWordCount = reducedMotion
        ? contactWords.length
        : Math.floor(progress * (contactWords.length + 1));

      if (image.complete) startPaintReveal();

      if (visibleWordCount !== visibleWordCountRef.current) {
        words.forEach((word, index) => {
          word.classList.toggle("is-visible", index < visibleWordCount);
        });
        visibleWordCountRef.current = visibleWordCount;
      }

      section.toggleAttribute(
        "data-contact-actions-visible",
        reducedMotion || progress >= 0.72,
      );
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    update();
    image.addEventListener("load", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      image.removeEventListener("load", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section className="contact-stage" id="contact" ref={sectionRef}>
      <picture className="contact-stage-picture" aria-hidden="true">
        <source srcSet="/contact/contact-black.webp" type="image/webp" />
        <img
          src="/contact/contact-black.jpg"
          alt=""
          loading="lazy"
          width="2560"
          height="1526"
          ref={imageRef}
        />
      </picture>

      <div className="contact-stage-shade" aria-hidden="true" />

      <h2
        className="contact-stage-title"
        aria-label="Get in touch"
        ref={titleRef}
      >
        <span className="contact-stage-line" aria-hidden="true">
          <span className="contact-stage-word">Get</span>{" "}
          <span className="contact-stage-word">in</span>
        </span>
        <span className="contact-stage-line" aria-hidden="true">
          <span className="contact-stage-word">touch</span>
        </span>
      </h2>

      <nav className="contact-stage-actions" aria-label="Contact Aharon Berk">
        <a
          className="contact-stage-whatsapp"
          href="https://api.whatsapp.com/send?phone=27722185278"
          target="_blank"
          rel="noreferrer"
          aria-label="Message Aharon on WhatsApp"
        >
          <img src="/contact/whatsapp-icon.svg" alt="" />
        </a>
        <a
          className="contact-stage-email"
          href="mailto:aharon@azamra.co.za"
          aria-label="Email Aharon at aharon@azamra.co.za"
        >
          <img src="/contact/email.svg" alt="" />
        </a>
      </nav>
    </section>
  );
}
