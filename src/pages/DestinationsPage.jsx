import Header from "../components/Header";

export default function DestinationsPage({ logoSrc, destinations, navigateTo }) {
  const sectionLabel =
    destinations.length === 1 ? "Destinazione disponibile" : "Destinazioni pubblicate";

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#17202c]">
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
          Destinazioni
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.04em] text-[#123e78]">
          Una base chiara, una città alla volta.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f6875]">
          Europando mostra solo le guide già pronte, così il progetto cresce con una
          struttura coerente e senza pagine lasciate a metà.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-6">
          {destinations.map((destination) => (
            <button
              type="button"
              key={destination.slug}
              onClick={() => navigateTo(`/destinazioni/${destination.slug}`)}
              className="group text-left overflow-hidden rounded-[1.9rem] border border-[#dbe5ef] bg-white shadow-[0_12px_28px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,40,70,0.08)] transition"
            >
              <div className="grid lg:grid-cols-[1.05fr_0.95fr] min-h-[440px]">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123e78]/82 via-[#123e78]/24 to-transparent" />
                  <div className="absolute top-5 left-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {destination.tag}
                  </div>
                  <h2 className="absolute left-6 bottom-6 text-4xl md:text-5xl font-black tracking-[-0.03em] text-white">
                    {destination.name}
                  </h2>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                    {sectionLabel}
                  </p>

                  <p className="mt-4 text-lg leading-8 text-[#5f6875]">
                    {destination.text}
                  </p>

                  <div className="mt-8 grid sm:grid-cols-3 gap-4">
                    {destination.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.2rem] border border-[#e5ecf5] bg-[#f8fbff] p-4"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-xl font-black text-[#123e78]">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#123e78]">
                    Apri la pagina <span>→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
