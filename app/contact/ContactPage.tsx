"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  enquiryType: string;
  date: string;
  location: string;
  message: string;
};

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  enquiryType: "Wedding",
  date: "",
  location: "",
  message: "",
};

const contactEmail = "aharon@azamra.co.za";
const whatsappNumber = "27722185278";
const turnstileSiteKey = "0x4AAAAAAEmRNTeVgEHO6sSO";

type TurnstileRenderOptions = {
  sitekey: string;
  size?: "invisible" | "normal" | "compact" | "flexible";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function buildMessage(values: ContactFormValues) {
  return [
    "Hi, Aharon,",
    "",
    `I would like to inquire about a ${values.enquiryType.toLowerCase()}.`,
    `Date: ${values.date || ""}`,
    `City / country: ${values.location || ""}`,
    `Message: ${values.message || ""}`,
    "",
    `Name: ${values.name || ""}`,
    `Phone: ${values.phone || ""}`,
    `Email: ${values.email || ""}`,
  ].join("\n");
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [values, setValues] = useState(initialValues);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [turnstileToken, setTurnstileToken] = useState("");

  const inquiryMessage = useMemo(() => buildMessage(values), [values]);
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `${values.enquiryType} inquiry`,
  )}&body=${encodeURIComponent(inquiryMessage)}`;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    inquiryMessage,
  )}`;

  useEffect(() => {
    const page = pageRef.current;
    const image = imageRef.current;
    if (!page || !image) return;

    let revealTimer = 0;
    let formTimer = 0;

    const revealBackground = () => {
      if (page.hasAttribute("data-contact-painted")) return;
      page.setAttribute("data-contact-painted", "");
      revealTimer = window.setTimeout(() => {
        page.setAttribute("data-contact-reveal-done", "");
      }, 2600);
    };

    if (image.complete) revealBackground();
    image.addEventListener("load", revealBackground);
    formTimer = window.setTimeout(() => {
      page.setAttribute("data-contact-form-visible", "");
    }, 520);

    return () => {
      image.removeEventListener("load", revealBackground);
      window.clearTimeout(revealTimer);
      window.clearTimeout(formTimer);
    };
  }, []);

  useEffect(() => {
    const scriptId = "cf-turnstile-script";

    const renderWidget = () => {
      const container = turnstileRef.current;
      if (!container || !window.turnstile || turnstileWidgetId.current) return;
      turnstileWidgetId.current = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        size: "invisible",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", renderWidget);

    return () => {
      script?.removeEventListener("load", renderWidget);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const updateValue = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!turnstileToken) return;
    setSubmitStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          page_url: window.location.href,
          channel: "website",
          turnstileToken,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
      setValues(initialValues);
    } catch {
      setSubmitStatus("error");
    } finally {
      setTurnstileToken("");
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    }
  };

  return (
    <main className="contact-page" ref={pageRef}>
      <header className="site-header contact-page-header">
        <nav className="hero-nav hero-nav-left" aria-label="Primary navigation">
          <a href="/music">
            <span>Music</span>
          </a>
          <a href="/weddings">
            <span>Weddings</span>
          </a>
        </nav>

        <div className="hero-brand">
          <a className="animated-wordmark" href="/home" aria-label="Aharon Berk home">
            <img src="/brand/aharon.svg" alt="" width="497" height="93" />
            <img src="/brand/berk.svg" alt="" width="297" height="93" />
          </a>
        </div>

        <nav className="hero-nav hero-nav-right" aria-label="Home navigation">
          <a href="/home">
            <span>Home</span>
          </a>
        </nav>

        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary aria-label="Toggle navigation">
            <span className="mobile-menu-open">Menu</span>
            <span className="mobile-menu-close">Close</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            onClick={() => mobileMenuRef.current?.removeAttribute("open")}
          >
            <a href="/home">Home</a>
            <a href="/music">Music</a>
            <a href="/weddings">Weddings</a>
          </nav>
        </details>
      </header>

      <picture className="contact-page-picture" aria-hidden="true">
        <img
          src="/contact/aharon-wedding-1.png"
          alt=""
          width="1280"
          height="853"
          fetchPriority="high"
          ref={imageRef}
        />
      </picture>
      <div className="contact-page-shade" aria-hidden="true" />

      <form className="contact-page-form" onSubmit={submitForm}>
        <div className="contact-form-details">
          <label className="contact-form-field" style={{ "--field-order": 0 } as CSSProperties}>
            <span>Name</span>
            <input
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
            />
          </label>
          <label className="contact-form-field" style={{ "--field-order": 1 } as CSSProperties}>
            <span>Phone</span>
            <input
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
            />
          </label>
          <label className="contact-form-field" style={{ "--field-order": 2 } as CSSProperties}>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
            />
          </label>
          <label className="contact-form-field" style={{ "--field-order": 3 } as CSSProperties}>
            <span>Enquiry type</span>
            <select
              value={values.enquiryType}
              onChange={(event) => updateValue("enquiryType", event.target.value)}
            >
              <option>Wedding</option>
              <option>Performance</option>
              <option>Other</option>
            </select>
          </label>
          <label className="contact-form-field" style={{ "--field-order": 4 } as CSSProperties}>
            <span>Date</span>
            <input
              type="date"
              value={values.date}
              onInput={(event) =>
                updateValue("date", (event.target as HTMLInputElement).value)
              }
            />
          </label>
          <label className="contact-form-field" style={{ "--field-order": 5 } as CSSProperties}>
            <span>City / country</span>
            <input
              type="text"
              autoComplete="country-name"
              value={values.location}
              onChange={(event) => updateValue("location", event.target.value)}
            />
          </label>
        </div>

        <div className="contact-form-message">
          {submitStatus === "success" ? (
            <div className="contact-form-success" role="status" aria-live="polite">
              <span className="contact-form-success-mark" aria-hidden="true" />
              <p>Thank you for your submission. Aharon&apos;s team will be in touch with you.</p>
            </div>
          ) : (
            <>
              <label>
                <span>Message</span>
                <textarea
                  rows={8}
                  value={values.message}
                  onChange={(event) => updateValue("message", event.target.value)}
                />
              </label>
              <div ref={turnstileRef} aria-hidden="true" />
              <button
                type="submit"
                disabled={submitStatus === "submitting" || !turnstileToken}
              >
                {submitStatus === "submitting" ? "Sending…" : "Submit"}{" "}
                <span aria-hidden="true" />
              </button>
              {submitStatus === "error" ? (
                <p className="contact-form-status" data-status="error" role="alert">
                  Something went wrong sending your message. Please try WhatsApp or email below.
                </p>
              ) : null}
            </>
          )}
        </div>

        <nav className="contact-form-alternates" aria-label="Other ways to contact Aharon">
          <span>Or contact us on</span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Send this inquiry on WhatsApp"
          >
            <img src="/contact/whatsapp-icon.svg" alt="" />
          </a>
          <a href={emailHref} aria-label="Send this inquiry by email">
            <img src="/contact/email.svg" alt="" />
          </a>
        </nav>
      </form>
    </main>
  );
}
