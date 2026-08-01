import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { resolveAsset } from "../utils/assets";

// I contenuti scritti nei file dati usano due formati per il corpo del testo:
// `paragraphs` (racconti lunghi) e `text` (schede più sintetiche).
function normalizeSection(section = {}) {
  const paragraphs = Array.isArray(section.paragraphs)
    ? section.paragraphs
    : [section.text].filter(Boolean);

  return { ...section, paragraphs };
}

// Le guide giorno per giorno esistono sia come `days` sia come `daySections`.
function normalizeDays(source) {
  if (Array.isArray(source.days) && source.days.length > 0) {
    return source.days.map((day, index) => ({
      ...day,
      number: day.number ?? index + 1,
      sections: Array.isArray(day.sections)
        ? day.sections.map(normalizeSection)
        : [],
    }));
  }

  if (Array.isArray(source.daySections) && source.daySections.length > 0) {
    return source.daySections.map((day, index) => ({
      number: index + 1,
      navigationTitle: day.title,
      title: day.title,
      subtitle: day.day,
      sections: [normalizeSection(day)],
    }));
  }

  return [];
}

function normalizeArticle(article, post) {
  const source = article ?? post;

  if (!source) {
    return null;
  }

  return {
    ...source,
    heroImage: source.heroImage ?? source.image ?? "",
    heroAlt: source.heroAlt ?? source.title ?? "Fotografia di viaggio",
    subtitle: source.subtitle ?? source.excerpt ?? "",
    intro: source.intro ?? "",
    sections: Array.isArray(source.sections)
      ? source.sections.map(normalizeSection)
      : [],
    days: normalizeDays(source),
    gallery: Array.isArray(source.gallery) ? source.gallery : [],
    tripFacts: Array.isArray(source.tripFacts) ? source.tripFacts : [],
  };
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (pageHeight <= 0) {
        setProgress(0);
        return;
      }

      const percentage = (window.scrollY / pageHeight) * 100;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent">
      <div
        className="h-full bg-[#c86b4a] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function MetaIcon({ type }) {
  if (type === "author") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21c.7-4.4 3.2-6.5 7.5-6.5s6.8 2.1 7.5 6.5" />
      </svg>
    );
  }

  if (type === "date") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
        <path d="M8 3v5M16 3v5M3.5 10h17" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function MetaItem({ type, children }) {
  if (!children) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-2">
      <MetaIcon type={type} />
      {children}
    </span>
  );
}

function TripFactIcon({ type }) {
  if (type === "place") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (type === "duration") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.8a4.5 4.5 0 1 0 0 6.4M7.5 10.5h6M7.5 13.5h6" />
    </svg>
  );
}

