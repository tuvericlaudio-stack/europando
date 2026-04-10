import Header from "../components/Header";

export default function ArticlesPage({ logoSrc, posts, navigateTo }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#17202c]">
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-10 md:pt-10">
        <div className="rounded-[2.8rem] border border-[#d8e1ee] bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(20,40,70,0.08)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
            Journal
          </p>
          <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-[-0.04em] text-[#123e78]">
            Tutti gli articoli
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555d69]">
            Una raccolta ordinata degli articoli del journal, pronta da ampliare con contenuti reali.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-[2.2rem] border border-[#d8e1ee] bg-white shadow-[0_14px_35px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,40,70,0.10)] transition"
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

              <div className="p-8">
                <h3 className="text-2xl font-black tracking-[-0.02em] leading-tight group-hover:text-[#0d62ad] transition">
                  {post.title}
                </h3>
                <p className="mt-4 text-[#5d6470] leading-8">{post.excerpt}</p>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigateTo(`/articoli/${post.slug}`)}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#123e78]"
                  >
                    Leggi articolo <span>→</span>
                  </button>
                  <span className="rounded-full border border-[#d8e1ee] bg-[#f8fbff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#123e78]">
                    Route note
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}