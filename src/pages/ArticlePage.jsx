import Header from "../components/Header";
import Footer from "../components/Footer";

function ArticleSection({ title, children }) {
  if (!title && !children) return null;

  return (
    <section className="mt-14">
      {title && (
        <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#123e78] sm:text-4xl">
          {title}
        </h2>
      )}

      {children && (
        <div className="mt-6 space-y-6 text-lg leading-8 text-[#4d5d70]">
          {children}
        </div>
      )}
    </section>
  );
}

export default function ArticlePage({
  article,
  navigateHome,
  navigateDestinations,
  navigateToGuide,
}) {
  if (!article) {
    return (
      <div className="min-h-screen bg-[#f7f4ee]">
        <Header
          onHome={navigateHome}
          onDestinations={navigateDestinations}
        />

        <main className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c86b4a]">
            Europando
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] text-[#123e78] md:text-6xl">
            Articolo non disponibile
          </h1>
        </main>

        <Footer
          onHome={navigateHome}
          onDestinations={navigateDestinations}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <Header
        onHome={navigateHome}
        onDestinations={navigateDestinations}
      />

      <main>
        <article>
          {/* HERO */}
          <header className="relative overflow-hidden bg-[#123e78]">
            <div className="relative min-h-[620px]">
              <img
                src={article.heroImage}
                alt={article.heroAlt || article.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071a31]/95 via-[#071a31]/45 to-[#071a31]/15" />

              <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-5 pb-16 pt-24 md:px-8 md:pb-20">
                <div className="max-w-4xl">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1b49d]">
                    Racconto di viaggio
                  </p>

                  <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl">
                    {article.title}
                  </h1>

                  {article.subtitle && (
                    <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
                      {article.subtitle}
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-white/70">
                    {article.author && <span>{article.author}</span>}

                    {article.author && article.date && (
                      <span aria-hidden="true">•</span>
                    )}

                    {article.date && <span>{article.date}</span>}

                    {article.readingTime && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>{article.readingTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* CORPO ARTICOLO */}
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="mx-auto w-full max-w-3xl">
              {article.intro && (
                <p className="text-2xl font-semibold leading-10 tracking-[-0.02em] text-[#243b57]">
                  {article.intro}
                </p>
              )}

              {article.sections?.map((section, index) => (
                <ArticleSection key={`${section.title}-${index}`} title={section.title}>
                  {section.paragraphs?.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}

                  {section.image && (
                    <figure className="mt-9 overflow-hidden rounded-[2rem] bg-[#e8dfd4]">
                      <img
                        src={section.image}
                        alt={section.imageAlt || section.title}
                        loading="lazy"
                        className="max-h-[760px] w-full object-cover"
                      />

                      {section.caption && (
                        <figcaption className="px-5 py-4 text-sm leading-6 text-[#6f7c8c]">
                          {section.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {section.quote && (
                    <blockquote className="mt-9 border-l-4 border-[#c86b4a] pl-6 text-2xl font-bold leading-9 text-[#123e78]">
                      {section.quote}
                    </blockquote>
                  )}
                </ArticleSection>
              ))}

              {/* GALLERIA FACOLTATIVA */}
              {article.gallery?.length > 0 && (
                <section className="mt-16">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c86b4a]">
                    Fotografie
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#123e78] sm:text-4xl">
                    Alcuni momenti del viaggio
                  </h2>

                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    {article.gallery.map((image, index) => (
                      <figure
                        key={`${image.src}-${index}`}
                        className="aspect-[3/4] overflow-hidden rounded-[1.8rem] bg-[#e8dfd4]"
                      >
                        <img
                          src={image.src}
                          alt={image.alt || `Bucarest, fotografia ${index + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {/* COLLEGAMENTO ALLA GUIDA */}
              <section className="mt-16 rounded-[2rem] bg-[#123e78] px-7 py-10 text-white sm:px-10 sm:py-12">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1b49d]">
                  Organizza il viaggio
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                  Vuoi visitare Bucarest?
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Consulta la guida pratica con itinerario, trasporti e luoghi
                  dove mangiare.
                </p>

                <button
                  type="button"
                  onClick={navigateToGuide}
                  className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[#123e78] transition hover:-translate-y-0.5 hover:bg-[#f4eee7]"
                >
                  Apri la guida di Bucarest
                </button>
              </section>
            </div>

            {/* COLONNA LATERALE */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 rounded-[1.8rem] border border-[#e0d7cb] bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[0.17em] text-[#c86b4a]">
                  In questo articolo
                </p>

                <div className="mt-5 space-y-4">
                  {article.sections
                    ?.filter((section) => section.title)
                    .map((section, index) => (
                      <div
                        key={`${section.title}-${index}`}
                        className="border-b border-[#eee7de] pb-4 text-sm font-bold leading-6 text-[#526276] last:border-0 last:pb-0"
                      >
                        {section.title}
                      </div>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer
        onHome={navigateHome}
        onDestinations={navigateDestinations}
      />
    </div>
  );
}