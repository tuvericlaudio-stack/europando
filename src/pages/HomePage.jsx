import Footer from "../components/Footer";
export default function HomePage({
  heroSrc,
  destinations,
  featuredDestination,
  navigateTo,
}) {
  const primaryDestination =
    featuredDestination ?? destinations[0] ?? null;

  const otherDestinations = primaryDestination
    ? destinations.filter(
        (destination) => destination.slug !== primaryDestination.slug
      )
    : destinations;

  const destinationPath = primaryDestination
    ? `/destinazioni/${primaryDestination.slug}`
    : "/destinazioni";

  return (
      <>
    <main className="bg-[#f7f4ee] text-[#14263d]"></main>
    <main className="bg-[#f7f4ee] text-[#14263d]">
      {/* HERO */}
      <section className="relative min-h-[680px] overflow-hidden md:min-h-[760px]">
        <img
          src={heroSrc}
          alt="Viaggio in Europa con Europando"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071729]/95 via-[#102a46]/72 to-[#102a46]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/80 via-transparent to-[#061321]/30" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-end px-5 pb-16 pt-16 md:min-h-[760px] md:px-8 md:pb-24">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#efc4a4]">
              Travel journal
            </p>

            <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[0.92] tracking-[-0.065em] text-white sm:text-7xl md:text-[6.8rem]">
              Europando
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-white md:text-2xl md:leading-9">
              Viaggiare in Europa,
              <br />
              una tappa alla volta.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 md:text-lg md:leading-8">
              Guide di viaggio scritte in modo semplice, con itinerari chiari
              e consigli pratici da consultare senza confusione.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo(destinationPath)}
                className="min-h-12 rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-[#123e78] shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#f3eee7]"
              >
                {primaryDestination
                  ? `Scopri ${primaryDestination.name}`
                  : "Scopri le destinazioni"}
              </button>

              <a
                href="#guida-in-evidenza"
                className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white backdrop-blur-md transition hover:bg-white hover:text-[#123e78]"
              >
                Esplora il sito
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUZIONE */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 border-b border-[#dcd2c5] pb-16 md:grid-cols-[1fr_1.25fr] md:gap-16 md:pb-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
              Il progetto
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] text-[#123e78] md:text-5xl">
              Guide pensate per essere davvero utilizzate.
            </h2>
          </div>

          <div className="md:pt-8">
            <p className="text-lg leading-8 text-[#5f6875]">
              Europando raccoglie itinerari, luoghi e informazioni pratiche
              per aiutarti a organizzare un viaggio senza perdere tempo tra
              decine di pagine diverse.
            </p>

            <div className="mt-10 grid gap-7 sm:grid-cols-3">
              <div className="border-t border-[#d8ccbd] pt-5">
                <span className="text-sm font-black text-[#c86b4a]">
                  01
                </span>

                <h3 className="mt-3 font-black text-[#14263d]">
                  Itinerari chiari
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6c7887]">
                  Giornate organizzate con un ordine facile da seguire.
                </p>
              </div>

              <div className="border-t border-[#d8ccbd] pt-5">
                <span className="text-sm font-black text-[#c86b4a]">
                  02
                </span>

                <h3 className="mt-3 font-black text-[#14263d]">
                  Consigli pratici
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6c7887]">
                  Trasporti, quartieri, prezzi e informazioni utili.
                </p>
              </div>

              <div className="border-t border-[#d8ccbd] pt-5">
                <span className="text-sm font-black text-[#c86b4a]">
                  03
                </span>

                <h3 className="mt-3 font-black text-[#14263d]">
                  Lettura semplice
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6c7887]">
                  Contenuti ordinati e facili da consultare anche in viaggio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINAZIONE IN EVIDENZA */}
      {primaryDestination && (
        <section
          id="guida-in-evidenza"
          className="scroll-mt-20 mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28"
        >
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                Guida in evidenza
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#123e78] md:text-5xl">
                La destinazione da cui iniziare
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigateTo("/destinazioni")}
              className="self-start text-sm font-black uppercase tracking-[0.13em] text-[#123e78] transition hover:text-[#c86b4a] md:self-auto"
            >
              Tutte le destinazioni →
            </button>
          </div>

          <article className="group grid overflow-hidden rounded-[2rem] border border-[#dfd4c7] bg-white lg:grid-cols-[1.3fr_1fr]">
            <div className="relative min-h-[380px] overflow-hidden md:min-h-[520px]">
              <img
                src={primaryDestination.image}
                alt={`Veduta di ${primaryDestination.name}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071729]/65 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                {Array.isArray(primaryDestination.stats) &&
                  primaryDestination.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-full border border-white/25 bg-[#071729]/55 px-4 py-2 text-sm text-white backdrop-blur-md"
                    >
                      <span className="text-white/65">
                        {stat.label}:{" "}
                      </span>

                      <span className="font-black">{stat.value}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                {primaryDestination.tag}
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#123e78] md:text-5xl">
                {primaryDestination.name}
              </h3>

              <p className="mt-6 text-lg leading-8 text-[#5f6875]">
                {primaryDestination.intro ?? primaryDestination.text}
              </p>

              <p className="mt-5 leading-7 text-[#738091]">
                {primaryDestination.text}
              </p>

              <div className="mt-9">
                <button
                  type="button"
                  onClick={() =>
                    navigateTo(
                      `/destinazioni/${primaryDestination.slug}`
                    )
                  }
                  className="min-h-12 rounded-full bg-[#123e78] px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#0d315f]"
                >
                  Leggi la guida
                </button>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* ALTRE DESTINAZIONI */}
      {otherDestinations.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
              Altre guide
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#123e78] md:text-5xl">
              Continua a esplorare
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {otherDestinations.map((destination) => (
              <button
                key={destination.slug}
                type="button"
                onClick={() =>
                  navigateTo(`/destinazioni/${destination.slug}`)
                }
                className="group relative min-h-[420px] overflow-hidden rounded-[1.8rem] text-left"
              >
                <img
                  src={destination.image}
                  alt={`Veduta di ${destination.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071729]/90 via-[#071729]/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#efc4a4]">
                    {destination.tag}
                  </p>

                  <h3 className="mt-3 text-4xl font-black tracking-[-0.045em] text-white">
                    {destination.name}
                  </h3>

                  <p className="mt-3 max-w-lg leading-7 text-white/75">
                    {destination.intro ?? destination.text}
                  </p>

                  <p className="mt-6 text-sm font-black uppercase tracking-[0.13em] text-white">
                    Scopri la guida →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#123e78] px-7 py-12 text-white md:px-12 md:py-16">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 right-12 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#efc4a4]">
              Instagram
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">
              Europando arriverà presto anche lì.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Presto troverai fotografie, tappe di viaggio, aggiornamenti e
              nuovi contenuti legati alle destinazioni pubblicate sul sito.
            </p>

            <span
              aria-disabled="true"
              className="mt-9 inline-flex min-h-12 cursor-default items-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white/75"
            >
              Instagram in arrivo
            </span>
          </div>
        </div>
      </section>
    </main>
        <Footer
      onHome={() => navigateTo("/")}
      onDestinations={() => navigateTo("/destinazioni")}
    />
  </>
);
}