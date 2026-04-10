import Header from "../components/Header";

export default function DestinationsPage({ logoSrc, destinations, navigateTo }) {
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
            Destinazioni
          </p>
          <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-[-0.04em] text-[#123e78]">
            Tutte le destinazioni
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555d69]">
            Una raccolta ordinata delle città del sito, pronta da ampliare con guide complete.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <button
              key={destination.slug}
              onClick={() => navigateTo(`/destinazioni/${destination.slug}`)}
              className="text-left relative overflow-hidden rounded-[2.2rem] border border-[#d8e1ee] bg-white shadow-[0_14px_35px_rgba(20,40,70,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,40,70,0.08)] transition"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123e78]/82 via-[#123e78]/22 to-transparent" />
                <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {destination.tag}
                </div>
                <h3 className="absolute left-6 bottom-5 text-3xl font-black tracking-[-0.03em] text-white">
                  {destination.name}
                </h3>
              </div>

              <div className="p-8">
                <p className="text-[#5d6470] leading-8">{destination.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#123e78]">
                  Vai alla guida <span>→</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}