export default function HomePage({
  heroSrc,
  featuredPosts,
  destinations,
  navigateTo,
}) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#17202c]">
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Travel journal
            </p>

            <h1 className="mt-4 text-5xl md:text-7xl xl:text-8xl leading-[0.9] font-black tracking-[-0.05em] text-[#123e78]">
              Europando
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-8 text-[#5f6875]">
              Guide di viaggio ordinate, destinazioni chiare e itinerari leggibili
              per avere subito un quadro completo.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo("/destinazioni")}
                className="rounded-[1.4rem] bg-[#123e78] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(18,62,120,0.22)]"
              >
                Vai alle destinazioni
              </button>

              <button
                onClick={() => navigateTo("/articoli")}
                className="rounded-[1.4rem] border border-[#cfdae8] bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#123e78] shadow-sm hover:bg-[#f8fbff] transition"
              >
                Leggi gli articoli
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.4rem] min-h-[560px] border border-[#dbe5ef] shadow-[0_24px_60px_rgba(20,50,90,0.10)]">
            <img
              src={heroSrc}
              alt="Hero Europando"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14 md:pb-18">
        <div className="rounded-[1.9rem] border border-[#dbe5ef] bg-white p-8 md:p-10 shadow-[0_16px_40px_rgba(20,40,70,0.06)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
            Come orientarsi
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#123e78]">
            Una struttura semplice da leggere
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-[1.4rem] border border-[#e5ecf5] bg-[#f8fbff] p-6">
              <h3 className="text-xl font-black tracking-[-0.02em] text-[#17202c]">
                Destinazioni
              </h3>
              <p className="mt-3 leading-8 text-[#5f6875]">
                Pagine città con guida rapida, itinerario o lettura sintetica.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-[#e5ecf5] bg-[#f8fbff] p-6">
              <h3 className="text-xl font-black tracking-[-0.02em] text-[#17202c]">
                Itinerari
              </h3>
              <p className="mt-3 leading-8 text-[#5f6875]">
                Percorsi distribuiti bene, pensati per giorni e senza confusione.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-[#e5ecf5] bg-[#f8fbff] p-6">
              <h3 className="text-xl font-black tracking-[-0.02em] text-[#17202c]">
                Articoli
              </h3>
              <p className="mt-3 leading-8 text-[#5f6875]">
                Guide e racconti organizzati in modo chiaro, da leggere con facilità.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14 md:pb-18">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Destinazioni
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#123e78]">
              Le città principali
            </h2>
          </div>

          <button
            onClick={() => navigateTo("/destinazioni")}
            className="text-sm font-bold uppercase tracking-[0.14em] text-[#123e78]"
          >
            Vedi tutto →
          </button>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <button
              key={destination.slug}
              onClick={() => navigateTo(`/destinazioni/${destination.slug}`)}
              className="text-left overflow-hidden rounded-[1.9rem] border border-[#dbe5ef] bg-white shadow-[0_12px_28px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,40,70,0.08)] transition"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123e78]/82 via-[#123e78]/24 to-transparent" />
                <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {destination.tag}
                </div>
                <h3 className="absolute left-6 bottom-5 text-3xl font-black tracking-[-0.03em] text-white">
                  {destination.name}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-[#5f6875] leading-7">{destination.text}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-18 md:pb-22">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Articoli
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#123e78]">
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
              className="group overflow-hidden rounded-[1.9rem] border border-[#dbe5ef] bg-white shadow-[0_12px_28px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,40,70,0.10)] transition"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {post.category}
                </div>
                <div className="absolute left-5 bottom-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {post.meta}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black tracking-[-0.02em] leading-tight group-hover:text-[#0d62ad] transition">
                  {post.title}
                </h3>
                <p className="mt-4 text-[#5f6875] leading-8">{post.excerpt}</p>

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

      <section className="max-w-7xl mx-auto px-6 pb-22">
        <div className="rounded-[2.4rem] border border-[#dbe5ef] bg-white p-10 md:p-14 text-center shadow-[0_18px_45px_rgba(20,40,70,0.07)]">
          <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#123e78]">
            Viaggi costruiti con ordine, senza confusione.
          </h2>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigateTo("/destinazioni")}
              className="rounded-[1.4rem] bg-[#123e78] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(18,62,120,0.22)]"
            >
              Esplora le destinazioni
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}