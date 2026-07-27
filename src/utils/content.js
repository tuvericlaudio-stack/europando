import { resolveAsset } from "./assets";

export const CONTENT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const isPublished = (item) => item?.status !== CONTENT_STATUS.DRAFT;

export const getPublishedPosts = (posts = []) => posts.filter(isPublished);

export const getPublishedDestinations = (destinations = []) =>
  destinations.filter(isPublished);

export const findPublishedBySlug = (items = [], slug) =>
  items.find((item) => item.slug === slug && isPublished(item)) ?? null;

export const getFeaturedDestination = (destinations = []) =>
  getPublishedDestinations(destinations)[0] ?? null;

// L'archivio articoli raccoglie due formati: i racconti lunghi (data/articles.js)
// e le schede più sintetiche (data/posts.js). La lista pubblica ha bisogno degli
// stessi campi per entrambi.
export const toArticleCard = (item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category ?? "Racconto di viaggio",
  excerpt: item.excerpt ?? item.subtitle ?? item.intro ?? "",
  meta: item.meta ?? item.readingTime ?? "",
  image: resolveAsset(item.heroImage ?? item.image ?? ""),
  imageAlt: item.heroAlt ?? item.title,
});

export const getPublishedArticleCards = (...sources) =>
  sources.flat().filter(isPublished).map(toArticleCard);
