import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Camera,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Mountain,
  Phone,
  PlaneTakeoff,
  ShieldCheck,
  Wind,
  X,
} from "lucide-react";
import {
  contact,
  faqs,
  gallery,
  navItems,
  packages,
  steps,
  trustPoints,
} from "./content";

type FormState = {
  name: string;
  phone: string;
  date: string;
  packageName: string;
  passengers: string;
  pickup: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  date: "",
  packageName: packages[1].name,
  passengers: "1",
  pickup: "",
  message: "",
};

const iconMap = [BadgeCheck, Wind, Car, Camera];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const showPrev = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [],
  );
  const showNext = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, showPrev, showNext]);

  const { galleryRowTop, galleryRowBottom } = useMemo(() => {
    const indexed = gallery.map((item, index) => ({ item, index }));
    const half = Math.ceil(indexed.length / 2);
    return { galleryRowTop: indexed.slice(0, half), galleryRowBottom: indexed.slice(half) };
  }, []);

  const whatsappUrl = useMemo(() => {
    const text = [
      `Hi ${contact.brand}, I want to book a paragliding inquiry.`,
      `Name: ${form.name || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Date: ${form.date || "-"}`,
      `Package: ${form.packageName}`,
      `Passengers: ${form.passengers || "-"}`,
      `Pickup: ${form.pickup || "-"}`,
      `Message: ${form.message || "-"}`,
    ].join("\n");

    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.phone.trim()) nextErrors.phone = "Enter a phone number.";
    if (!form.date) nextErrors.date = "Choose a flight date.";
    if (!form.passengers || Number(form.passengers) < 1) {
      nextErrors.passengers = "Add at least 1 passenger.";
    }
    if (!form.pickup.trim()) nextErrors.pickup = "Add a pickup point or write self-arrival.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={`${contact.brand} home`}>
          <span className="brand-mark" aria-hidden="true">
            <PlaneTakeoff size={23} strokeWidth={2.4} />
          </span>
          <span>
            <strong>BirBilling</strong>
            <em>FlyTaxi</em>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#booking">
          Book Now
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      ) : null}

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img src="/assets/DSC_2063.JPG" alt="" />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">Paragliding + Pickup in Bir Billing</p>
              <h1 id="hero-title">
                Feel like <span>a bird</span>
              </h1>
              <p>
                Book tandem flights, high fly slots, and FlyTaxi pickup support from
                one simple WhatsApp inquiry.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#booking">
                  Book your adventure
                  <ChevronRight size={20} />
                </a>
                <a className="secondary-button" href="#packages">
                  See packages
                </a>
              </div>
            </div>

            <div className="booking-card" aria-label="Quick flight summary">
              <div>
                <Clock3 size={20} />
                <span>Best window</span>
                <strong>Morning to sunset</strong>
              </div>
              <div>
                <MapPin size={20} />
                <span>Route</span>
                <strong>Billing takeoff to Bir</strong>
              </div>
              <div>
                <Car size={20} />
                <span>FlyTaxi</span>
                <strong>Pickup support available</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Service highlights">
          {trustPoints.map((point, index) => {
            const Icon = iconMap[index];
            return (
              <div key={point}>
                <Icon size={22} />
                <span>{point}</span>
              </div>
            );
          })}
        </section>

        <section className="section split-section">
          <div className="split-text">
            <p className="eyebrow">Why FlyTaxi</p>
            <h2>One team for the sky and the road.</h2>
            <p>
              Visitors do not need to juggle a pilot contact, taxi contact, and timing
              updates. FlyTaxi keeps the launch simple: flight inquiry, pickup point,
              timing confirmation, and takeoff support in one conversation.
            </p>
          </div>
          <figure className="split-media">
            <img
              src="/assets/DSC_0689.JPG"
              alt="A FlyTaxi pilot and guest getting ready together on the ground before takeoff"
              loading="lazy"
            />
          </figure>
        </section>

        <section className="section" id="packages" aria-labelledby="packages-title">
          <div className="section-heading">
            <p className="eyebrow">Packages</p>
            <h2 id="packages-title">Choose your flight style.</h2>
          </div>

          <div className="package-grid">
            {packages.map((item) => (
              <article className={item.featured ? "package-card featured" : "package-card"} key={item.name}>
                {item.featured ? <span className="badge">Most asked</span> : null}
                <h3>{item.name}</h3>
                <p>{item.copy}</p>
                <div className="package-meta">
                  <span>{item.duration}</span>
                  <strong>{item.price}</strong>
                </div>
                <ul>
                  {item.inclusions.map((inclusion) => (
                    <li key={inclusion}>
                      <CheckCircle2 size={18} />
                      {inclusion}
                    </li>
                  ))}
                </ul>
                <a href="#booking">Start booking</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section steps-section" aria-labelledby="steps-title">
          <div className="section-heading">
            <p className="eyebrow">How booking works</p>
            <h2 id="steps-title">Fast enough for travel plans.</h2>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section safety-section" id="safety" aria-labelledby="safety-title">
          <div className="safety-panel">
            <p className="eyebrow">Safety first</p>
            <h2 id="safety-title">Weather decides. Not pressure.</h2>
            <p>
              Paragliding is beautiful because it respects the mountain. Flight slots
              are confirmed only when the wind, visibility, and pilot call are right.
            </p>
            <div className="safety-list">
              <span>
                <ShieldCheck size={20} />
                Certified pilot coordination
              </span>
              <span>
                <Wind size={20} />
                Wind and visibility checks
              </span>
              <span>
                <Mountain size={20} />
                Local takeoff and landing support
              </span>
            </div>
          </div>
        </section>

        <section className="section" id="gallery" aria-labelledby="gallery-title">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title">Real moments from the Bir Billing sky.</h2>
          </div>
          <div className="gallery-marquee">
            {[galleryRowTop, galleryRowBottom].map((row, rowIndex) => (
              <div
                className={`marquee-row ${rowIndex === 0 ? "marquee-left" : "marquee-right"}`}
                key={rowIndex}
              >
                <div className="marquee-track">
                  {[...row, ...row].map((entry, k) => {
                    const isClone = k >= row.length;
                    return (
                      <button
                        type="button"
                        className="gallery-card"
                        key={`${rowIndex}-${k}`}
                        onClick={() => setLightbox(entry.index)}
                        aria-label={`Open photo ${entry.index + 1} of ${gallery.length}`}
                        aria-hidden={isClone || undefined}
                        tabIndex={isClone ? -1 : 0}
                      >
                        <img src={entry.item.src} alt={entry.item.alt} loading="lazy" />
                        {entry.item.caption ? (
                          <span className="gallery-caption">{entry.item.caption}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section booking-section" id="booking" aria-labelledby="booking-title">
          <div className="booking-copy">
            <p className="eyebrow">Book now</p>
            <h2 id="booking-title">Send one inquiry. Confirm on WhatsApp.</h2>
            <p>
              Prices, flight timing, and pickup routes are confirmed live because
              weather and travel location can change the plan.
            </p>
            <div className="direct-contact">
              <Phone size={20} />
              <span>{contact.phoneDisplay}</span>
            </div>
          </div>

          <form className="booking-form" onSubmit={submitBooking} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                autoComplete="name"
              />
              {errors.name ? <p role="alert">{errors.name}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                autoComplete="tel"
              />
              {errors.phone ? <p role="alert">{errors.phone}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="date">Flight date</label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
              />
              {errors.date ? <p role="alert">{errors.date}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="package">Package</label>
              <select
                id="package"
                value={form.packageName}
                onChange={(event) => updateField("packageName", event.target.value)}
              >
                {packages.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="passengers">Passengers</label>
              <input
                id="passengers"
                type="number"
                min="1"
                value={form.passengers}
                onChange={(event) => updateField("passengers", event.target.value)}
              />
              {errors.passengers ? <p role="alert">{errors.passengers}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="pickup">Pickup location</label>
              <input
                id="pickup"
                value={form.pickup}
                onChange={(event) => updateField("pickup", event.target.value)}
                placeholder="Hotel, bus stand, or self-arrival"
              />
              {errors.pickup ? <p role="alert">{errors.pickup}</p> : null}
            </div>

            <div className="field field-full">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                rows={4}
                placeholder="Any timing, video, or pickup note"
              />
            </div>

            <button className="primary-button field-full" type="submit">
              Open WhatsApp booking
              <ChevronRight size={20} />
            </button>
          </form>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title">Good to know before you fly.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <a className="brand" href="#top" aria-label={`${contact.brand} home`}>
            <span className="brand-mark" aria-hidden="true">
              <PlaneTakeoff size={23} strokeWidth={2.4} />
            </span>
            <span>
              <strong>BirBilling</strong>
              <em>FlyTaxi</em>
            </span>
          </a>
          <p>{contact.tagline}. Paragliding and pickup support in {contact.location}.</p>
        </div>
        <div className="footer-links">
          <a href="#packages">Packages</a>
          <a href="#booking">Booking</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>

      {lightbox !== null ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
          >
            <X size={26} />
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={30} />
          </button>

          <figure
            className="lightbox-stage"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const dx = event.changedTouches[0].clientX - touchStartX.current;
              if (dx > 50) showPrev();
              else if (dx < -50) showNext();
              touchStartX.current = null;
            }}
          >
            <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} />
            <figcaption>
              {gallery[lightbox].caption ? (
                <span>{gallery[lightbox].caption}</span>
              ) : null}
              <span className="lightbox-count">
                {lightbox + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
