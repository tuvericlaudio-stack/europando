const POST_PREFIX = "/articoli/";
const DESTINATION_PREFIX = "/destinazioni/";

export const getBasePath = () => {
  const rawBase = import.meta.env.BASE_URL || "/";

  if (rawBase.endsWith("/") && rawBase !== "/") {
    return rawBase.slice(0, -1);
  }

  return rawBase;
};

export const normalizePath = (path) => {
  if (!path) {
    return "/";
  }

  const cleanedPath = path.replace(/\/+$/, "");
  return cleanedPath === "" ? "/" : cleanedPath;
};

export const stripBasePath = (pathname, basePath) => {
  const normalizedPathname = normalizePath(pathname);

  if (basePath !== "/" && normalizedPathname === basePath) {
    return "/";
  }

  if (basePath !== "/" && normalizedPathname.startsWith(`${basePath}/`)) {
    return normalizePath(normalizedPathname.slice(basePath.length));
  }

  return normalizedPathname;
};

export const getRouteFromPath = (pathname, basePath) => {
  const path = stripBasePath(pathname, basePath);

  if (path === "/") return { type: "home" };
  if (path === "/articoli") return { type: "articles" };
  if (path === "/destinazioni") return { type: "destinations" };

  if (path.startsWith(POST_PREFIX)) {
    return { type: "post", slug: path.slice(POST_PREFIX.length) };
  }

  if (path.startsWith(DESTINATION_PREFIX)) {
    return { type: "destination", slug: path.slice(DESTINATION_PREFIX.length) };
  }

  return { type: "not_found" };
};

export const buildNavigationPath = (path, basePath) => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === "/") {
    return basePath === "/" ? "/" : basePath;
  }

  return basePath === "/" ? normalizedPath : `${basePath}${normalizedPath}`;
};
