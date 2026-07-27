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
import { siteConfig } from "./config/site";
import { asset, resolveAsset } from "./utils/assets";
import {
  findPublishedBySlug,
  getFeaturedDestination,
  getPublishedArticleCards,
  getPublishedDestinations,
} from "./utils/content";

const buildWebSiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.defaultSiteUrl,
  description: siteConfig.description,
});

const buildArticlesCollectionStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Articoli di viaggio in Europa",
  url: `${siteConfig.defaultSiteUrl}articoli`,
  description:
    "Guide di viaggio, itinerari e articoli pubblicati su Europando per organizzare meglio city break e viaggi più lunghi.",
});

const getArticleDescription = (post) =>
  post.seo?.description ?? post.excerpt ?? post.subtitle ?? post.intro;

const getArticleImage = (post) => resolveAsset(post.heroImage ?? post.image ?? "");

const buildArticleStructuredData = (post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: getArticleDescription(post),
  image: getArticleImage(post),
  mainEntityOfPage: `${siteConfig.defaultSiteUrl}articoli/${post.slug}`,
  author: {
    "@type": "Organization",
    name: siteConfig.name,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
});

const buildDestinationsCollectionStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Destinazioni e guide città",
  url: `${siteConfig.defaultSiteUrl}destinazioni`,
  description:
    "Destinazioni pubblicate, guide città e consigli pratici per organizzare itinerari leggibili e facili da consultare.",
});

const buildDestinationStructuredData = (destination) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: destination.name,
  description: destination.intro ?? destination.text,
  image: destination.image,
  url: `${siteConfig.defaultSiteUrl}destinazioni/${destination.slug}`,
});

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
  const structuredData = useMemo(() => buildWebSiteStructuredData(), []);

  return (
    <>
      <Seo
        title={siteConfig.defaultTitle}
        description={siteConfig.description}
        path="/"
        image={heroSrc}
        structuredData={structuredData}
      />
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
  const structuredData = useMemo(() => buildArticlesCollectionStructuredData(), []);

  return (
    <>
      <Seo
        title={`Itinerari e articoli di viaggio | ${siteConfig.name}`}
        description="Itinerari e articoli di viaggio per organizzare city break, weekend e viaggi più lunghi."
        path="/articoli"
        image={publishedPosts[0]?.image}
        structuredData={structuredData}
      />
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
  const structuredData = useMemo(
    () => (post ? buildArticleStructuredData(post) : null),
    [post]
  );

  if (!post) {
    return (
      <>
        <Seo
          title={`404 | ${siteConfig.name}`}
          description="La pagina richiesta non è disponibile oppure non è ancora stata pubblicata."
          path={`/articoli/${slug}`}
          robots="noindex,nofollow"
        />
        <NotFoundPage logoSrc={logoSrc} />
      </>
    );
  }

  return (
    <>
      <Seo
        title={post.seo?.title ?? `${post.title} | ${siteConfig.name}`}
        description={getArticleDescription(post)}
        path={`/articoli/${post.slug}`}
        image={getArticleImage(post)}
        type="article"
        structuredData={structuredData}
      />
      <ArticlePage logoSrc={logoSrc} post={post} />
    </>
  );
}

function DestinationsRoute({ logoSrc, publishedDestinations }) {
  const structuredData = useMemo(() => buildDestinationsCollectionStructuredData(), []);

  return (
    <>
      <Seo
        title={`Destinazioni e guide città | ${siteConfig.name}`}
        description="Destinazioni pubblicate, guide città e consigli pratici per organizzare itinerari leggibili e facili da consultare."
        path="/destinazioni"
        image={publishedDestinations[0]?.image}
        structuredData={structuredData}
      />
      <DestinationsPage logoSrc={logoSrc} destinations={publishedDestinations} />
    </>
  );
}

function DestinationRoute({ logoSrc }) {
  const { slug } = useParams();
  const destination = useMemo(() => findPublishedBySlug(destinations, slug), [slug]);
  const structuredData = useMemo(
    () => (destination ? buildDestinationStructuredData(destination) : null),
    [destination]
  );

  if (!destination) {
    return (
      <>
        <Seo
          title={`404 | ${siteConfig.name}`}
          description="La destinazione richiesta non è disponibile oppure non è ancora stata pubblicata."
          path={`/destinazioni/${slug}`}
          robots="noindex,nofollow"
        />
        <NotFoundPage logoSrc={logoSrc} />
      </>
    );
  }

  return (
    <>
      <Seo
        title={destination.seoTitle ?? `${destination.name} | ${siteConfig.name}`}
        description={destination.seoDescription ?? destination.intro ?? destination.text}
        path={`/destinazioni/${destination.slug}`}
        image={destination.image}
        structuredData={structuredData}
      />
      <DestinationPage logoSrc={logoSrc} destination={destination} />
    </>
  );
}

function NotFoundRoute({ logoSrc }) {
  const location = useLocation();

  return (
    <>
      <Seo
        title={`404 | ${siteConfig.name}`}
        description="La pagina richiesta non esiste nel sito pubblico di Europando."
        path={location.pathname}
        robots="noindex,nofollow"
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