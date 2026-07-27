export const isAbsoluteUrl = (path = "") =>
  /^(https?:)?\/\//.test(path) || path.startsWith("data:");

export const asset = (path = "") => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanedPath = path.replace(/^\/+/, "");

  if (!cleanedPath) {
    return base;
  }

  return `${base}${cleanedPath}`;
};

// Le immagini possono arrivare dalla cartella public, da un host esterno oppure
// essere già state risolte nei file dati: solo i percorsi ancora relativi vanno
// prefissati con il base path del sito.
export const resolveAsset = (path = "") => {
  if (!path || isAbsoluteUrl(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";

  if (base !== "/" && path.startsWith(base)) {
    return path;
  }

  return asset(path);
};
