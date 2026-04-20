import Header from "./Header";

export default function NotFoundPage({ logoSrc, navigateTo }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#17202c]">
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="rounded-[2.4rem] border border-[#dbe5ef] bg-white p-10 shadow-[0_18px_45px_rgba(20,40,70,0.07)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
            404
          </p>
          <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-[-0.04em] text-[#123e78]">
            Pagina non trovata
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f6875]">
            L’URL esiste nel browser ma non corrisponde ancora a una pagina pubblicata del sito.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigateTo("/")}
              className="rounded-[1.4rem] bg-[#123e78] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(18,62,120,0.22)]"
            >
              Torna alla home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
