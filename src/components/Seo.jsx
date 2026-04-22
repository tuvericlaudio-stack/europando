import { useEffect } from "react";
import { siteConfig } from "../config/site";
import { getBasePath } from "../utils/router";

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

const ensureLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

const ensureStructuredData = (data) => {
  const selector = 'script[data-seo="structured-data"]';
  let element = document.head.querySelector(selector);

  if (!data) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("data-seo", "structured-data");
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return siteConfig.defaultSiteUrl;
  }

  return `${window.location.origin}${getBasePath() === "/" ? "" : getBasePath()}`;
};

const buildAbsoluteUrl = (path = "/") => {
  const baseUrl = getBaseUrl();
  const cleanPath = path === "/" ? "" : path;
  return new URL(cleanPath, `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}`).toString();
};

const buildImageUrl = (image) => {
  if (!image) return siteConfig.defaultSocialImage;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return buildAbsoluteUrl(image.startsWith("/") ? image.slice(1) : image);
};

export default function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  robots = "index,follow",
  structuredData,
}) {
  useEffect(() => {
    document.title = title;

    const canonicalUrl = buildAbsoluteUrl(path);
    const imageUrl = buildImageUrl(image);

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    ensureMeta('meta[name="robots"]', {
      name: "robots",
      content: robots,
    });

    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });

    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });

    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: siteConfig.name,
    });

    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });

    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });

    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    ensureLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    ensureStructuredData(structuredData);

    ensureStructuredData(structuredData);

  }, [description, image, path, robots, structuredData, title, type]);

  return null;
}