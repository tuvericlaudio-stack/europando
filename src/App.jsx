import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import DestinationPage from "./pages/DestinationPage";
import ArticlesPage from "./pages/ArticlesPage";
import DestinationsPage from "./pages/DestinationsPage";
import { featuredPosts } from "./data/posts";
import { destinations } from "./data/destinations";

export default function App() {
  const logoSrc = "/europando/logo-europando.png";
  const heroSrc = "/europando/hero-europando.png";
  const basePath = "/europando";

  const normalizePath = (path) => {
    if (!path) return "/";
    const cleaned = path.replace(/\/+$/, "");
    return cleaned === "" ? "/" : cleaned;
  };

  const stripBasePath = (pathname) => {
    const normalizedPathname = normalizePath(pathname);

    if (normalizedPathname === basePath) {
      return "/";
    }

    if (normalizedPathname.startsWith(`${basePath}/`)) {
      return normalizePath(normalizedPathname.slice(basePath.length));
    }

    return normalizedPathname;
  };

  const getRouteFromPath = (pathname) => {
    const path = stripBasePath(pathname);

    if (path === "/") return { type: "home" };
    if (path === "/articoli") return { type: "articles" };
    if (path === "/destinazioni") return { type: "destinations" };

    const postPrefix = "/articoli/";
    const destinationPrefix = "/destinazioni/";

    if (path.startsWith(postPrefix)) {
      return { type: "post", slug: path.slice(postPrefix.length) };
    }

    if (path.startsWith(destinationPrefix)) {
      return { type: "destination", slug: path.slice(destinationPrefix.length) };
    }

    return { type: "not_found" };
  };

  const [route, setRoute] = useState(() =>
    getRouteFromPath(window.location.pathname)
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateTo = (path) => {
    const normalized = normalizePath(path);
    const fullPath = normalized === "/" ? basePath : `${basePath}${normalized}`;

    if (fullPath !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, "", fullPath);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setRoute(getRouteFromPath(fullPath));
  };

  const selectedPost = useMemo(
    () =>
      route.type === "post"
        ? featuredPosts.find((post) => post.slug === route.slug) ?? null
        : null,
    [route]
  );

  const selectedDestination = useMemo(
    () =>
      route.type === "destination"
        ? destinations.find((destination) => destination.slug === route.slug) ?? null
        : null,
    [route]
  );

  if (route.type === "articles") {
    return (
      <ArticlesPage
        logoSrc={logoSrc}
        posts={featuredPosts}
        navigateTo={navigateTo}
      />
    );
  }

  if (route.type === "destinations") {
    return (
      <DestinationsPage
        logoSrc={logoSrc}
        destinations={destinations}
        navigateTo={navigateTo}
      />
    );
  }

  if (route.type === "post" && selectedPost) {
    return (
      <ArticlePage
        logoSrc={logoSrc}
        post={selectedPost}
        navigateTo={navigateTo}
      />
    );
  }

  if (route.type === "destination" && selectedDestination) {
    return (
      <DestinationPage
        logoSrc={logoSrc}
        destination={selectedDestination}
        navigateTo={navigateTo}
      />
    );
  }

  if (route.type === "not_found") {
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
              L’URL esiste nel browser ma non corrisponde ancora a una pagina del sito.
            </p>
            <div className="mt-8 flex justify-center">
              <button
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

  return (
    <>
      <Header
        logoSrc={logoSrc}
        onHome={() => navigateTo("/")}
        onArticles={() => navigateTo("/articoli")}
        onDestinations={() => navigateTo("/destinazioni")}
      />

      <HomePage
        logoSrc={logoSrc}
        heroSrc={heroSrc}
        featuredPosts={featuredPosts}
        destinations={destinations}
        navigateTo={navigateTo}
      />
    </>
  );
}