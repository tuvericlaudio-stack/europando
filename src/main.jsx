import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { getBasePath } from "./utils/router";

const basePath = getBasePath();
const container = document.getElementById("root");

const app = (
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const normalizePath = (path = "/") =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

const getCurrentPath = () => {
  const { pathname } = window.location;

  if (basePath !== "/" && pathname.startsWith(basePath)) {
    return normalizePath(pathname.slice(basePath.length) || "/");
  }

  return normalizePath(pathname);
};

// In produzione le pagine pubblicate arrivano già disegnate dal prerender e
// vengono solo riattivate. Un URL sconosciuto riceve invece l'HTML della home
// tramite 404.html: in quel caso il markup non c'entra nulla con la pagina da
// mostrare e va ricostruito da zero.
const prerenderedPath = container.dataset.prerenderPath;

if (prerenderedPath && normalizePath(prerenderedPath) === getCurrentPath()) {
  hydrateRoot(container, app);
} else {
  container.innerHTML = "";
  createRoot(container).render(app);
}
