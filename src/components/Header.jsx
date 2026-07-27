import { useState } from "react";
import { Link } from "react-router-dom";

const DESKTOP_LINK_CLASS =
  "min-h-11 px-1 text-xs font-black uppercase tracking-[0.15em] text-[#5f6875] transition hover:text-[#123e78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123e78] inline-flex items-center";

const MOBILE_LINK_CLASS =
  "flex min-h-14 items-center justify-between border-b border-[#e1d8cc] py-4 text-left text-sm font-black uppercase tracking-[0.14em] text-[#14263d]";

const NAVIGATION_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/destinazioni", label: "Destinazioni" },
  { to: "/articoli", label: "Articoli" },
];

export default function Header({ logoSrc }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-[#dfd6ca] bg-[#f7f4ee]/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-5 md:min-h-[88px] md:px-8">
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-h-11 min-w-0 items-center gap-3 rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123e78] focus-visible:ring-offset-2"
          aria-label="Vai alla homepage di Europando"
        >
          <img
            src={logoSrc}
            alt=""
            className="h-11 w-auto shrink-0 object-contain md:h-13"
          />

          <div className="min-w-0">
            <p className="hidden text-[9px] font-black uppercase tracking-[0.24em] text-[#c86b4a] sm:block">
              Travel journal
            </p>

            <p className="text-xl font-black tracking-[-0.03em] text-[#123e78] md:mt-1 md:text-2xl">
              Europando
            </p>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-7 md:flex">
          <nav
            className="flex items-center gap-7"
            aria-label="Navigazione principale"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.to}
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
            className="inline-flex min-h-11 items-center rounded-full bg-[#123e78] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#0d315f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123e78] focus-visible:ring-offset-2"
          >
            Esplora le guide
          </Link>
        </div>

        {/* PULSANTE MOBILE */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7ccbe] bg-white text-[#123e78] transition hover:border-[#123e78] md:hidden"
          aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#dfd6ca] bg-[#f7f4ee] px-5 pb-6 pt-4 md:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col"
            aria-label="Navigazione mobile"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={MOBILE_LINK_CLASS}
              >
                {item.label}

                <span aria-hidden="true" className="text-[#c86b4a]">
                  →
                </span>
              </Link>
            ))}

            <Link
              to="/destinazioni"
              onClick={closeMenu}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#123e78] px-6 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white"
            >
              Esplora le guide
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