function TripFacts({ facts }) {
  if (!facts?.length) {
    return null;
  }

  return (
    <section className="mx-auto mt-7 max-w-5xl px-5 md:px-8">
      <div className="grid border-y border-[#d8cec2] sm:grid-cols-3">
        {facts.map((fact, index) => (
          <div
            key={`${fact.label}-${index}`}
            className="flex items-center gap-4 border-b border-[#d8cec2] px-2 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#efe5db] text-[#c86b4a]">
              <TripFactIcon type={fact.type} />
            </span>

            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.17em] text-[#87909b]">
                {fact.label}
              </p>

              <p className="mt-1 font-bold text-[#123e78]">
                {fact.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RouteDivider() {
  return (
    <div
      className="my-14 flex items-center gap-4 md:my-20"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-[#d8cec2]" />

      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8cec2] bg-[#f7f4ee] text-[#c86b4a]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M18.5 9.5c0 4-6.5 9-6.5 9s-6.5-5-6.5-9a6.5 6.5 0 1 1 13 0Z" />
          <circle cx="12" cy="9.5" r="2" />
        </svg>
      </span>

      <span className="flex gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c86b4a]/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c86b4a]/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c86b4a]" />
      </span>

      <span className="h-px flex-1 bg-[#d8cec2]" />
    </div>
  );
}

// Un gruppo di una o più foto legate allo stesso punto del testo. Con più di
// un'immagine diventano una piccola griglia affiancata invece di blocchi
// enormi impilati. L'aspect ratio fisso riserva lo spazio prima del
// caricamento, senza bisogno di width/height sull'tag <img>.
function PhotoGroup({ images }) {
  if (!images?.length) {
    return null;
  }

  const isSingle = images.length === 1;

  const gridClass = isSingle
    ? "grid-cols-1"
    : images.length === 2
      ? "grid-cols-2"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className={`my-8 grid gap-3 sm:gap-4 ${gridClass}`}>
      {images.map((image, index) => {
        // La maggior parte delle foto è verticale (3/4), ma qualcuna è
        // orizzontale: l'aspect ratio segue quello reale della foto (campo
        // `aspect`, es. "1200/669"), mai un taglio forzato per adattarla.
        const aspectRatio = image.aspect || "3/4";
        const isLandscape = Number(aspectRatio.split("/")[0]) > Number(aspectRatio.split("/")[1]);

        const widthClass = isSingle
          ? isLandscape
            ? "mx-auto w-full sm:max-w-[620px]"
            : "mx-auto w-full sm:max-w-[420px]"
          : "";

        return (
          <figure
            key={`${image.src}-${index}`}
            className={`overflow-hidden rounded-[1.2rem] bg-[#e5ddd2] shadow-[0_10px_30px_rgba(39,54,71,0.08)] ${widthClass}`}
          >
            <img
              src={resolveAsset(image.src)}
              alt={image.alt || ""}
              loading="lazy"
              decoding="async"
              style={{ aspectRatio }}
              className="w-full object-cover transition duration-700 hover:scale-[1.03]"
            />

            {image.caption && (
              <figcaption className="px-3 py-2 text-xs leading-5 text-[#738092]">
                {image.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

// Le foto di una sezione possono legarsi a un paragrafo preciso
// (`afterParagraph`, indice 0-based) invece di comparire tutte insieme in
// fondo. Quelle senza indice, o il vecchio campo singolo `image`, restano di
// default in coda alla sezione.
function groupSectionImages(section) {
  const groups = new Map();

  (section.images ?? []).forEach((image) => {
    const key = Number.isInteger(image.afterParagraph)
      ? image.afterParagraph
      : -1;

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(image);
  });

  if (!section.images?.length && section.image) {
    groups.set(-1, [
      {
        src: section.image,
        alt: section.imageAlt || section.title,
        caption: section.caption,
      },
    ]);
  }

  return groups;
}

function PersonalNote({ children }) {
  if (!children) {
    return null;
  }

  return (
    <aside className="relative my-11 overflow-hidden border-l-4 border-[#c86b4a] bg-[#efe8df] px-6 py-7 sm:px-8">
      <span
        aria-hidden="true"
        className="absolute -right-2 -top-8 text-[8rem] font-black leading-none text-[#c86b4a]/10"
      >
        “
      </span>

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
          La nostra impressione
        </p>

        <p className="mt-4 text-xl font-bold leading-8 text-[#123e78]">
          {children}
        </p>
      </div>
    </aside>
  );
}

function TravelTip({ children }) {
  if (!children) {
    return null;
  }

  return (
    <aside className="my-11 rounded-[1.4rem] border border-[#d7e0e9] bg-white px-6 py-7 shadow-[0_14px_38px_rgba(39,54,71,0.06)] sm:px-8">
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#123e78] text-white">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
          </svg>
        </span>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
            Consiglio Europando
          </p>

          <p className="mt-3 text-lg font-semibold leading-8 text-[#43566c]">
            {children}
          </p>
        </div>
      </div>
    </aside>
  );
}

function ArticleSection({ section }) {
  const imageGroups = groupSectionImages(section);

  return (
    <section>
      {section.title && (
        <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#123e78] sm:text-4xl">
          {section.title}
        </h2>
      )}

      {section.paragraphs?.length > 0 && (
        <div className="mt-7 space-y-7 text-[1.08rem] leading-8 text-[#48596c] sm:text-lg sm:leading-9">
          {section.paragraphs.map((paragraph, index) => (
            <div key={index}>
              <p>{paragraph}</p>

              <PhotoGroup images={imageGroups.get(index)} />
            </div>
          ))}
        </div>
      )}

      <PhotoGroup images={imageGroups.get(-1)} />

      <PersonalNote>{section.quote}</PersonalNote>

      <TravelTip>{section.tip}</TravelTip>
    </section>
  );
}

function DayNavigation({ days }) {
  if (!days?.length) {
    return null;
  }

  return (
    <nav
      className="mx-auto mt-8 max-w-5xl px-5 md:px-8"
      aria-label="Navigazione tra i giorni del viaggio"
    >
      <div className="rounded-[1.4rem] border border-[#d8cec2] bg-[#efe8df] p-3 shadow-[0_12px_35px_rgba(39,54,71,0.05)]">
        <div className="grid gap-2 sm:grid-cols-3">
          {days.map((day) => (
            <a
              key={day.number}
              href={`#giorno-${day.number}`}
              className="group flex items-center gap-4 rounded-[1rem] px-4 py-4 text-left transition hover:bg-white"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#123e78] text-sm font-black text-white transition group-hover:bg-[#c86b4a]">
                {String(day.number).padStart(2, "0")}
              </span>

              <span>
                <span className="block text-[0.65rem] font-black uppercase tracking-[0.17em] text-[#c86b4a]">
                  Giorno {day.number}
                </span>

                <span className="mt-1 block text-sm font-bold leading-5 text-[#123e78]">
                  {day.navigationTitle || day.title}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function DayBlock({ day }) {
  return (
    <section
      id={`giorno-${day.number}`}
      className="scroll-mt-28"
    >
      <header className="relative mb-12 overflow-hidden rounded-[1.6rem] bg-[#123e78] px-6 py-9 text-white sm:px-9 sm:py-11">
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-12 text-[10rem] font-black leading-none text-white/[0.06]"
        >
          {String(day.number).padStart(2, "0")}
        </span>

        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f2ae92]">
            Giorno {String(day.number).padStart(2, "0")}
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
            {day.title}
          </h2>

          {day.subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              {day.subtitle}
            </p>
          )}
        </div>
      </header>

      {day.intro && (
        <p className="mb-12 text-xl font-semibold leading-9 text-[#263f5b]">
          {day.intro}
        </p>
      )}

      {day.sections?.map((section, sectionIndex) => (
        <div key={`${day.number}-${section.title}-${sectionIndex}`}>
          {sectionIndex > 0 && <RouteDivider />}

          <ArticleSection section={section} />
        </div>
      ))}
    </section>
  );
}

function AuthorBox() {
  return (
    <section className="mt-20 border-y border-[#d9cfc3] py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#123e78] text-xl font-black text-white">
          E
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
            Scritto da Europando
          </p>

          <p className="mt-3 max-w-2xl leading-7 text-[#566678]">
            Raccontiamo viaggi europei accessibili, esperienze reali e
            destinazioni che possono essere vissute senza programmi
            irrealizzabili o budget fuori portata.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ArticlePage({ article, post, logoSrc }) {
  const content = normalizeArticle(article, post);

  if (!content) {
    return null;
  }

  const relatedDestination = content.relatedDestination ?? null;

  const relatedDestinationPath = relatedDestination
    ? `/destinazioni/${relatedDestination.slug}`
    : "/destinazioni";

  const sectionImages = new Set(
    [
      ...content.sections,
      ...content.days.flatMap((day) => day.sections ?? []),
    ]
      .map((section) => section.image)
      .filter(Boolean)
  );

  const additionalGallery = content.gallery.filter(
    (image) => image.src && !sectionImages.has(image.src)
  );

  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <ReadingProgress />

      <Header logoSrc={logoSrc} />

      <main>
        <article>
          <header className="mx-auto max-w-5xl px-5 pb-10 pt-12 text-center md:px-8 md:pb-14 md:pt-20">
            <Link
              to="/articoli"
              className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a] transition hover:text-[#123e78]"
            >
              Racconti di viaggio
            </Link>

            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#123e78] sm:text-5xl md:text-7xl">
              {content.title}
            </h1>

            {content.subtitle && (
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#627083] md:text-xl">
                {content.subtitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-[#748092]">
              <MetaItem type="author">{content.author}</MetaItem>
              <MetaItem type="date">{content.date}</MetaItem>
              <MetaItem type="time">{content.readingTime}</MetaItem>
            </div>
          </header>

          {content.heroImage && (
            <figure className="mx-auto max-w-7xl px-5 md:px-8">
              <div
                className={`overflow-hidden rounded-[1.8rem] bg-[#e4dcd1] shadow-[0_24px_70px_rgba(37,55,74,0.12)] ${
                  content.heroAspect ? "mx-auto w-full sm:max-w-[560px]" : ""
                }`}
              >
                <img
                  src={resolveAsset(content.heroImage)}
                  alt={content.heroAlt}
                  fetchPriority="high"
                  style={content.heroAspect ? { aspectRatio: content.heroAspect } : undefined}
                  className={
                    content.heroAspect
                      ? "w-full object-cover"
                      : "max-h-[760px] min-h-[360px] w-full object-cover"
                  }
                />
              </div>
            </figure>
          )}

          <TripFacts facts={content.tripFacts} />

          <DayNavigation days={content.days} />

          <div className="mx-auto max-w-[760px] px-5 py-14 md:px-8 md:py-20">
            {content.intro && (
              <p className="text-xl font-semibold leading-9 tracking-[-0.015em] text-[#263f5b] sm:text-2xl sm:leading-10">
                {content.intro}
              </p>
            )}

            <div className="mt-16">
              {content.days.length > 0 ? (
                content.days.map((day, index) => (
                  <div key={day.number}>
                    {index > 0 && <RouteDivider />}

                    <DayBlock day={day} />
                  </div>
                ))
              ) : (
                content.sections.map((section, index) => (
                  <div key={`${section.title}-${index}`}>
                    {index > 0 && <RouteDivider />}

                    <ArticleSection section={section} />
                  </div>
                ))
              )}
            </div>

            {additionalGallery.length > 0 && (
              <section className="mt-20">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
                  Altri momenti del viaggio
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#123e78]">
                  {content.galleryTitle ?? "Le nostre fotografie del viaggio"}
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {additionalGallery.map((image, index) => (
                    <figure
                      key={`${image.src}-${index}`}
                      className="overflow-hidden rounded-[1.4rem] bg-[#e4dcd1]"
                    >
                      <img
                        src={resolveAsset(image.src)}
                        alt={
                          image.alt ||
                          `${content.title}, fotografia ${index + 1}`
                        }
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.02]"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {relatedDestination && (
              <section className="mt-20 border-y border-[#d9cfc3] py-12">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
                  Organizza il viaggio
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.035em] text-[#123e78] sm:text-4xl">
                  Stai pensando di visitare {relatedDestination.name}?
                </h2>

                <p className="mt-5 text-lg leading-8 text-[#58687a]">
                  {relatedDestination.text ??
                    `Nella nostra guida di ${relatedDestination.name} trovi l’itinerario, le informazioni sui trasporti e i luoghi che abbiamo raccolto durante il viaggio.`}
                </p>

                <Link
                  to={relatedDestinationPath}
                  className="mt-7 inline-flex items-center gap-2 border-b-2 border-[#c86b4a] pb-2 text-sm font-black uppercase tracking-[0.14em] text-[#123e78] transition hover:text-[#c86b4a]"
                >
                  Leggi la guida di {relatedDestination.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </section>
            )}

            <AuthorBox />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}