import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import DestinationPage from "./pages/DestinationPage";
import ArticlesPage from "./pages/ArticlesPage";
import DestinationsPage from "./pages/DestinationsPage";
import { featuredPosts } from "./data/posts";
import { destinations } from "./data/destinations";
import { siteConfig } from "./config/site";
import { asset } from "./utils/assets";
import {
  findPublishedBySlug,
  getFeaturedDestination,
  getPublishedDestinations,
  getPublishedPosts,
} from "./utils/content";
import {
  buildNavigationPath,
  getBasePath,
  getRouteFromPath,
  normalizePath,
} from "./utils/router";

export default function App() {
  const basePath = getBasePath();
  const logoSrc = asset("logo-europando.png");
  const heroSrc = asset("hero-europando.png");

  const publishedPosts = useMemo(() => getPublishedPosts(featuredPosts), []);
  const publishedDestinations = useMemo(
    () => getPublishedDestinations(destinations),
    []
  );
  const featuredDestination = useMemo(
    () => getFeaturedDestination(destinations),
    []
  );

  const [route, setRoute] = useState(() =>
    getRouteFromPath(window.location.pathname, basePath)
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRouteFromPath(window.location.pathname, basePath));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [basePath]);

  const navigateTo = (path) => {
    const fullPath = buildNavigationPath(path, basePath);

    if (fullPath !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, "", fullPath);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setRoute(getRouteFromPath(fullPath, basePath));
  };

  const selectedPost = useMemo(
    () =>
      route.type === "post"
        ? findPublishedBySlug(featuredPosts, route.slug)
        : null,
    [route]
  );

  const selectedDestination = useMemo(
    () =>
      route.type === "destination"
        ? findPublishedBySlug(destinations, route.slug)
        : null,
    [route]
  );

  useEffect(() => {
    if (route.type === "post" && selectedPost) {
      document.title = `${selectedPost.title} | ${siteConfig.name}`;
      return;
    }

    if (route.type === "destination" && selectedDestination) {
      document.title = `${selectedDestination.name} | ${siteConfig.name}`;
      return;
    }

    if (route.type === "articles") {
      document.title = `Articoli | ${siteConfig.name}`;
      return;
    }

    if (route.type === "destinations") {
      document.title = `Destinazioni | ${siteConfig.name}`;
      return;
    }

    if (route.type === "not_found") {
      document.title = `404 | ${siteConfig.name}`;
      return;
    }

    document.title = siteConfig.defaultTitle;
  }, [route.type, selectedDestination, selectedPost]);

  const isMissingContentRoute =
    (route.type === "post" && !selectedPost) ||
    (route.type === "destination" && !selectedDestination);

  if (route.type === "articles") {
    return (
      <ArticlesPage
        logoSrc={logoSrc}
        posts={publishedPosts}
        navigateTo={navigateTo}
      />
    );
  }

  if (route.type === "destinations") {
    return (
      <DestinationsPage
        logoSrc={logoSrc}
        destinations={publishedDestinations}
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

  if (route.type === "not_found" || isMissingContentRoute) {
    return <NotFoundPage logoSrc={logoSrc} navigateTo={navigateTo} />;
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
        heroSrc={heroSrc}
        featuredPosts={publishedPosts}
        destinations={publishedDestinations}
        featuredDestination={featuredDestination}
        navigateTo={navigateTo}
      />
    </>
  );
}
