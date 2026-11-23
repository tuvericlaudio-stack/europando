import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import { asset } from "./utils/assets";
import "./index.css";

const origin = window.location.origin;
const parent = window.parent;

if (parent !== window) {
  const container = document.getElementById("root");
  const root = createRoot(container);

  // Mantiene la bozza nel riquadro anche quando si prova il menu del sito.
  const preventNavigation = (event) => {
    const link = event.target.closest("a[href]");
    if (link && !link.getAttribute("href").startsWith("#")) event.preventDefault();
  };
  container.addEventListener("click", preventNavigation, true);
  container.addEventListener("auxclick", preventNavigation, true);

  window.addEventListener("message", (event) => {
    if (event.origin !== origin || event.source !== parent ||
        event.data?.type !== "europando:preview-article") return;

    const article = event.data.article;
    if (!article || article.status !== "draft") return;

    root.render(
      <MemoryRouter>
        <ArticlePage key={article.editorialId} article={article} logoSrc={asset("logo-europando.png")} />
      </MemoryRouter>
    );
  });

  parent.postMessage({ type: "europando:preview-ready" }, origin);
}
