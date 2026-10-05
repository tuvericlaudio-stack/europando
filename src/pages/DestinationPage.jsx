import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Icon = ({ name, className = "h-5 w-5" }) => {
  const common = {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "map") {
    return <svg {...common}><path d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2Z" /><path d="M8 4v13" /><path d="M16 7v13" /></svg>;
  }

  if (name === "camera") {
    return <svg {...common}><path d="M4 7h3l1.5-2h7L17 7h3v11H4Z" /><circle cx="12" cy="12.5" r="3.5" /></svg>;
  }

  if (name === "food") {
    return <svg {...common}><path d="M7 3v8" /><path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3" /><path d="M7 11v10" /><path d="M16 3v18" /><path d="M16 3c3 2 3 7 0 9" /></svg>;
  }

  if (name === "bus") {
    return <svg {...common}><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M8 7h8" /><path d="M7 12h10" /><circle cx="8.5" cy="18.5" r="1.5" /><circle cx="15.5" cy="18.5" r="1.5" /></svg>;
  }

  if (name === "coins") {
    return <svg {...common}><ellipse cx="9" cy="7" rx="5" ry="2.5" /><path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" /><path d="M10 14c.7 1.1 2.5 1.8 4.5 1.8 2.8 0 5-1.1 5-2.5v-4" /><ellipse cx="14.5" cy="9.3" rx="5" ry="2.5" /></svg>;
  }

  if (name === "tip") {
    return <svg {...common}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8.2 14.5A6 6 0 1 1 15.8 14.5c-1 .8-1.8 1.8-1.8 3.5h-4c0-1.7-.8-2.7-1.8-3.5Z" /></svg>;
  }

  return <svg {...common}><path d="M12 3v18" /><path d="M3 12h18" /></svg>;
};

function AnchorTab({ href, icon, label }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-[#20304d] transition hover:bg-[#edf5ff] hover:text-[#0b67d8]"
    >
      <Icon name={icon} className="h-5 w-5" />
      {label}
    </a>
  );
}

