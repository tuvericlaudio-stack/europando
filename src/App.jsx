import { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import NotFoundPage from "./components/NotFoundPage";
import Seo from "./components/Seo";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import DestinationPage from "./pages/DestinationPage";
import ArticlesPage from "./pages/ArticlesPage";
import DestinationsPage from "./pages/DestinationsPage";
import { featuredPosts } from "./data/posts";
import { articles } from "./data/articles";
import { destinations } from "./data/destinations";
import { asset } from "./utils/assets";
import {
  findPublishedBySlug,
  getFeaturedDestination,
  getPublishedArticleCards,
  getPublishedDestinations,
} from "./utils/content";
import {
  buildArticleSeo,
  buildArticlesSeo,
  buildDestinationSeo,
  buildDestinationsSeo,
  buildHomeSeo,
  buildNotFoundSeo,
} from "./utils/seo";

// Su un sito renderizzato lato client il browser cerca l'ancora prima che il
// contenuto esista, quindi un link condiviso come #giorno-2 resterebbe in cima:
// lo spostamento va fatto a pagina disegnata.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));

    if (target) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [pathname, hash]);

  return null;
}

function HomeRoute({
  heroSrc,
  logoSrc,
  featuredDestination,
  publishedDestinations,
}) {
  const seo = useMemo(() => buildHomeSeo(heroSrc), [heroSrc]);

  return (
    <>
      <Seo {...seo} />
      <Header logoSrc={logoSrc} />
      <HomePage
        heroSrc={heroSrc}
        destinations={publishedDestinations}
        featuredDestination={featuredDestination}
      />
    </>
  );
}

function ArticlesRoute({ logoSrc, publishedPosts }) {
  const seo = useMemo(() => buildArticlesSeo(publishedPosts), [publishedPosts]);

  return (
    <>
      <Seo {...seo} />
      <ArticlesPage logoSrc={logoSrc} posts={publishedPosts} />
    </>
  );
}

function ArticleRoute({ logoSrc }) {
  const { slug } = useParams();
  const post = useMemo(
    () => findPublishedBySlug([...articles, ...featuredPosts], slug),
    [slug]
  );
  const seo = useMemo(
    () =>
      post
        ? buildArticleSeo(post)
        : buildNotFoundSeo(
            `/articoli/${slug}`,
            "La pagina richiesta non è disponibile oppure non è ancora stata pubblicata."
          ),
    [post, slug]
  );

  if (!post) {
    return (
      <>
        <Seo {...seo} />
        <NotFoundPage logoSrc={logoSrc} />
      </>
    );
  }

  return (
    <>
      <Seo {...seo} />
      <ArticlePage logoSrc={logoSrc} post={post} />
    </>
  );
}

function DestinationsRoute({ logoSrc, publishedDestinations }) {
  const seo = useMemo(
    () => buildDestinationsSeo(publishedDestinations),
    [publishedDestinations]
  );

  return (
    <>
      <Seo {...seo} />
      <DestinationsPage logoSrc={logoSrc} destinations={publishedDestinations} />
    </>
  );
}

function DestinationRoute({ logoSrc }) {
  const { slug } = useParams();
  const destination = useMemo(() => findPublishedBySlug(destinations, slug), [slug]);
  const seo = useMemo(
    () =>
      destination
        ? buildDestinationSeo(destination)
        : buildNotFoundSeo(
            `/destinazioni/${slug}`,
            "La destinazione richiesta non è disponibile oppure non è ancora stata pubblicata."
          ),
    [destination, slug]
  );

  if (!destination) {
    return (
      <>
        <Seo {...seo} />
        <NotFoundPage logoSrc={logoSrc} />
      </>
    );
  }

  return (
    <>
      <Seo {...seo} />
      <DestinationPage logoSrc={logoSrc} destination={destination} />
    </>
  );
}

function NotFoundRoute({ logoSrc }) {
  const location = useLocation();

  return (
    <>
      <Seo
        {...buildNotFoundSeo(
          location.pathname,
          "La pagina richiesta non esiste nel sito pubblico di Europando."
        )}
      />
      <NotFoundPage logoSrc={logoSrc} />
    </>
  );
}

export default function App() {
  const logoSrc = asset("logo-europando.png");
  const heroSrc = asset("hero-europando.png");

  const publishedPosts = useMemo(
    () => getPublishedArticleCards(articles, featuredPosts),
    []
  );
  const publishedDestinations = useMemo(
    () => getPublishedDestinations(destinations),
    []
  );
  const featuredDestination = useMemo(
    () => getFeaturedDestination(destinations),
    []
  );

  return (
    <>
      <ScrollManager />
      <Routes>
        <Route
          path="/"
          element={
            <HomeRoute
              heroSrc={heroSrc}
              logoSrc={logoSrc}
              featuredDestination={featuredDestination}
              publishedDestinations={publishedDestinations}
            />
          }
        />
        <Route
          path="/articoli"
          element={<ArticlesRoute logoSrc={logoSrc} publishedPosts={publishedPosts} />}
        />
        <Route path="/articoli/:slug" element={<ArticleRoute logoSrc={logoSrc} />} />
        <Route
          path="/destinazioni"
          element={
            <DestinationsRoute
              logoSrc={logoSrc}
              publishedDestinations={publishedDestinations}
            />
          }
        />
        <Route
          path="/destinazioni/:slug"
          element={<DestinationRoute logoSrc={logoSrc} />}
        />
        <Route path="*" element={<NotFoundRoute logoSrc={logoSrc} />} />
      </Routes>
    </>
  );
}