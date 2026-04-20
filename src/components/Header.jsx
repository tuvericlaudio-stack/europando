export default function Header({ logoSrc, onHome, onArticles, onDestinations }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dde6f0] bg-white/88 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <button type="button" onClick={onHome} className="flex items-center gap-4 min-w-0 text-left">
          <img
            src={logoSrc}
            alt="Logo Europando"
            className="h-14 md:h-16 w-auto object-contain shrink-0"
          />
          <div className="min-w-0 hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7a8798]">
              Travel journal
            </p>
            <h1 className="mt-1 text-xl md:text-2xl font-black tracking-[0.03em] text-[#123e78]">
              Europando
            </h1>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.16em] text-[#5e6a79]">
          <button type="button" onClick={onHome} className="hover:text-[#123e78] transition">
            Home
          </button>
          <button type="button" onClick={onArticles} className="hover:text-[#123e78] transition">
            Articoli
          </button>
          <button type="button" onClick={onDestinations} className="hover:text-[#123e78] transition">
            Destinazioni
          </button>
        </nav>
      </div>
    </header>
  );
}