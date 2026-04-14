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

      <section className="max-w-7xl mx-auto px-6 pt-14 pb-12 md:pt-18 md:pb-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
          Articoli
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-[-0.05em] text-[#123e78]">
          Guide da leggere con calma.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f6875]">
          Una raccolta di articoli pensati per essere chiari, ordinati e facili
          da far crescere nel tempo.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-[1.7rem] border border-[#dbe5ef] bg-white shadow-[0_10px_22px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(20,40,70,0.08)] transition"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                  {post.meta}
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] leading-tight group-hover:text-[#0d62ad] transition">
                  {post.title}
                </h2>

                <p className="mt-4 text-[#5f6875] leading-8">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => navigateTo(`/articoli/${post.slug}`)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#123e78]"
                >
                  Apri articolo <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}