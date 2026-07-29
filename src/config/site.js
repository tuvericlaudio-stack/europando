import { asset } from "../utils/assets";

const FALLBACK_SITE_URL = "https://europando.it/";

// L'indirizzo pubblico del sito finisce in canonical, og:url, sitemap e dati
// strutturati: cambiando dominio va cambiato qui e in nessun altro punto.
// Si imposta con VITE_SITE_URL, come VITE_SITE_BASE_PATH per il base path.
const normalizeSiteUrl = (value = "") => {
  const trimmed = value.trim();

  if (!trimmed) {
    return FALLBACK_SITE_URL;
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
};

export const siteConfig = {
  name: "Europando",
  shortName: "Europando",
  defaultTitle: "Europando | Guide di viaggio in Europa",
  description:
    "Guide di viaggio in Europa scritte in modo semplice, con itinerari chiari, consigli pratici.",
  defaultSiteUrl: normalizeSiteUrl(import.meta.env.VITE_SITE_URL),
  defaultSocialImage: asset("hero-europando.png"),
};
