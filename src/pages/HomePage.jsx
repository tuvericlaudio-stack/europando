import { Link } from "react-router-dom";
// La home viene pubblicata anche nelle anteprime automatiche delle PR.
import Footer from "../components/Footer";

const valuePoints = [
  {
    eyebrow: "Itinerari reali",
    title: "Giorno per giorno",
    text: "Percorsi costruiti a partire da viaggi realmente fatti, con un ordine facile da seguire.",
  },
  {
    eyebrow: "Costi e scelte",
    title: "Informazioni concrete",
    text: "Trasporti, zone dove dormire, cibo e alternative per capire prima cosa conviene davvero.",
  },
  {
    eyebrow: "Esperienza diretta",
    title: "Non solo liste",
    text: "Raccontiamo cosa ci è piaciuto, cosa salteremmo e quali esperienze ci hanno sorpreso.",
  },
];

export default function HomePage({
  heroSrc,
  destinations,
  featuredDestination,
  posts = [],
}) {
  const primaryDestination =
    featuredDestination ?? destinations[0] ?? null;
  const featuredPost = posts[0] ?? null;

  const destinationPath = primaryDestination
    ? `/destinazioni/${primaryDestination.slug}`
    : "/destinazioni";

  return (
    <>
      <main className="bg-[#f7f4ee] text-[#14263d]">
        <section className="relative min-h-[700px] overflow-hidden md:min-h-[790px]">
          <img
            src={heroSrc}
            alt="Viaggio in Europa con Europando"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#061321]/95 via-[#102a46]/74 to-[#102a46]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/88 via-transparent to-[#061321]/28" />

          <div className="relative mx-auto flex min-h-[700px] max-w-7xl flex-col justify-end px-5 pb-16 pt-16 md:min-h-[790px] md:px-8 md:pb-24">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#efc4a4]">
                Viaggi veri · costi reali · consigli pratici
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl md:text-[5.9rem]">
                Viaggiare in Europa senza spendere una fortuna.
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white md:text-2xl md:leading-9">
                Itinerari provati, esperienze personali e informazioni concrete
                per organizzare il tuo prossimo viaggio con meno dubbi.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to={destinationPath}
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-[#123e78] shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#f3eee7]"
                >
                  {primaryDestination
                    ? `Scopri ${primaryDestination.name}`
                    : "Scopri le destinazioni"}
                </Link>

                <a
                  href="#come-ti-aiutiamo"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white backdrop-blur-md transition hover:bg-white hover:text-[#123e78]"
                >
                  Come funziona Europando
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-[#071729]/40 px-5 py-4 backdrop-blur-md">
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-[#efc4a4]">01</p>
                  <p className="mt-2 font-black text-white">Itinerari testati</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-[#071729]/40 px-5 py-4 backdrop-blur-md">
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-[#efc4a4]">02</p>
                  <p className="mt-2 font-black text-white">Costi e trasporti</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-[#071729]/40 px-5 py-4 backdrop-blur-md">
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-[#efc4a4]">03</p>
                  <p className="mt-2 font-black text-white">Esperienze vere</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="come-ti-aiutiamo"
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                Il progetto
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] text-[#123e78] md:text-5xl">
                Meno contenuti generici. Più informazioni che useresti davvero.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#5f6875]">
                Europando nasce dai nostri viaggi. Non vogliamo limitarci a
                elencare attrazioni: raccogliamo itinerari, spostamenti,
                indirizzi, impressioni e scelte che possono aiutarti a
                organizzare meglio il tuo viaggio.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {valuePoints.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-[#ddd2c4] bg-white p-6"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#c86b4a]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[#123e78]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#6c7887]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {primaryDestination && (
          <section
            id="guida-in-evidenza"
            className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28"
          >
            <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                  Guida in evidenza
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#123e78] md:text-5xl">
                  Parti da un itinerario già pronto.
                </h2>
              </div>

              <Link
                to="/destinazioni"
                className="self-start text-sm font-black uppercase tracking-[0.13em] text-[#123e78] transition hover:text-[#c86b4a] md:self-auto"
              >
                Tutte le destinazioni →
              </Link>
            </div>

            <article className="group grid overflow-hidden rounded-[2rem] border border-[#dfd4c7] bg-white lg:grid-cols-[1.25fr_1fr]">
              <div className="relative min-h-[390px] overflow-hidden md:min-h-[540px]">
                <img
                  src={primaryDestination.image}
                  alt={`Veduta di ${primaryDestination.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071729]/72 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                  {Array.isArray(primaryDestination.stats) &&
                    primaryDestination.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-full border border-white/25 bg-[#071729]/58 px-4 py-2 text-sm text-white backdrop-blur-md"
                      >
                        <span className="text-white/65">{stat.label}: </span>
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

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#f5f1eb] px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.13em] text-[#c86b4a]">
                      Dentro la guida
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#14263d]">
                      Itinerario giorno per giorno
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f5f1eb] px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.13em] text-[#c86b4a]">
                      Informazioni utili
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#14263d]">
                      Trasporti, zone e cibo
                    </p>
                  </div>
                </div>

                <div className="mt-9">
                  <Link
                    to={`/destinazioni/${primaryDestination.slug}`}
                    className="inline-flex min-h-12 items-center rounded-full bg-[#123e78] px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#0d315f]"
                  >
                    Leggi la guida completa
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        {featuredPost && (
          <section className="bg-[#102a46]">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#efc4a4]">
                  Esperienza personale
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                  Il viaggio raccontato senza filtri.
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/70">
                  Oltre alle guide pratiche pubblichiamo racconti di viaggio:
                  cosa abbiamo fatto davvero, cosa ci ha sorpreso e quali scelte
                  rifaremmo.
                </p>
              </div>

              <Link
                to={`/articoli/${featuredPost.slug}`}
                className="group rounded-[2rem] border border-white/12 bg-white/8 p-7 transition hover:bg-white/12 md:p-9"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#efc4a4]">
                  {featuredPost.category}
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                  {featuredPost.title}
                </h3>
                <p className="mt-4 max-w-2xl leading-7 text-white/72">
                  {featuredPost.excerpt}
                </p>
                <p className="mt-7 text-sm font-black uppercase tracking-[0.13em] text-white">
                  Leggi il racconto →
                </p>
              </Link>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="rounded-[2rem] border border-[#dfd4c7] bg-white p-7 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c86b4a]">
                  Il prossimo passo
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] text-[#123e78] md:text-5xl">
                  Una destinazione alla volta, con contenuti sempre più completi.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f6875]">
                  Stiamo trasformando ogni viaggio in più contenuti utili:
                  itinerari, trasporti, costi, indirizzi e racconti personali.
                  Le nuove guide saranno pubblicate solo quando saranno pronte.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/articoli"
                  className="inline-flex min-h-12 items-center rounded-full bg-[#123e78] px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#0d315f]"
                >
                  Leggi gli articoli
                </Link>
                <Link
                  to="/destinazioni"
                  className="inline-flex min-h-12 items-center rounded-full border border-[#cfc3b5] px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-[#123e78] transition hover:border-[#123e78]"
                >
                  Esplora le guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#123e78] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 right-12 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#efc4a4]">
                Seguici
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">
                Il viaggio continua anche su Instagram.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Fotografie, tappe, piccoli consigli e aggiornamenti sulle nuove
                destinazioni pubblicate su Europando.
              </p>

              <a
                href="https://www.instagram.com/_europando_/"
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex min-h-12 items-center rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-[#123e78] transition hover:-translate-y-0.5 hover:bg-[#f3eee7]"
              >
                Seguici su Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
