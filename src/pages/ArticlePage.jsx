import Header from "../components/Header";

export default function ArticlePage({ logoSrc, post, navigateTo }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#17202c]">
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <section className="max-w-7xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigateTo("/articoli")}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#c8d7ea] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#123e78] shadow-sm hover:bg-[#f8fbff] transition"
        >
          ← Tutti gli articoli
        </button>
      </section>

      {post.freeHero ? (
        <section className="max-w-[1700px] mx-auto px-3 md:px-5 pt-8">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-end">
            <div className="relative min-h-[560px] md:min-h-[680px] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="py-6 md:py-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#d8e1ee] bg-[#f8fbff] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#123e78]">
                  {post.category}
                </span>
                <span className="rounded-full border border-[#d8e1ee] bg-[#f8fbff] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#123e78]">
                  {post.meta}
                </span>
              </div>

              <h2 className="mt-6 text-4xl md:text-6xl xl:text-7xl leading-[0.92] font-black tracking-[-0.05em] text-[#123e78]">
                {post.heroTitle}
              </h2>

              <p className="mt-6 max-w-2xl text-lg md:text-xl leading-8 text-[#5d6470]">
                {post.intro}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6 pt-8 pb-10 md:pt-10">
          <div className="relative overflow-hidden rounded-[2.8rem] min-h-[620px] border border-[#d8e1ee] shadow-[0_24px_70px_rgba(20,50,90,0.10)]">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(8,25,48,0.88)_0%,rgba(8,25,48,0.60)_36%,rgba(8,25,48,0.18)_68%,rgba(8,25,48,0.08)_100%)]" />
            <div className="absolute inset-[20px] rounded-[2.2rem] border border-white/18" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 text-white max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md">
                  {post.category}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md">
                  {post.meta}
                </span>
              </div>

              <h2 className="mt-8 text-5xl md:text-7xl leading-[0.9] font-black tracking-[-0.05em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.22)]">
                {post.heroTitle}
              </h2>

              <p className="mt-8 max-w-3xl text-lg md:text-xl leading-8 text-white/92">
                {post.intro}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1600px] mx-auto px-3 md:px-5 pb-20 pt-8">
        <div className="rounded-[2.3rem] border border-[#d8e1ee] bg-white p-6 md:p-10 lg:p-12 shadow-[0_18px_50px_rgba(20,40,70,0.06)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
            Articolo
          </p>
          <h3 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#123e78]">
            Lettura principale
          </h3>

          {post.daySections ? (
            <div className="mt-8 space-y-8">
              {post.daySections.map((dayBlock) => (
                <div
                  key={dayBlock.day}
                  className="rounded-[1.8rem] border border-[#edf2f7] bg-[#fbfdff] p-6 md:p-8"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7a8798]">
                    {dayBlock.day}
                  </p>
                  <h4 className="mt-2 text-2xl md:text-3xl font-black tracking-[-0.02em] text-[#17202c]">
                    {dayBlock.title}
                  </h4>
                  <p className="mt-4 leading-8 text-base md:text-lg text-[#5d6470]">
                    {dayBlock.text}
                  </p>

                  {dayBlock.image && (
                    <div className="relative overflow-hidden rounded-[1.6rem] min-h-[320px] mt-6 border border-[#e6edf5]">
                      <img
                        src={dayBlock.image}
                        alt={dayBlock.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-6">
              {post.sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[1.8rem] border border-[#edf2f7] bg-[#fbfdff] p-6 md:p-8"
                >
                  <h4 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-[#17202c]">
                    {section.title}
                  </h4>
                  <p className="mt-4 leading-8 text-base md:text-lg text-[#5d6470]">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}