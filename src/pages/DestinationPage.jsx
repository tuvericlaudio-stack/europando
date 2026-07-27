import Header from "../components/Header";
import Footer from "../components/Footer";

function GuideLink({ href, label }) {
  return (
    <a
      href={href}
      className="whitespace-nowrap rounded-full border border-[#d9d1c5] bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#123e78] transition hover:border-[#123e78] hover:bg-[#f7f4ee] sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-[0.12em]"    >
      {label}
    </a>
  );
}

function InformationGroup({ number, title, items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-5 border-b border-[#e7dfd4] py-8 last:border-b-0 md:grid-cols-[72px_220px_1fr] md:gap-8 md:py-10">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123e78] text-sm font-black text-white">
        {number}
      </div>

      <h3 className="text-xl font-black tracking-[-0.03em] text-[#14263d]">
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <p
            key={`${title}-${index}`}
            className="leading-7 text-[#5f6875]"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function FoodCategory({ label, items, number }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <article className="rounded-[1.7rem] border border-[#e2d9cd] bg-white p-6 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
          {label}
        </p>

        <span className="text-sm font-black text-[#b4a899]">
          {number}
        </span>
      </div>

      <div className="mt-6 divide-y divide-[#eee7de]">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#123e78]" />

            <span className="font-semibold text-[#27384d]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function DestinationPage({
  logoSrc,
  destination,
  navigateTo,
}) {
  const hasItinerary =
    Array.isArray(destination.itineraryDays) &&
    destination.itineraryDays.length > 0;

  const hasPracticalInfo = Boolean(destination.practicalInfo);

  const hasFoodGuide = Boolean(destination.foodGuide);

  const hasGallery =
    Array.isArray(destination.gallery) &&
    destination.gallery.length > 0;

  const hasSections =
    Array.isArray(destination.sections) &&
    destination.sections.length > 0;

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#14263d]">
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="relative min-h-[560px] sm:min-h-[620px] md:min-h-[700px]">
            <img
              src={destination.image}
              alt={`Veduta di ${destination.name}`}
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#08192d]/95 via-[#102842]/72 to-[#102842]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/85 via-transparent to-[#071525]/25" />

            <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col px-5 pb-10 pt-6 sm:min-h-[620px] sm:pb-14 md:min-h-[700px] md:px-8 md:pb-20 md:pt-12">              <div>
              <button
                type="button"
                onClick={() => navigateTo("/destinazioni")}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:bg-white hover:text-[#123e78]"
              >
                <span aria-hidden="true">←</span>
                Tutte le destinazioni
              </button>
            </div>

              <div className="mt-auto max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c8a9]">
                  {destination.tag}
                </p>

                <h1 className="mt-5 max-w-4xl break-words text-[2.75rem] font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">                  {destination.heroTitle}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl">                  {destination.intro}
                </p>

                {Array.isArray(destination.stats) &&
                  destination.stats.length > 0 && (
                    <div className="mt-8 flex max-w-3xl gap-3 overflow-x-auto pb-2 sm:mt-10 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">                      {destination.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="min-w-[185px] rounded-[1.4rem] border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md sm:min-w-0"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                          {stat.label}
                        </p>

                        <p className="mt-2 text-lg font-black text-white">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>

        {/* INDICE RAPIDO */}
        <section className="sticky top-[78px] z-40 mx-auto -mt-7 max-w-7xl px-5 md:top-[88px] md:px-8">
          <div className="rounded-[1.4rem] border border-[#e0d7cb] bg-white/95 p-3 shadow-[0_14px_32px_rgba(31,45,61,0.10)] backdrop-blur-xl sm:p-4">
            <div className="flex items-center gap-2 overflow-x-auto sm:gap-3">
              <span className="hidden shrink-0 px-2 text-xs font-black uppercase tracking-[0.17em] text-[#8b7f70] sm:block">
                Vai a
              </span>

              {hasItinerary && (
                <GuideLink href="#itinerario" label="Itinerario" />
              )}

              {hasPracticalInfo && (
                <GuideLink href="#informazioni" label="Informazioni" />
              )}

              {hasFoodGuide && (
                <GuideLink href="#mangiare" label="Dove mangiare" />
              )}

              {hasGallery && (
                <GuideLink href="#galleria" label="Fotografie" />
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          {/* CONTENUTO */}
          <div className="min-w-0">
            {/* PANORAMICA */}
            <section
              id="panoramica"
              className="scroll-mt-10"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a]">
                Panoramica
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-5xl">
                Un primo sguardo a {destination.name}
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#5f6875]">
                {destination.text}
              </p>
            </section>

            {/* ITINERARIO */}
            {hasItinerary && (
              <section
                id="itinerario"
                className="scroll-mt-10 pt-20"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a]">
                  Giorno per giorno
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-5xl">
                  Itinerario
                </h2>

                <p className="mt-6 max-w-3xl leading-8 text-[#5f6875]">
                  Le tappe sono organizzate in modo progressivo, così puoi
                  scoprire la città senza riempire troppo ogni giornata.
                </p>

                <div className="relative mt-10 ml-4 border-l border-[#d5c8b8] pl-8 sm:ml-5 sm:pl-10 md:mt-12 md:ml-6 md:pl-14">
                  {destination.itineraryDays.map((day, index) => {
                    const titleParts = day.label.split("—");

                    const dayTitle =
                      titleParts.length > 1
                        ? titleParts.slice(1).join("—").trim()
                        : day.label;

                    return (
                      <article
                        key={day.label}
                        className="relative pb-14 last:pb-0"
                      >
                        <div className="absolute -left-[49px] top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f7f4ee] bg-[#123e78] text-xs font-black text-white sm:-left-[61px] sm:h-12 sm:w-12 sm:text-sm md:-left-[73px]">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c86b4a]">
                          Giorno {index + 1}
                        </p>

                        <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#14263d] md:text-3xl">
                          {dayTitle}
                        </h3>

                        <div className="mt-6 rounded-[1.7rem] border border-[#e3d9cd] bg-white px-6 py-3 md:px-8">
                          {day.places.map((place) => (
                            <div
                              key={place}
                              className="flex items-center gap-4 border-b border-[#eee7de] py-4 last:border-b-0"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#edf2f8] text-xs font-black text-[#123e78]">
                                ✓
                              </span>

                              <span className="font-semibold leading-6 text-[#344458]">
                                {place}
                              </span>
                            </div>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* SEZIONI GENERICHE */}
            {!hasItinerary && hasSections && (
              <section className="pt-20">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a]">
                  Guida
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-5xl">
                  Come leggere la città
                </h2>

                <div className="mt-10 divide-y divide-[#ded5ca]">
                  {destination.sections.map((section) => (
                    <article
                      key={section.title}
                      className="grid gap-4 py-8 first:pt-0 md:grid-cols-[220px_1fr]"
                    >
                      <h3 className="text-xl font-black text-[#14263d]">
                        {section.title}
                      </h3>

                      <p className="leading-8 text-[#5f6875]">
                        {section.text}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* INFORMAZIONI PRATICHE */}
            {hasPracticalInfo && (
              <section
                id="informazioni"
                className="scroll-mt-10 pt-20"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a]">
                  Organizzare il viaggio
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-5xl">
                  Informazioni pratiche
                </h2>

                <p className="mt-6 max-w-3xl leading-8 text-[#5f6875]">
                  Come arrivare, dove dormire e come muoversi con indicazioni
                  semplici da consultare prima della partenza.
                </p>

                <div className="mt-10 rounded-[2rem] border border-[#e0d6ca] bg-white px-6 md:px-9">
                  <InformationGroup
                    number="01"
                    title="Aeroporto e centro"
                    items={destination.practicalInfo.airportToCenter}
                  />

                  <InformationGroup
                    number="02"
                    title="Prezzi utili"
                    items={destination.practicalInfo.prices}
                  />

                  <InformationGroup
                    number="03"
                    title="Dove alloggiare"
                    items={destination.practicalInfo.whereToStay}
                  />

                  <InformationGroup
                    number="04"
                    title="Quando andare"
                    items={destination.practicalInfo.whenToGo}
                  />

                  <InformationGroup
                    number="05"
                    title="Come muoversi"
                    items={destination.practicalInfo.gettingAround}
                  />

                  <InformationGroup
                    number="06"
                    title="Note utili"
                    items={destination.practicalInfo.notes}
                  />
                </div>
              </section>
            )}

            {/* DOVE MANGIARE */}
            {hasFoodGuide && (
              <section
                id="mangiare"
                className="scroll-mt-10 pt-20"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a]">
                  Sapori e locali
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-5xl">
                  Dove mangiare
                </h2>

                <p className="mt-6 max-w-3xl leading-8 text-[#5f6875]">
                  Una selezione divisa per momento della giornata, facile da
                  salvare e consultare durante il viaggio.
                </p>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  <FoodCategory
                    number="01"
                    label="Colazione"
                    items={destination.foodGuide.breakfast}
                  />

                  <FoodCategory
                    number="02"
                    label="Street food"
                    items={destination.foodGuide.streetFood}
                  />

                  <FoodCategory
                    number="03"
                    label="Ristoranti"
                    items={destination.foodGuide.restaurants}
                  />
                </div>
              </section>
            )}

            {/* GALLERIA */}
            {hasGallery && (
              <section
                id="galleria"
                className="scroll-mt-10 pt-20"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c86b4a]">
                  Fotografie
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-5xl">
                  {destination.name} in immagini
                </h2>

                <p className="mt-6 max-w-3xl leading-8 text-[#5f6875]">
                  Luoghi, dettagli e atmosfere che raccontano il carattere della
                  città.
                </p>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {destination.gallery.slice(0, 3).map((image, index) => (
                    <figure
                      key={image}
                      className="aspect-[3/4] overflow-hidden rounded-[1.8rem] bg-[#e7dfd4]"
                    >
                      <img
                        src={image}
                        alt={`${destination.name}, fotografia ${index + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* CHIUSURA */}
            <section className="pt-20">
              <div className="rounded-[2rem] bg-[#123e78] px-7 py-10 text-white md:px-11 md:py-12">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#efc4a4]">
                  Continua a esplorare
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
                  Scopri le altre destinazioni di Europando.
                </h2>

                <button
                  type="button"
                  onClick={() => navigateTo("/destinazioni")}
                  className="mt-8 min-h-11 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.13em] text-[#123e78] transition hover:bg-[#f2ede6]"
                >
                  Tutte le destinazioni
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />
    </div>
  );
}