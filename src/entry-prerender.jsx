import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { siteConfig } from "./config/site";
import { getBasePath } from "./utils/router";
import { getPrerenderRoutes } from "./utils/seo";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const siteUrl = siteConfig.defaultSiteUrl.endsWith("/")
  ? siteConfig.defaultSiteUrl
  : `${siteConfig.defaultSiteUrl}/`;

const toAbsoluteUrl = (path = "/") =>
  new URL(path === "/" ? "" : path.replace(/^\/+/, ""), siteUrl).toString();

// Ogni pagina è servita come cartella con index.html: senza slash finale
// GitHub Pages redirige, e la canonical dichiarata non coinciderebbe con
// l'indirizzo effettivo.
const toCanonicalUrl = (path = "/") => {
  const url = toAbsoluteUrl(path);
  return url.endsWith("/") ? url : `${url}/`;
};

const toAbsoluteImageUrl = (image) => {
  if (!image) {
    return siteConfig.defaultSocialImage;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Le immagini risolte lato client contengono già il base path del sito.
  const basePath = getBasePath();
  const relative =
    basePath !== "/" && image.startsWith(basePath)
      ? image.slice(basePath.length)
      : image;

  return toAbsoluteUrl(relative);
};

// Gli stessi tag che il componente Seo scrive a runtime, qui resi statici:
// i crawler dei social non eseguono JavaScript e leggono solo questo.
const renderHead = (seo) => {
  const canonical = toCanonicalUrl(seo.path);
  const imageUrl = toAbsoluteImageUrl(seo.image);
  const description = seo.description ?? siteConfig.description;

  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots ?? "index,follow")}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type ?? "website")}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  ];

  if (seo.structuredData) {
    tags.push(
      `<script type="application/ld+json" data-seo="structured-data">${JSON.stringify(
        seo.structuredData
      ).replaceAll("<", "\\u003c")}</script>`
    );
  }

  return tags.join("\n    ");
};

export const routes = getPrerenderRoutes();

export function renderRoute(seo) {
  const basePath = getBasePath();

  // Senza basename i link generati perderebbero il prefisso del sito
  // (/articoli invece di /europando/articoli) e non combacerebbero con il
  // markup che React ricostruisce nel browser.
  const location =
    basePath === "/" ? seo.path : `${basePath}${seo.path === "/" ? "" : seo.path}`;

  const html = renderToString(
    <StrictMode>
      <StaticRouter basename={basePath} location={location}>
        <App />
      </StaticRouter>
    </StrictMode>
  );

  return { html, head: renderHead(seo) };
}
