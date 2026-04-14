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
  <div className="relative overflow-hidden rounded-[2.4rem] min-h-[680px] border border-[#dbe5ef] shadow-[0_26px_65px_rgba(20,50,90,0.12)]">
    <img
      src={destination.image}
      alt={destination.name}
      className="absolute inset-0 h-full w-full object-cover"
    />

    <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(7,21,42,0.88)_0%,rgba(7,21,42,0.66)_34%,rgba(7,21,42,0.24)_66%,rgba(7,21,42,0.10)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_34%)]" />
    <div className="absolute inset-[20px] rounded-[2rem] border border-white/18" />

    <div className="relative z-10 flex min-h-[680px] flex-col justify-between p-8 md:p-12">
      <div>
        <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
          {destination.tag}
        </span>
      </div>

      <div className="max-w-4xl text-white">
        <h1 className="text-5xl md:text-7xl xl:text-8xl leading-[0.88] font-black tracking-[-0.06em] drop-shadow-[0_4px_14px_rgba(0,0,0,0.24)]">
          {destination.heroTitle}
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-8 text-white/90">
          {destination.intro}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl">
          {destination.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.2rem] border border-white/16 bg-white/10 px-4 py-4 backdrop-blur-md"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-black text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
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

              <div className="mt-10 relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#d9e3ef]" />

                <div className="space-y-10">
                  {destination.itineraryDays.map((day, index) => {
                    const tones = [
                      {
                        wrapper: "border-[#efe2a8] bg-[#fffdf3]",
                        point: "border-[#eadb96] bg-[#fff8d9]",
                        item: "border-[#f4ecd0] bg-white",
                      },
                      {
                        wrapper: "border-[#ead4d4] bg-[#fff8f8]",
                        point: "border-[#e4c1c1] bg-[#ffecec]",
                        item: "border-[#f1dede] bg-white",
                      },
                      {
                        wrapper: "border-[#d8e8d8] bg-[#f7fcf7]",
                        point: "border-[#bfd8bf] bg-[#edf8ed]",
                        item: "border-[#deedde] bg-white",
                      },
                      {
                        wrapper: "border-[#dfdfdf] bg-[#fcfcfc]",
                        point: "border-[#d0d0d0] bg-[#f3f3f3]",
                        item: "border-[#e6e6e6] bg-white",
                      },
                    ];

                    const tone = tones[index % tones.length];

                    return (
                      <div key={day.label} className="relative pl-16">
                        <div
                          className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black text-[#123e78] shadow-sm ${tone.point}`}
                        >
                          {index + 1}
                        </div>

                        <div
                          className={`rounded-[1.4rem] border p-6 shadow-[0_8px_18px_rgba(20,40,70,0.03)] ${tone.wrapper}`}
                        >
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                            Giorno
                          </p>
                          <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#17202c]">
                            {day.label}
                          </h3>

                          <div className="mt-5 space-y-3 text-[#4f5865]">
                            {day.places.map((place) => (
                              <div
                                key={place}
                                className={`rounded-[1rem] border px-4 py-3 ${tone.item}`}
                              >
                                {place}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.9rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                  Suggerimenti pratici
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                  Muoversi e dormire
                </h2>
                <p className="mt-4 leading-7 text-[#5f6875]">
                  Le informazioni essenziali per entrare in città bene e scegliere
                  una base comoda da cui partire.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                      Aeroporto → centro
                    </p>

                    {hasPracticalInfo ? (
                      <div className="mt-3 space-y-3 text-[#5d6470]">
                        {destination.practicalInfo.airportToCenter.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 leading-7 text-[#5d6470]">
                        Qui inserirai i consigli pratici su come arrivare dall’aeroporto al centro.
                      </p>
                    )}
                  </div>

                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                      Dove alloggiare
                    </p>

                    {hasPracticalInfo ? (
                      <div className="mt-3 space-y-3 text-[#5d6470]">
                        {destination.practicalInfo.whereToStay.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
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
                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Note utili
                      </p>
                      <div className="mt-3 space-y-3 text-[#5d6470]">
                        {destination.practicalInfo.notes.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {hasFoodGuide && (
                <div className="rounded-[1.9rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                    Dove mangiare
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                    Dove mangiare bene
                  </h2>
                  <p className="mt-4 leading-7 text-[#5f6875]">
                    Una selezione semplice, utile da consultare senza spezzare troppo le giornate.
                  </p>

                  <div className="mt-8 space-y-5">
                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Colazione
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.breakfast.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Street food
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.streetFood.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Ristoranti
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.restaurants.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Sera
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.evening.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
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
              <div className="rounded-[1.9rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                  Suggerimenti pratici
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                  Muoversi e dormire
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                      Aeroporto → centro
                    </p>
                    <p className="mt-3 leading-7 text-[#5d6470]">
                      Qui inserirai i consigli pratici su come arrivare dall’aeroporto al centro.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                      Dove alloggiare
                    </p>
                    <p className="mt-3 leading-7 text-[#5d6470]">
                      Qui inserirai le zone consigliate per dormire e le note più utili sulla
                      posizione.
                    </p>
                  </div>
                </div>
              </div>

              {hasFoodGuide && (
                <div className="rounded-[1.9rem] border border-[#dbe5ef] bg-white p-8 shadow-[0_16px_36px_rgba(20,40,70,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
                    Dove mangiare
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#123e78]">
                    Dove mangiare bene
                  </h2>

                  <div className="mt-8 space-y-5">
                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Colazione
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.breakfast.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Street food
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.streetFood.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Ristoranti
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.restaurants.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-[#e4ebf4] bg-[#fbfdff] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8798]">
                        Sera
                      </p>
                      <div className="mt-3 space-y-2 text-[#5d6470]">
                        {destination.foodGuide.evening.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-[#edf2f7] bg-white px-4 py-3"
                          >
                            {item}
                          </div>
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
              Bucarest in immagini
            </h2>
          </div>
          <p className="max-w-2xl text-[#59606c] leading-8">
            Una chiusura visiva pensata per restituire il ritmo, i contrasti e l’atmosfera della città.
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