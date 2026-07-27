export default function Footer({ onHome, onArticles, onDestinations }) {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (callback) => {
    if (typeof callback === "function") {
      callback();
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#071729] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-18">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.35fr_1fr] md:gap-20">
          {/* IDENTITÀ */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#efc4a4]">
              Travel journal
            </p>

            <button
              type="button"
              onClick={() => handleNavigation(onHome)}
              className="mt-4 text-left text-4xl font-black tracking-[-0.055em] text-white transition hover:text-[#efc4a4] md:text-5xl"
              aria-label="Vai alla homepage di Europando"
            >
              Europando
            </button>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
              Guide di viaggio in Europa con itinerari chiari, informazioni
              pratiche e consigli facili da consultare anche durante il viaggio.
            </p>
          </div>

          {/* NAVIGAZIONE */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#efc4a4]">
                Esplora
              </p>

              <nav
                className="mt-5 flex flex-col items-start gap-2"
                aria-label="Navigazione nel footer"
              >
                <button
                  type="button"
                  onClick={() => handleNavigation(onHome)}
                  className="min-h-11 text-left font-bold text-white/70 transition hover:text-white"
                >
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigation(onDestinations)}
                  className="min-h-11 text-left font-bold text-white/70 transition hover:text-white"
                >
                  Destinazioni
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigation(onArticles)}
                  className="min-h-11 text-left font-bold text-white/70 transition hover:text-white"
                >
                  Articoli
                </button>
              </nav>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#efc4a4]">
                Seguici
              </p>

              <div className="mt-5">
                <a
                  href="https://www.instagram.com/_europando_/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white/75 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PARTE FINALE */}
        <div className="flex flex-col gap-3 pt-7 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Europando</p>

          <p>Viaggiare in Europa, una tappa alla volta.</p>
        </div>
      </div>
    </footer>
  );
}