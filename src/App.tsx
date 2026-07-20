import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Camera,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Mountain,
  Phone,
  ShieldCheck,
  Wind,
  X,
} from "lucide-react";
import {
  contact,
  courses,
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

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="0"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.863-9.864.001-2.639-1.024-5.12-2.887-6.986C16.384 1.89 13.907.86 11.277.859 5.843.859 1.42 5.277 1.418 10.725c-.001 1.516.398 2.996 1.157 4.3l-.999 3.648 3.735-.979H6.647zM18.06 14.51c-.347-.173-2.054-1.014-2.37-1.13-.317-.116-.549-.173-.781.173-.231.347-.894 1.13-1.096 1.359-.202.23-.404.26-.75.088-.348-.173-1.468-.542-2.797-1.728-1.034-.922-1.733-2.06-1.936-2.407-.202-.347-.021-.534.152-.707.157-.156.347-.405.52-.607.174-.202.23-.347.347-.578.116-.23.058-.433-.029-.607-.087-.173-.781-1.88-1.07-2.574-.28-.674-.564-.582-.781-.593-.2-.01-.43-.012-.662-.012-.231 0-.607.087-.924.434-.318.347-1.214 1.186-1.214 2.89 0 1.706 1.243 3.353 1.417 3.584.173.23 2.447 3.737 5.928 5.24 3.48 1.503 3.48 1.003 4.116.945.637-.058 2.053-.839 2.342-1.649.289-.81.289-1.503.202-1.648-.087-.145-.317-.23-.664-.404z" />
  </svg>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [hash, setHash] = useState(window.location.hash);
  const isHome = hash === "" || hash === "#/" || hash === "#top";
  const isPackages = hash === "#/packages";
  const isCoursesPage = hash === "#/courses";
  const isSafety = hash === "#/safety";
  const isGallery = hash === "#/gallery";
  const isBooking = hash === "#/booking";

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (href: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    setMenuOpen(false);

    if (href === "#/" || href === "#top" || href === "") {
      window.location.hash = "#/";
    } else {
      window.location.hash = href;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [hash]);

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
        <a
          className="brand"
          href="#top"
          aria-label={`${contact.brand} home`}
          onClick={(e) => navigateTo("#top", e)}
        >
          <span className="brand-mark" aria-hidden="true">
            <img src="/icons/logo.png" alt="" />
          </span>
          <span>
            <strong>BirBilling</strong>
            <em>FlyTaxi</em>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => {
            const isLinkActive =
              (href === "#/" && isHome) ||
              (href === "#/packages" && isPackages) ||
              (href === "#/courses" && isCoursesPage) ||
              (href === "#/safety" && isSafety) ||
              (href === "#/gallery" && isGallery) ||
              (href === "#/booking" && isBooking);
            return (
              <a
                key={href}
                href={href}
                className={isLinkActive ? "active" : ""}
                onClick={(e) => navigateTo(href, e)}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a
          className="nav-cta"
          href="#/booking"
          onClick={(e) => navigateTo("#/booking", e)}
        >
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
          {navItems.map(([label, href]) => {
            const isLinkActive =
              (href === "#/" && isHome) ||
              (href === "#/packages" && isPackages) ||
              (href === "#/courses" && isCoursesPage) ||
              (href === "#/safety" && isSafety) ||
              (href === "#/gallery" && isGallery) ||
              (href === "#/booking" && isBooking);
            return (
              <a
                key={href}
                href={href}
                className={isLinkActive ? "active" : ""}
                onClick={(e) => navigateTo(href, e)}
              >
                {label}
              </a>
            );
          })}
        </nav>
      ) : null}

      {isHome && (
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
                  <a
                    className="primary-button"
                    href="#/booking"
                    onClick={(e) => navigateTo("#/booking", e)}
                  >
                    Book your adventure
                    <ChevronRight size={20} />
                  </a>
                  <a
                    className="secondary-button"
                    href="#/packages"
                    onClick={(e) => navigateTo("#/packages", e)}
                  >
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
      )}

      {isPackages && (
        <main id="top">
          <section className="courses-hero" aria-labelledby="packages-title">
            <div className="courses-hero-content">
              <p className="eyebrow">Our Offers</p>
              <h1 id="packages-title">
                Paragliding <span>Packages</span>
              </h1>
              <p className="lead">
                Choose your flight style. We offer tandem flights, extended airtime, and
                integrated hotel/station pickup support.
              </p>
            </div>
          </section>

          <section className="section" aria-label="Available packages">
            <div className="package-grid">
              {packages.map((item) => (
                <article
                  className={item.featured ? "package-card featured" : "package-card"}
                  key={item.name}
                >
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
                  <a href="#/booking" onClick={(e) => navigateTo("#/booking", e)}>
                    Start booking
                  </a>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {isCoursesPage && (
        <main id="top">
          <section className="courses-hero" aria-labelledby="courses-hero-title">
            <div className="courses-hero-content">
              <p className="eyebrow">Paragliding School</p>
              <h1 id="courses-hero-title">
                Become a <span>Certified Pilot</span>
              </h1>
              <p className="lead">
                Learn paragliding at Bir Billing, the world's second-highest takeoff point.
                Our school programs take you from absolute beginner to an advanced cross-country flyer.
              </p>
            </div>
          </section>

          <section className="section" aria-label="Available paragliding courses">
            <div className="courses-grid">
              {courses.map((course) => (
                <article className="course-card" id={`course-${course.id}`} key={course.id}>
                  <div className="course-card-header">
                    <h3>{course.name}</h3>
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  <p className="course-copy">{course.copy}</p>
                  <div className="course-price">
                    <span>Course Fee</span>
                    <strong>{course.price}</strong>
                  </div>
                  <ul className="course-inclusions">
                    {course.inclusions.map((inc, i) => (
                      <li key={i}>
                        <CheckCircle2 size={18} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    className={
                      course.ctaType === "enroll"
                        ? "course-btn course-btn-enroll"
                        : "course-btn course-btn-whatsapp"
                    }
                    href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hi BirBilling FlyTaxi, I want to enroll in the ${course.name} (${course.duration}). Please share the details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {course.ctaType === "whatsapp" && <WhatsAppIcon />}
                    <span>{course.ctaLabel}</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {isSafety && (
        <main id="top">
          <section className="courses-hero" aria-labelledby="safety-title">
            <div className="courses-hero-content">
              <p className="eyebrow">Safety First</p>
              <h1 id="safety-title">
                Weather decides. <span>Not pressure.</span>
              </h1>
              <p className="lead">
                Paragliding is beautiful because it respects the mountain. Flight slots are
                confirmed only when wind, visibility, and pilot call are right.
              </p>
            </div>
          </section>

          <section className="section safety-section" aria-label="Safety parameters">
            <div className="safety-panel">
              <p className="eyebrow">Guidelines</p>
              <h2>Your Safety is Our Priority</h2>
              <p>
                We adhere to strict international paragliding protocols. Our certified pilots carry
                backup reserves, wear high-protection helmets, and monitor real-time weather
                stations in Billing.
              </p>
              <div className="safety-list" style={{ marginTop: "30px" }}>
                <span>
                  <ShieldCheck size={22} />
                  Certified pilot coordination & active licenses
                </span>
                <span>
                  <Wind size={22} />
                  Wind, speed, gusts and visibility checks before takeoff
                </span>
                <span>
                  <Mountain size={22} />
                  Local takeoff and landing zone marshal support
                </span>
              </div>
            </div>
          </section>
        </main>
      )}

      {isGallery && (
        <main id="top">
          <section className="courses-hero" aria-labelledby="gallery-title">
            <div className="courses-hero-content">
              <p className="eyebrow">Visuals</p>
              <h1 id="gallery-title">
                Real <span>Moments</span>
              </h1>
              <p className="lead">
                Real moments captured from the Bir Billing takeoff site and landing zone. Click
                any photo to enlarge.
              </p>
            </div>
          </section>

          <section className="section" aria-label="Photo gallery">
            <div className="gallery-marquee" style={{ animation: "none", overflow: "visible" }}>
              <div
                className="courses-grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {gallery.map((item, index) => (
                  <button
                    type="button"
                    className="gallery-card"
                    key={index}
                    onClick={() => setLightbox(index)}
                    style={{ width: "100%", height: "260px", margin: 0 }}
                    aria-label={`Open photo ${index + 1} of ${gallery.length}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      style={{ borderRadius: "8px" }}
                    />
                    {item.caption ? <span className="gallery-caption">{item.caption}</span> : null}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {isBooking && (
        <main id="top">
          <section className="courses-hero" aria-labelledby="booking-title">
            <div className="courses-hero-content">
              <p className="eyebrow">Reservations</p>
              <h1 id="booking-title">
                Confirm on <span>WhatsApp</span>
              </h1>
              <p className="lead">
                Send one inquiry. Confirm your pilot slots and FlyTaxi pickup coordination live.
              </p>
            </div>
          </section>

          <section className="section booking-section" aria-label="Booking form">
            <div className="booking-copy">
              <p className="eyebrow">Book now</p>
              <h2>Let's Plan Your Flight</h2>
              <p>
                Prices, flight timing, and pickup routes are confirmed live because weather and
                travel location can change the plan.
              </p>
              <div className="direct-contact" style={{ marginTop: "24px" }}>
                <Phone size={20} />
                <a href={`tel:+${contact.whatsappNumber}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {contact.phoneDisplay}
                </a>
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
        </main>
      )}

      <footer className="footer" id="contact">
        <div>
          <a
            className="brand"
            href="#top"
            aria-label={`${contact.brand} home`}
            onClick={(e) => navigateTo("#top", e)}
          >
            <span className="brand-mark" aria-hidden="true">
              <img src="/icons/logo.png" alt="" />
            </span>
            <span>
              <strong>BirBilling</strong>
              <em>FlyTaxi</em>
            </span>
          </a>
          <p>{contact.tagline}. Paragliding and pickup support in {contact.location}.</p>
          <div className="footer-contact-details">
            <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="footer-detail-link">
              <MapPin size={15} />
              <span>{contact.address}</span>
            </a>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="footer-detail-link">
              <Instagram size={15} />
              <span>{contact.instagram}</span>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <a href="#/packages" onClick={(e) => navigateTo("#/packages", e)}>
            Packages
          </a>
          <a href="#/booking" onClick={(e) => navigateTo("#/booking", e)}>
            Booking
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>
      <div className="footer-byline">
        Developed by{" "}
        <a href="https://www.prajanova.com/" target="_blank" rel="noreferrer">
          PrajaNova
        </a>
      </div>

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
