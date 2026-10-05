import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const quickBenefits = [
  { icon: "🗺️", label: "Itinerari testati" },
  { icon: "€", label: "Costi reali" },
  { icon: "✓", label: "Consigli pratici" },
  { icon: "📷", label: "Foto originali" },
];

const whyCards = [
  {
    title: "Destinazioni complete",
    text: "Guide dettagliate per città e viaggi, con itinerari facili da seguire giorno per giorno.",
  },
  {
    title: "Consigli pratici",
    text: "Trasporti, zone dove dormire, dove mangiare e cosa conviene davvero.",
  },
  {
    title: "Costi trasparenti",
    text: "Prezzi utili e budget realistici aggiunti solo quando abbiamo dati reali.",
  },
  {
    title: "Esperienze autentiche",
    text: "Racconti, foto originali e scelte vissute davvero durante i nostri viaggi.",
  },
];

export default function HomePage({
  heroSrc,
  destinations,
  featuredDestination,
  posts = [],
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchItems = useMemo(() => {
    const destinationItems = destinations.map((destination) => ({
      type: "Destinazione",
      label: destination.name,
      text: destination.intro ?? destination.text,
      to: `/destinazioni/${destination.slug}`,
    }));

    const articleItems = posts.map((post) => ({
      type: "Articolo",
      label: post.title,
      text: post.excerpt,
      to: `/articoli/${post.slug}`,
    }));

    return [...destinationItems, ...articleItems];
  }, [destinations, posts]);

  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = normalizedQuery
    ? searchItems
        .filter((item) =>
          `${item.label} ${item.text ?? ""}`.toLowerCase().includes(normalizedQuery)
        )
        .slice(0, 5)
    : [];

  const primaryDestination = featuredDestination ?? destinations[0] ?? null;

  const handleSearch = (event) => {
    event.preventDefault();

    if (suggestions[0]) {
      navigate(suggestions[0].to);
      return;
    }

    if (normalizedQuery) {
      navigate("/destinazioni");
    }
  };

  return (
    <>
      <main className="bg-[#f4f8fc] text-[#13233f]">
        <section className="relative min-h-[610px] overflow-hidden md:min-h-[650px]">
          <img
            src={heroSrc}
            alt="Viaggi in Europa con Europando"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07172b]/20 via-[#07172b]/38 to-[#07172b]/78" />

          <div className="relative mx-auto flex min-h-[610px] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center md:min-h-[650px] md:px-8">
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
              Viaggi in Europa
              <br />
              senza spendere una fortuna
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/90 md:text-xl">
              Itinerari reali, costi trasparenti e consigli pratici per organizzare i tuoi prossimi viaggi.
            </p>

            <div className="relative mt-8 w-full max-w-2xl text-left">
              <form
                onSubmit={handleSearch}
                className="flex items-center overflow-hidden rounded-full bg-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
              >
                <label htmlFor="travel-search" className="sr-only">
                  Cerca una destinazione o un itinerario
                </label>
                <input
                  id="travel-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Dove vuoi andare?"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-6 py-4 text-base text-[#20304d] outline-none placeholder:text-[#8b98a9]"
                />
                <button
                  type="submit"
                  className="m-1.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0b67d8] text-white transition hover:bg-[#0857b7]"
                  aria-label="Cerca"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </button>
              </form>

              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-[#dbe6f1] bg-white shadow-[0_20px_45px_rgba(12,39,75,0.18)]">
                  {suggestions.map((item) => (
                    <button
                      key={`${item.type}-${item.to}`}
                      type="button"
                      onClick={() => navigate(item.to)}
                      className="flex w-full items-start gap-4 border-b border-[#edf2f7] px-5 py-4 text-left transition last:border-b-0 hover:bg-[#f4f8fc]"
                    >
                      <span className="mt-0.5 rounded-full bg-[#eaf3ff] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#0b67d8]">
                        {item.type}
                      </span>
                      <span>
                        <span className="block font-black text-[#14233f]">{item.label}</span>
                        {item.text && (
                          <span className="mt-1 block line-clamp-1 text-sm text-[#718096]">
                            {item.text}
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {quickBenefits.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/18 bg-[#07172b]/38 px-4 py-3 text-sm font-black text-white backdrop-blur-md"
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0b67d8]">
                Esplora
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#0d1f45] md:text-4xl">
                Destinazioni in evidenza
              </h2>
            </div>
            <Link
              to="/destinazioni"
              className="hidden text-sm font-black text-[#0b67d8] hover:text-[#0857b7] sm:inline"
            >
              Vedi tutte le destinazioni →
            </Link>
          </div>

          {destinations.length > 0 ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.slice(0, 6).map((destination) => (
                <Link
                  key={destination.slug}
                  to={`/destinazioni/${destination.slug}`}
                  className="group relative min-h-[280px] overflow-hidden rounded-[1.35rem] bg-[#dce6f1]"
                >
                  <img
                    src={destination.image}
                    alt={`Veduta di ${destination.name}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06162a]/90 via-[#06162a]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-2xl font-black tracking-[-0.03em] text-white">
                      {destination.name}
                    </h3>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.13em] text-white/70">
                      {destination.country ?? destination.tag}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-[#dce6f1] bg-white p-8 text-center">
              <p className="font-bold text-[#607086]">Nuove destinazioni in preparazione.</p>
            </div>
          )}
        </section>

        <section className="border-y border-[#dfe8f2] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-18">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#0d1f45] md:text-4xl">
              Perché scegliere Europando
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyCards.map((card, index) => (
                <article
                  key={card.title}
                  className="rounded-[1.3rem] border border-[#dce6f1] bg-[#f8fbfe] p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f2ff] text-sm font-black text-[#0b67d8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-black text-[#13233f]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#68778a]">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0b67d8]">
                Dal blog
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#0d1f45] md:text-4xl">
                Ultimi itinerari ed esperienze
              </h2>
            </div>
            <Link
              to="/articoli"
              className="hidden text-sm font-black text-[#0b67d8] hover:text-[#0857b7] sm:inline"
            >
              Vedi tutti gli articoli →
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  to={`/articoli/${post.slug}`}
                  className="group overflow-hidden rounded-[1.35rem] border border-[#dce6f1] bg-white shadow-[0_8px_24px_rgba(20,50,90,0.04)] transition hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-[#dce6f1]">
                    <img
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.13em] text-[#0b67d8]">
                      {post.category}
                    </p>
                    <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.025em] text-[#13233f]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6b7889]">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-[#dce6f1] bg-white p-8 text-center">
              <p className="font-bold text-[#607086]">I prossimi articoli sono in preparazione.</p>
            </div>
          )}
        </section>

        {primaryDestination && (
          <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
            <div className="grid overflow-hidden rounded-[1.7rem] bg-[#0d2c59] text-white lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-7 md:p-10">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9cc8ff]">
                  Da dove iniziare
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">
                  Scopri la guida completa di {primaryDestination.name}.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/75">
                  Itinerario, trasporti, zone, cibo e consigli pratici raccolti in un’unica pagina.
                </p>
              </div>

              <div className="p-7 pt-0 md:p-10 md:pt-0 lg:pt-10 lg:pl-0">
                <Link
                  to={`/destinazioni/${primaryDestination.slug}`}
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#0d2c59] transition hover:-translate-y-0.5"
                >
                  Apri la guida →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
