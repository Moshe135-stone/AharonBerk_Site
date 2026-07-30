import { ScrollHero } from "./ScrollHero";
import { MusicFeature } from "./MusicFeature";
import { ReleaseCarousel } from "./ReleaseCarousel";
import { musicReleases } from "./content/releases";

const weddingSteps = [
  ["01", "Send the date and venue", "Share the wedding date, venue and city or country."],
  ["02", "Discuss the right format", "Explore Chuppa, Hora, reception and musician options."],
  ["03", "Secure the booking", "Confirm the details, complete the booking form and deposit."],
  ["04", "Plan the music", "Finalise song choices and key musical moments together."],
];

const faqs = [
  {
    question: "Do you perform full weddings?",
    answer:
      "Yes. Azamra offers live music for Chuppas, Horas and wedding receptions, subject to availability and the requirements of the event.",
  },
  {
    question: "Can we choose our own Chuppa songs?",
    answer:
      "Yes. Couples may request meaningful songs, and Aharon can also guide the song choices and order.",
  },
  {
    question: "Can we add additional musicians?",
    answer:
      "Yes. Instrument options can be tailored for the Chuppa or reception, including strings, guitar, flute, saxophone, brass, electric violin and others by arrangement.",
  },
  {
    question: "Where do you perform?",
    answer:
      "Aharon is based in Johannesburg and is available for weddings in Cape Town, across South Africa and internationally.",
  },
];

function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`photo-placeholder ${className}`}
      role="img"
      aria-label={`Placeholder for ${label}`}
    >
      <span className="placeholder-mark" aria-hidden="true">
        AB
      </span>
      <span>{label}</span>
    </div>
  );
}

export default function WeddingLanding() {
  return (
    <main>
      <ScrollHero />

      <MusicFeature />

      <ReleaseCarousel releases={musicReleases} />

      <section className="weddings" id="weddings">
        <div className="wedding-image">
          <PhotoPlaceholder label="Full-width wedding photograph" />
          <div className="image-caption">
            <span>Aharon Berk &amp; Azamra</span>
            <span>Chuppas · Horas · Receptions</span>
          </div>
        </div>

        <div className="wedding-intro section-pad">
          <div>
            <p className="eyebrow eyebrow-light">Live celebrations</p>
            <h2>
              Music for the
              <br />
              <em>whole wedding.</em>
            </h2>
          </div>
          <div className="wedding-copy">
            <p>
              Through Azamra, Aharon offers live music for Chuppas, Horas and
              receptions, with professional musicians, sound and personal
              guidance from planning through to the wedding day.
            </p>
            <a className="button button-gold" href="#contact">
              Check availability <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="wedding-offerings section-pad">
          <article>
            <p className="offering-number">01</p>
            <h3>A Chuppa that feels personal</h3>
            <p>
              Heartfelt live vocals with piano or keyboard, professional sound,
              and optional strings, guitar, flute, saxophone, percussion or
              custom arrangements.
            </p>
          </article>
          <article>
            <p className="offering-number">02</p>
            <h3>From the Chuppa to the dance floor</h3>
            <p>
              A full live band for energetic Jewish dancing and reception
              music, with a sound and lineup tailored to the celebration.
            </p>
          </article>
          <article>
            <p className="offering-number">03</p>
            <h3>One seamless musical experience</h3>
            <p>
              One coordinated team can carry the music through the Chuppa,
              cocktails, Hora and reception with a thoughtfully planned setup.
            </p>
          </article>
        </div>
      </section>

      <section className="process section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The process</p>
            <h2>From first note to final dance</h2>
          </div>
          <p>
            Clear guidance, thoughtful preparation and a calm, professional
            experience from beginning to end.
          </p>
        </div>
        <div className="process-grid">
          {weddingSteps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-images">
          <PhotoPlaceholder label="Performance photograph" />
          <PhotoPlaceholder label="Behind-the-scenes portrait" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About Aharon</p>
          <h2>Sincere. Carefully prepared. Connected to the moment.</h2>
          <p>
            Aharon Berk is a Jewish singer, recording artist, Chazan and live
            performer based in Johannesburg, South Africa.
          </p>
          <p>
            For more than a decade, he has sung at Chuppas, simchas and
            community events, bringing together a love of Jewish music,
            tefillah and live performance. He also leads Azamra, his live
            wedding music offering for Chuppas, Horas and receptions.
          </p>
          <a className="text-link" href="#contact">
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="faqs section-pad" id="faqs">
        <div>
          <p className="eyebrow">Wedding FAQs</p>
          <h2>Good to know</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-heading">
          <p className="eyebrow eyebrow-light">Let’s talk</p>
          <h2>
            Planning a wedding
            <br />
            or musical event?
          </h2>
          <p>
            For wedding bookings, performances, media or collaboration
            enquiries, please get in touch.
          </p>
          <a className="button button-gold" href="#enquiry-form">
            WhatsApp Aharon <span aria-hidden="true">↗</span>
          </a>
        </div>

        <form className="contact-form" id="enquiry-form" action="#contact">
          <label>
            Name
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            Email or WhatsApp number
            <input type="text" name="contact" required />
          </label>
          <label>
            Enquiry type
            <select name="enquiry-type" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option>Wedding</option>
              <option>Live performance</option>
              <option>Media</option>
              <option>Collaboration</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            City / country
            <input type="text" name="location" autoComplete="country-name" required />
          </label>
          <label className="full-field">
            Message
            <textarea name="message" rows={4} required />
          </label>
          <p className="form-note">
            Foundation form — connect delivery and spam protection before launch.
          </p>
          <button className="button button-gold" type="submit">
            Send enquiry <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <footer>
        <a className="wordmark wordmark-light" href="#top">
          Aharon Berk
        </a>
        <p>
          Jewish singer, recording artist and live performer based in
          Johannesburg. Available across South Africa and internationally.
        </p>
        <nav aria-label="Footer navigation">
          <a href="#music">Music</a>
          <a href="#weddings">Weddings</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Aharon Berk</p>
      </footer>
    </main>
  );
}
