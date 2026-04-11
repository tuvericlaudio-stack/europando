import Header from "../components/Header";

export default function DestinationPage({ logoSrc, destination, navigateTo }) {
  const hasItinerary = Boolean(destination.itineraryDays);
  const hasPracticalInfo = Boolean(destination.practicalInfo);
  const hasFoodGuide = Boolean(destination.foodGuide);

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
          onClick={() => navigateTo("/destinazioni")}
          className="inline-flex items-center gap-2 rounded-[1.3rem] border border-[#cfdbea] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#123e78] shadow-sm hover:bg-[#f8fbff] transition"
        >
          ← Tutte le destinazioni
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-10 md:pt-10">
        <div className="relative overflow-hidden rounded-[2.2rem] min-h-[620px] border border-[#dbe5ef] shadow-[0_22px_55px_rgba(20,50,90,0.10)]">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(8,25,48,0.86)_0%,rgba(8,25,48,0.58)_36%,rgba(8,25,48,0.18)_68%,rgba(8,25,48,0.08)_100%)]" />
          <div className="absolute inset-[18px] rounded-[1.8rem] border border-white/18" />

          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 text-white max-w-4xl">
            <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md">
              {destination.tag}
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl leading-[0.9] font-black tracking-[-0.05em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.22)]">
              {destination.heroTitle}
            </h1>

            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-8 text-white/92">
              {destination.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6 md:py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {destination.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.7rem] border border-[#dbe5ef] bg-white p-6 shadow-[0_10px_24px_rgba(20,40,70,0.05)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a8798]">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#123e78]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        {hasItinerary ? (
          <div className="grid xl:grid-cols-[1.12fr_0.88fr] gap-8 items-start">
            <div className="rounded-[1.8rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                Guida
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                Itinerario
              </h2>

              <div className="mt-8 space-y-6">
                {destination.itineraryDays.map((day, index) => {
                  const dayStyles = [
                    { badge: "🟡", card: "bg-[#fff8d9] border-[#f0df86]" },
                    { badge: "🔴", card: "bg-[#ffe3e3] border-[#f0b2b2]" },
                    { badge: "🟢", card: "bg-[#e8f7e8] border-[#a9d6a9]" },
                    { badge: "⚫", card: "bg-[#f1f1f1] border-[#d4d4d4]" },
                  ];

                  const style = dayStyles[index % dayStyles.length];

                  return (
                    <div
                      key={day.label}
                      className={`rounded-[1.5rem] border p-6 shadow-[0_8px_20px_rgba(20,40,70,0.04)] ${style.card}`}
                    >
                      <h3 className="text-2xl font-black tracking-[-0.02em] text-[#17202c]">
                        {style.badge} {day.label}
                      </h3>

                      <div className="mt-5 rounded-[1.1rem] bg-white/75 p-5">
                        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#123e78]">
                          📍 Itinerario
                        </p>
                        <div className="mt-3 space-y-2 text-[#36404d]">
                          {day.places.map((place) => (
                            <p key={place} className="leading-7">
                              • {place}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.8rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                  Suggerimenti pratici
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                  Arrivare e alloggiare
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#123e78]">
                      ✈️ Aeroporto → centro
                    </p>

                    {hasPracticalInfo ? (
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.practicalInfo.airportToCenter.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 leading-7 text-[#5d6470]">
                        Qui inserirai i consigli pratici su come arrivare dall’aeroporto al centro:
                        taxi, bus, treno, transfer o soluzioni più comode.
                      </p>
                    )}
                  </div>

                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#123e78]">
                      🏨 Dove alloggiare
                    </p>

                    {hasPracticalInfo ? (
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.practicalInfo.whereToStay.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 leading-7 text-[#5d6470]">
                        Qui inserirai le zone consigliate per dormire, con indicazioni semplici su
                        quartieri, comodità e posizione.
                      </p>
                    )}
                  </div>

                  {hasPracticalInfo && destination.practicalInfo.notes?.length > 0 && (
                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-[#123e78]">
                        ℹ️ Note
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.practicalInfo.notes.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {hasFoodGuide && (
                <div className="rounded-[1.8rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                    Dove mangiare
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                    Luoghi utili
                  </h2>

                  <div className="mt-8 space-y-5">
                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Colazione</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.breakfast.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Street food</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.streetFood.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Ristoranti</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.restaurants.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Sera</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.evening.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Strategia</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.strategy.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-8 items-start">
            <div className="rounded-[1.8rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                Guida
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                Come leggere la città
              </h2>

              <div className="mt-8 space-y-6 text-[#5d6470]">
                {destination.sections.map((section) => (
                  <div
                    key={section.title}
                    className="border-b border-[#edf2f7] pb-6 last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-xl font-black tracking-[-0.02em] text-[#17202c]">
                      {section.title}
                    </h3>
                    <p className="mt-3 leading-8">{section.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.8rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                  Suggerimenti pratici
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                  Arrivare e alloggiare
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#123e78]">
                      ✈️ Aeroporto → centro
                    </p>
                    <p className="mt-3 leading-7 text-[#5d6470]">
                      Qui inserirai i consigli pratici su come arrivare dall’aeroporto al centro.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#123e78]">
                      🏨 Dove alloggiare
                    </p>
                    <p className="mt-3 leading-7 text-[#5d6470]">
                      Qui inserirai le zone consigliate per dormire e le note più utili sulla
                      posizione.
                    </p>
                  </div>
                </div>
              </div>

              {hasFoodGuide && (
                <div className="rounded-[1.8rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                    Dove mangiare
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                    Luoghi utili
                  </h2>

                  <div className="mt-8 space-y-5">
                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Colazione</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.breakfast.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Street food</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.streetFood.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Ristoranti</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.restaurants.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Sera</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.evening.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#f8fbff] p-5">
                      <p className="font-bold text-[#17202c]">Strategia</p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.strategy.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Gallery
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#123e78]">
              Atmosfera della destinazione
            </h2>
          </div>
          <p className="max-w-2xl text-[#59606c] leading-8">
            Una pagina interna semplice e coerente con il resto del sito.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {destination.gallery.map((image, index) => (
            <div
              key={image}
              className="relative overflow-hidden rounded-[1.8rem] min-h-[320px] border border-[#dbe5ef] shadow-[0_12px_28px_rgba(20,40,70,0.05)] bg-white"
            >
              <img
                src={image}
                alt={`${destination.name} ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}