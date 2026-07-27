import { siteConfig } from "../config/site";
import { resolveAsset } from "./assets";
import {
  getPublishedArticleCards,
  getPublishedDestinations,
  isPublished,
} from "./content";
import { featuredPosts } from "../data/posts";
import { articles } from "../data/articles";
import { destinations } from "../data/destinations";

// Fonte unica dei metadati di pagina: la usa il componente Seo durante la
// navigazione e lo script di prerender durante la build, così i due percorsi
// non possono divergere.

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

const buildDestinationsCollectionStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Destinazioni e guide città",
  url: `${siteConfig.defaultSiteUrl}destinazioni`,
  description:
    "Destinazioni pubblicate, guide città e consigli pratici per organizzare itinerari leggibili e facili da consultare.",
});

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

const buildDestinationStructuredData = (destination) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: destination.name,
  description: destination.intro ?? destination.text,
  image: destination.image,
  url: `${siteConfig.defaultSiteUrl}destinazioni/${destination.slug}`,
});

export const getArticleDescription = (post) =>
  post.seo?.description ?? post.excerpt ?? post.subtitle ?? post.intro;

export const getArticleImage = (post) =>
  resolveAsset(post.heroImage ?? post.image ?? "");

export const buildHomeSeo = (heroSrc) => ({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: "/",
  image: heroSrc,
  structuredData: buildWebSiteStructuredData(),
});

export const buildArticlesSeo = (posts = []) => ({
  title: `Itinerari e articoli di viaggio | ${siteConfig.name}`,
  description:
    "Itinerari e articoli di viaggio per organizzare city break, weekend e viaggi più lunghi.",
  path: "/articoli",
  image: posts[0]?.image,
  structuredData: buildArticlesCollectionStructuredData(),
});

export const buildArticleSeo = (post) => ({
  title: post.seo?.title ?? `${post.title} | ${siteConfig.name}`,
  description: getArticleDescription(post),
  path: `/articoli/${post.slug}`,
  image: getArticleImage(post),
  type: "article",
  structuredData: buildArticleStructuredData(post),
});

export const buildDestinationsSeo = (publishedDestinations = []) => ({
  title: `Destinazioni e guide città | ${siteConfig.name}`,
  description:
    "Destinazioni pubblicate, guide città e consigli pratici per organizzare itinerari leggibili e facili da consultare.",
  path: "/destinazioni",
  image: publishedDestinations[0]?.image,
  structuredData: buildDestinationsCollectionStructuredData(),
});

export const buildDestinationSeo = (destination) => ({
  title: destination.seoTitle ?? `${destination.name} | ${siteConfig.name}`,
  description:
    destination.seoDescription ?? destination.intro ?? destination.text,
  path: `/destinazioni/${destination.slug}`,
  image: destination.image,
  structuredData: buildDestinationStructuredData(destination),
});

export const buildNotFoundSeo = (path, description) => ({
  title: `404 | ${siteConfig.name}`,
  description,
  path,
  robots: "noindex,nofollow",
});

// Elenco delle pagine da generare in build: solo contenuti pubblicati, così una
// bozza non finisce online nemmeno come file statico.
export const getPrerenderRoutes = () => {
  const publishedDestinations = getPublishedDestinations(destinations);
  const publishedPosts = getPublishedArticleCards(articles, featuredPosts);
  const publishedArticleSources = [...articles, ...featuredPosts].filter(
    isPublished
  );

  return [
    buildHomeSeo(resolveAsset("hero-europando.png")),
    buildArticlesSeo(publishedPosts),
    buildDestinationsSeo(publishedDestinations),
    ...publishedArticleSources.map(buildArticleSeo),
    ...publishedDestinations.map(buildDestinationSeo),
  ];
};
