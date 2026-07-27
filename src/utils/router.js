// Il routing è gestito da react-router (basename in main.jsx): qui resta solo
// la lettura del base path di Vite, usata anche per gli URL canonici.
export const getBasePath = () => {
  const rawBase = import.meta.env.BASE_URL || "/";

  if (rawBase.endsWith("/") && rawBase !== "/") {
    return rawBase.slice(0, -1);
  }

  return rawBase;
};
