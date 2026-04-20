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
