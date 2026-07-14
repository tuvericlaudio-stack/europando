import Header from "../components/Header";

export default function DestinationsPage({
  logoSrc,
  destinations,
  navigateTo,
}) {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#14263d]">
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <main>
        {/* INTRODUZIONE */}
        <section className="border-b border-[#ded4c8]">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c86b4a]">
                  Guide di viaggio
                </p>

                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#123e78] sm:text-6xl md:text-7xl">
                  Destinazioni da vivere con calma.
                </h1>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-xl text-lg leading-8 text-[#5f6875]">
                  Itinerari chiari, consigli pratici e luoghi da scoprire senza
                  trasformare il viaggio in una corsa.
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-[#d6cbbd] pt-6">
                  <span className="text-4xl font-black tracking-[-0.05em] text-[#123e78]">
                    {String(destinations.length).padStart(2, "0")}
                  </span>

                  <span className="max-w-[170px] text-xs font-black uppercase leading-5 tracking-[0.15em] text-[#7b7166]">
                    {destinations.length === 1
                      ? "Guida disponibile"
                      : "Guide disponibili"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ELENCO DESTINAZIONI */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          {destinations.length > 0 ? (
            <div className="space-y-10">
              {destinations.map((destination, index) => (
                <article
                  key={destination.slug}
                  className="group grid overflow-hidden rounded-[2rem] border border-[#ded4c8] bg-white lg:grid-cols-[1.25fr_0.75fr]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo(`/destinazioni/${destination.slug}`)
                    }
                    className="relative min-h-[400px] overflow-hidden text-left md:min-h-[520px]"
                    aria-label={`Apri la guida di ${destination.name}`}
                  >
                    <img
                      src={destination.image}
                      alt={`Veduta di ${destination.name}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071729]/75 via-transparent to-[#071729]/10" />

                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                      {Array.isArray(destination.stats) &&
                        destination.stats.map((stat) => (
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
                  </button>

                  <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                        {destination.tag}
                      </p>

                      <span className="text-sm font-black text-[#b1a697]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[#123e78] md:text-5xl">
                      {destination.name}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-[#5f6875]">
                      {destination.intro ?? destination.text}
                    </p>

                    {destination.intro && (
                      <p className="mt-5 leading-7 text-[#748092]">
                        {destination.text}
                      </p>
                    )}

                    <div className="mt-9">
                      <button
                        type="button"
                        onClick={() =>
                          navigateTo(`/destinazioni/${destination.slug}`)
                        }
                        className="min-h-12 rounded-full bg-[#123e78] px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#0d315f]"
                      >
                        Leggi la guida
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#ded4c8] bg-white p-10 text-center md:p-16">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                Guide in preparazione
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#123e78]">
                Le prime destinazioni arriveranno presto.
              </h2>
            </div>
          )}
        </section>

        {/* METODO */}
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <div className="rounded-[2rem] bg-[#123e78] px-7 py-12 text-white md:px-12 md:py-16">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#efc4a4]">
              Il metodo Europando
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] md:text-5xl">
              Una guida completa prima di pubblicare la successiva.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Ogni destinazione viene organizzata con itinerario, trasporti,
              zone dove dormire, locali e informazioni realmente utili.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}