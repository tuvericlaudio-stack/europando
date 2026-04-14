export default function HomePage({
  heroSrc,
  featuredPosts,
  destinations,
  navigateTo,
}) {
  const visibleDestinations = destinations.filter(
    (destination) => destination.slug === "bucarest"
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#17202c]">
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-24 md:pt-20 md:pb-28">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-12 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#7a8798]">
              Travel journal
            </p>

            <h1 className="mt-4 text-5xl md:text-7xl xl:text-8xl leading-[0.88] font-black tracking-[-0.06em] text-[#123e78]">
              Europando
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-8 text-[#5f6875]">
              Guide di viaggio ordinate, destinazioni chiare e articoli leggibili
              per costruire il sito una tappa alla volta, senza dispersione.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo("/destinazioni/bucarest")}
                className="rounded-[1.3rem] bg-[#123e78] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(18,62,120,0.22)]"
              >
                Vai a Bucarest
              </button>

              <button
                onClick={() => navigateTo("/articoli")}
                className="rounded-[1.3rem] border border-[#cfdae8] bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#123e78] shadow-sm hover:bg-[#f8fbff] transition"
              >
                Leggi gli articoli
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.3rem] min-h-[600px] border border-[#dbe5ef] shadow-[0_26px_65px_rgba(20,50,90,0.10)]">
            <img
              src={heroSrc}
              alt="Hero Europando"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123e78]/18 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Destinazione in evidenza
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.04em] text-[#123e78]">
              Bucarest
            </h2>
          </div>

          <button
            onClick={() => navigateTo("/destinazioni/bucarest")}
            className="text-sm font-bold uppercase tracking-[0.14em] text-[#123e78]"
          >
            Apri la pagina →
          </button>
        </div>

        <div className="mt-10 grid gap-6">
          {visibleDestinations.map((destination) => (
            <button
              key={destination.slug}
              onClick={() => navigateTo(`/destinazioni/${destination.slug}`)}
              className="group text-left overflow-hidden rounded-[2rem] border border-[#dbe5ef] bg-white shadow-[0_16px_34px_rgba(20,40,70,0.06)] hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(20,40,70,0.10)] transition"
            >
              <div className="grid lg:grid-cols-[1.04fr_0.96fr] min-h-[470px]">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123e78]/88 via-[#123e78]/26 to-transparent" />

                  <div className="absolute top-6 left-6 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {destination.tag}
                  </div>

                  <div className="absolute left-6 bottom-6 right-6">
                    <h3 className="text-4xl md:text-5xl font-black tracking-[-0.05em] text-white">
                      {destination.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm md:text-base leading-7 text-white/90">
                      {destination.intro}
                    </p>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                      Prima guida disponibile
                    </p>

                    <p className="mt-4 text-lg leading-8 text-[#5f6875]">
                      {destination.text}
                    </p>

                    <div className="mt-8 grid sm:grid-cols-3 gap-4">
                      {destination.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-[1.15rem] border border-[#e5ecf5] bg-[#f8fbff] p-4"
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
                  </div>

                  <div className="mt-8 border-t border-[#edf2f7] pt-6">
                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#123e78]">
                      Scopri la guida <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Articoli
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.04em] text-[#123e78]">
              Le guide da leggere
            </h2>
          </div>

          <button
            onClick={() => navigateTo("/articoli")}
            className="text-sm font-bold uppercase tracking-[0.14em] text-[#123e78]"
          >
            Vedi tutto →
          </button>
        </div>

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-[1.6rem] border border-[#dbe5ef] bg-white shadow-[0_10px_22px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(20,40,70,0.08)] transition"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/38 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                  {post.meta}
                </div>

                <h3 className="mt-3 text-2xl font-black tracking-[-0.02em] leading-tight group-hover:text-[#0d62ad] transition">
                  {post.title}
                </h3>

                <p className="mt-4 text-[#5f6875] leading-8">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => navigateTo(`/articoli/${post.slug}`)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#123e78]"
                >
                  Leggi articolo <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-[2.3rem] border border-[#dbe5ef] bg-white p-10 md:p-14 text-center shadow-[0_18px_45px_rgba(20,40,70,0.07)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
            Progetto in crescita
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-[-0.04em] text-[#123e78]">
            Una base pulita da far crescere bene.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto leading-8 text-[#5f6875]">
            Per ora il sito parte da Bucarest. Le prossime destinazioni si
            aggiungeranno con la stessa struttura, in modo ordinato e coerente.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigateTo("/destinazioni/bucarest")}
              className="rounded-[1.3rem] bg-[#123e78] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(18,62,120,0.22)]"
            >
              Vai a Bucarest
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}