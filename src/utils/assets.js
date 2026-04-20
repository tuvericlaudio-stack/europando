export const asset = (path = "") => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanedPath = path.replace(/^\/+/, "");

  if (!cleanedPath) {
    return base;
  }

  return `${base}${cleanedPath}`;
};
