import { useState } from "react";
import { Link } from "react-router-dom";

const DESKTOP_LINK_CLASS =
  "inline-flex min-h-11 items-center px-1 text-sm font-bold text-[#11244a] transition hover:text-[#0b67d8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b67d8]";

const MOBILE_LINK_CLASS =
  "flex min-h-14 items-center justify-between border-b border-[#dce6f2] py-4 text-left text-sm font-black text-[#11244a]";

const NAVIGATION_ITEMS = [
  { to: "/destinazioni", label: "Destinazioni" },
  { to: "/articoli", label: "Itinerari" },
  { to: "/articoli", label: "Esperienze" },
];

export default function Header({ logoSrc }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-[#dbe5f0] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 md:min-h-[82px] md:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-h-11 items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b67d8] focus-visible:ring-offset-2"
          aria-label="Vai alla homepage di Europando"
        >
          <img
            src={logoSrc}
            alt="Europando"
            className="h-11 w-auto object-contain md:h-12"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav
            className="flex items-center gap-8"
            aria-label="Navigazione principale"
          >
            {NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={`${item.to}-${index}`}
                to={item.to}
                onClick={closeMenu}
                className={DESKTOP_LINK_CLASS}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/destinazioni"
            onClick={closeMenu}
            className="inline-flex min-h-11 items-center rounded-full bg-[#0b67d8] px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5 hover:bg-[#0857b7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b67d8] focus-visible:ring-offset-2"
          >
            Esplora
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e2ed] bg-white text-[#11244a] transition hover:border-[#0b67d8] md:hidden"
          aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#dbe5f0] bg-white px-5 pb-6 pt-3 md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Navigazione mobile">
            <Link to="/" onClick={closeMenu} className={MOBILE_LINK_CLASS}>
              Home <span aria-hidden="true">→</span>
            </Link>

            {NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={`${item.to}-mobile-${index}`}
                to={item.to}
                onClick={closeMenu}
                className={MOBILE_LINK_CLASS}
              >
                {item.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