function InfoCard({ icon, title, children, id }) {
  return (
    <section
      id={id}
      className="scroll-mt-36 rounded-[1.5rem] border border-[#dce6f1] bg-white p-5 shadow-[0_8px_28px_rgba(20,50,90,0.04)] md:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5ff] text-[#0b67d8]">
          <Icon name={icon} />
        </span>
        <h2 className="text-xl font-black tracking-[-0.025em] text-[#11244a]">
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b67d8]" />
          <p className="text-sm leading-6 text-[#58667a]">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function DestinationPage({ logoSrc, destination }) {
  const hasItinerary = Array.isArray(destination.itineraryDays) && destination.itineraryDays.length > 0;
  const hasPracticalInfo = Boolean(destination.practicalInfo);
  const hasFoodGuide = Boolean(destination.foodGuide);
  const hasGallery = Array.isArray(destination.gallery) && destination.gallery.length > 0;
  const country = destination.country ?? destination.tag ?? "";
  const allPlaces = hasItinerary
    ? [...new Set(destination.itineraryDays.flatMap((day) => day.places ?? []))]
    : [];

  return (
    <div className="min-h-screen bg-[#f3f8fd] text-[#14263d]">
      <Header logoSrc={logoSrc} />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-5 md:px-8 md:pt-7">
        <nav
          className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#718096]"
          aria-label="Percorso di navigazione"
        >
          <Link to="/" className="hover:text-[#0b67d8]">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/destinazioni" className="hover:text-[#0b67d8]">Destinazioni</Link>
          {country && (
            <>
              <span aria-hidden="true">›</span>
              <span>{country}</span>
            </>
          )}
          <span aria-hidden="true">›</span>
          <span className="font-black text-[#20304d]">{destination.name}</span>
        </nav>

        <section className="mt-4 overflow-hidden rounded-[1.45rem] border border-[#dbe6f1] bg-white">
          <div className="relative aspect-[16/6] min-h-[220px] max-h-[390px] overflow-hidden">
            <img
              src={destination.image}
              alt={`Veduta di ${destination.name}`}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071729]/18 to-transparent" />
          </div>
        </section>

        <section className="grid gap-7 border-b border-[#dfe8f2] py-7 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10">
          <div>
            <p className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#0a4c9e]">
              {country}
            </p>

            <h1 className="mt-4 max-w-4xl text-[2.55rem] font-black leading-[0.98] tracking-[-0.05em] text-[#0c1d46] sm:text-5xl md:text-6xl">
              {destination.heroTitle}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#5b687b] md:text-lg md:leading-8">
              {destination.intro}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {Array.isArray(destination.stats) &&
                destination.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-full border border-[#d9e5f0] bg-white px-4 py-2 text-sm text-[#536174]"
                  >
                    <span>{stat.label}: </span>
                    <span className="font-black text-[#11244a]">{stat.value}</span>
                  </div>
                ))}
            </div>
          </div>

          <aside className="rounded-[1.45rem] bg-[#eaf4ff] p-6">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#0a4c9e]">
              In breve
            </p>

            <div className="mt-5 space-y-4">
              {Array.isArray(destination.stats) &&
                destination.stats.map((stat) => (
                  <div key={`summary-${stat.label}`} className="flex items-center justify-between gap-6 border-b border-[#cadeef] pb-3 last:border-b-0 last:pb-0">
                    <span className="text-sm text-[#526276]">{stat.label}</span>
                    <span className="text-sm font-black text-[#10244e]">{stat.value}</span>
                  </div>
                ))}
            </div>

            {destination.practicalInfo?.prices?.length > 0 && (
              <div className="mt-6 border-t border-[#cadeef] pt-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0a4c9e]">
                  Costi utili
                </p>
                <p className="mt-2 text-sm leading-6 text-[#526276]">
                  Trasporti e prezzi indicativi sono raccolti più sotto nella guida.
                </p>
              </div>
            )}
          </aside>
        </section>

        <section className="sticky top-[76px] z-40 -mx-1 mt-4 overflow-x-auto rounded-[1.15rem] border border-[#dce6f1] bg-white/96 p-1.5 shadow-[0_12px_30px_rgba(20,50,90,0.07)] backdrop-blur-xl md:top-[82px]">
          <div className="flex min-w-max items-center">
            {hasItinerary && <AnchorTab href="#itinerario" icon="map" label="Itinerario" />}
            {allPlaces.length > 0 && <AnchorTab href="#cosa-vedere" icon="camera" label="Cosa vedere" />}
            {hasFoodGuide && <AnchorTab href="#mangiare" icon="food" label="Dove mangiare" />}
            {hasPracticalInfo && <AnchorTab href="#muoversi" icon="bus" label="Come muoversi" />}
            {hasPracticalInfo && <AnchorTab href="#costi" icon="coins" label="Costi" />}
            {hasPracticalInfo && <AnchorTab href="#consigli" icon="tip" label="Consigli" />}
          </div>
        </section>

        {hasItinerary && (
          <section id="itinerario" className="scroll-mt-36 pt-10">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0b67d8]">
                Itinerario
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#0c1d46] md:text-4xl">
                Giorno per giorno
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {destination.itineraryDays.map((day, index) => {
                const titleParts = day.label.split("—");
                const dayTitle = titleParts.length > 1 ? titleParts.slice(1).join("—").trim() : day.label;

                return (
                  <a
                    key={day.label}
                    href={`#giorno-${index + 1}`}
                    className="group overflow-hidden rounded-[1.35rem] border border-[#dce6f1] bg-white shadow-[0_8px_24px_rgba(20,50,90,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(20,50,90,0.08)]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#dbe7f2]">
                      <img
                        src={day.image ?? destination.image}
                        alt={`${destination.name}, giorno ${index + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0b67d8] shadow-sm">
                        Giorno {index + 1}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-black leading-tight tracking-[-0.02em] text-[#11244a]">
                        {dayTitle}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#68778a]">
                        {(day.places ?? []).slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <section className="grid gap-5 pt-7 lg:grid-cols-2">
          {allPlaces.length > 0 && (
            <InfoCard id="cosa-vedere" icon="camera" title={`Cosa vedere a ${destination.name}`}>
              <div className="grid gap-2 sm:grid-cols-2">
                {allPlaces.slice(0, 10).map((place) => (
                  <div key={place} className="rounded-xl bg-[#f5f8fc] px-4 py-3 text-sm font-semibold text-[#314056]">
                    {place}
                  </div>
                ))}
              </div>
            </InfoCard>
          )}

          {hasFoodGuide && (
            <InfoCard id="mangiare" icon="food" title="Dove mangiare">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">Colazione</p>
                  <div className="mt-3"><BulletList items={destination.foodGuide.breakfast} /></div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">Street food</p>
                  <div className="mt-3"><BulletList items={destination.foodGuide.streetFood} /></div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">Ristoranti</p>
                  <div className="mt-3"><BulletList items={destination.foodGuide.restaurants} /></div>
                </div>
              </div>
            </InfoCard>
          )}

          {hasPracticalInfo && (
            <InfoCard id="muoversi" icon="bus" title="Come muoversi">
              <BulletList items={destination.practicalInfo.gettingAround} />
              <div className="mt-5 rounded-xl bg-[#f5f8fc] p-4">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">
                  Dall&apos;aeroporto
                </p>
                <div className="mt-3"><BulletList items={destination.practicalInfo.airportToCenter} /></div>
              </div>
            </InfoCard>
          )}

          {hasPracticalInfo && (
            <InfoCard id="consigli" icon="tip" title="Consigli pratici">
              <BulletList items={destination.practicalInfo.notes} />
              <div className="mt-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">
                  Quando andare
                </p>
                <div className="mt-3"><BulletList items={destination.practicalInfo.whenToGo} /></div>
              </div>
            </InfoCard>
          )}
        </section>

        {hasPracticalInfo && (
          <section id="costi" className="scroll-mt-36 pt-8">
            <div className="rounded-[1.5rem] border border-[#dce6f1] bg-white p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5ff] text-[#0b67d8]">
                  <Icon name="coins" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">
                    Budget
                  </p>
                  <h2 className="text-2xl font-black tracking-[-0.03em] text-[#11244a]">
                    Costi utili già verificati
                  </h2>
                </div>
              </div>

              <div className="mt-5">
                <BulletList items={destination.practicalInfo.prices} />
              </div>

              <p className="mt-5 rounded-xl bg-[#fff7e8] px-4 py-3 text-sm leading-6 text-[#725b29]">
                Il totale reale del viaggio verrà aggiunto solo quando avremo tutte le spese effettivamente sostenute.
              </p>
            </div>
          </section>
        )}

        {hasItinerary && (
          <section className="pt-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0b67d8]">
              Itinerario completo
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#0c1d46] md:text-4xl">
              Tutte le tappe, senza saltare nulla
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {destination.itineraryDays.map((day, index) => {
                const titleParts = day.label.split("—");
                const dayTitle = titleParts.length > 1 ? titleParts.slice(1).join("—").trim() : day.label;

                return (
                  <article
                    key={`detail-${day.label}`}
                    id={`giorno-${index + 1}`}
                    className="scroll-mt-36 rounded-[1.5rem] border border-[#dce6f1] bg-white p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b67d8] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0b67d8]">
                          Giorno {index + 1}
                        </p>
                        <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#11244a]">
                          {dayTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-5 divide-y divide-[#e7edf4]">
                      {(day.places ?? []).map((place) => (
                        <div key={place} className="flex items-center gap-3 py-3.5">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf4ff] text-xs font-black text-[#0b67d8]">✓</span>
                          <span className="font-semibold text-[#415066]">{place}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {hasGallery && (
          <section id="galleria" className="scroll-mt-36 pt-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0b67d8]">Fotografie</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#0c1d46] md:text-4xl">
              {destination.name} in immagini
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destination.gallery.map((image, index) => (
                <figure key={`${image}-${index}`} className="aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[#dfe8f2]">
                  <img
                    src={image}
                    alt={`${destination.name}, fotografia ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        {destination.slug === "bucarest" && (
          <section className="pt-12">
            <div className="grid overflow-hidden rounded-[1.6rem] bg-[#0d2c59] text-white md:grid-cols-[1fr_auto] md:items-center">
              <div className="p-7 md:p-9">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a9d0ff]">
                  Esperienza personale
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                  Vuoi vedere com&apos;è andata davvero?
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/75">
                  Nel nostro racconto trovi il viaggio reale a Bucarest, le scelte fatte sul posto e le esperienze che ci hanno sorpreso di più.
                </p>
              </div>

              <div className="p-7 pt-0 md:p-9 md:pl-0">
                <Link
                  to="/articoli/bucarest-ci-ha-sorpresi"
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#0d2c59] transition hover:-translate-y-0.5"
                >
                  Leggi il racconto →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
