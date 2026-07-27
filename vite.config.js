import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const FALLBACK_SITE_URL = "https://tuvericlaudio-stack.github.io/europando/";

const normalizeBasePath = (value = "/") => {
  if (value === "/") {
    return value;
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

const normalizeSiteUrl = (value = "") => {
  const trimmed = value.trim();

  if (!trimmed) {
    return FALLBACK_SITE_URL;
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
};

// index.html contiene i metadati di partenza, quelli che valgono prima che il
// prerender li sostituisca pagina per pagina: anche lì l'indirizzo del sito non
// può restare scritto a mano, altrimenti cambiando dominio resterebbe indietro.
const siteUrlPlugin = (siteUrl) => ({
  name: "europando-site-url",
  transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBasePath(env.VITE_SITE_BASE_PATH || "/europando/");
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  return {
    plugins: [react(), tailwindcss(), siteUrlPlugin(siteUrl)],
    base,
  };
});
