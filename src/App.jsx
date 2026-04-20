import { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import NotFoundPage from "./components/NotFoundPage";
import Seo from "./components/Seo";
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

function useSiteNavigation() {
  const navigate = useNavigate();

  return (path) => {
    navigate(path);
  };
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function HomeRoute({ heroSrc, logoSrc, featuredDestination, publishedDestinations, publishedPosts }) {
  const navigateTo = useSiteNavigation();

  return (
    <>
      <Seo
        title={siteConfig.defaultTitle}
        description={siteConfig.description}
        path="/"
        image={heroSrc}
      />
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

function ArticlesRoute({ logoSrc, publishedPosts }) {
  const navigateTo = useSiteNavigation();

  return (
    <>
      <Seo
        title={`Articoli | ${siteConfig.name}`}
        description="Tutti gli articoli pubblicati di Europando: guide ordinate, leggibili e facili da ampliare nel tempo."
        path="/articoli"
        image={publishedPosts[0]?.image}
      />
      <ArticlesPage logoSrc={logoSrc} posts={publishedPosts} navigateTo={navigateTo} />
    </>
  );
}

function ArticleRoute({ logoSrc }) {
  const { slug } = useParams();
  const navigateTo = useSiteNavigation();
  const post = useMemo(() => findPublishedBySlug(featuredPosts, slug), [slug]);

  if (!post) {
    return (
      <>
        <Seo
          title={`404 | ${siteConfig.name}`}
          description="La pagina richiesta non è disponibile oppure non è ancora stata pubblicata."
          path={`/articoli/${slug}`}
          robots="noindex,nofollow"
        />
        <NotFoundPage logoSrc={logoSrc} navigateTo={navigateTo} />
      </>
    );
  }

  return (
    <>
      <Seo
        title={`${post.title} | ${siteConfig.name}`}
        description={post.excerpt ?? post.intro}
        path={`/articoli/${post.slug}`}
        image={post.image}
        type="article"
      />
      <ArticlePage logoSrc={logoSrc} post={post} navigateTo={navigateTo} />
    </>
  );
}

function DestinationsRoute({ logoSrc, publishedDestinations }) {
  const navigateTo = useSiteNavigation();

  return (
    <>
      <Seo
        title={`Destinazioni | ${siteConfig.name}`}
        description="Le destinazioni pubblicate di Europando: guide città già pronte, ordinate e consultabili senza pagine lasciate a metà."
        path="/destinazioni"
        image={publishedDestinations[0]?.image}
      />
      <DestinationsPage
        logoSrc={logoSrc}
        destinations={publishedDestinations}
        navigateTo={navigateTo}
      />
    </>
  );
}

function DestinationRoute({ logoSrc }) {
  const { slug } = useParams();
  const navigateTo = useSiteNavigation();
  const destination = useMemo(() => findPublishedBySlug(destinations, slug), [slug]);

  if (!destination) {
    return (
      <>
        <Seo
          title={`404 | ${siteConfig.name}`}
          description="La destinazione richiesta non è disponibile oppure non è ancora stata pubblicata."
          path={`/destinazioni/${slug}`}
          robots="noindex,nofollow"
        />
        <NotFoundPage logoSrc={logoSrc} navigateTo={navigateTo} />
      </>
    );
  }

  return (
    <>
      <Seo
        title={`${destination.name} | ${siteConfig.name}`}
        description={destination.intro ?? destination.text}
        path={`/destinazioni/${destination.slug}`}
        image={destination.image}
        type="article"
      />
      <DestinationPage
        logoSrc={logoSrc}
        destination={destination}
        navigateTo={navigateTo}
      />
    </>
  );
}

function NotFoundRoute({ logoSrc }) {
  const navigateTo = useSiteNavigation();
  const location = useLocation();

  return (
    <>
      <Seo
        title={`404 | ${siteConfig.name}`}
        description="La pagina richiesta non esiste nel sito pubblico di Europando."
        path={location.pathname}
        robots="noindex,nofollow"
      />
      <NotFoundPage logoSrc={logoSrc} navigateTo={navigateTo} />
    </>
  );
}

export default function App() {
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

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomeRoute
              heroSrc={heroSrc}
              logoSrc={logoSrc}
              featuredDestination={featuredDestination}
              publishedDestinations={publishedDestinations}
              publishedPosts={publishedPosts}
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
