import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const normalizeBasePath = (value = "/") => {
  if (value === "/") {
    return value;
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

// GitHub Pages non conosce le rotte lato client: serve 404.html per ogni URL
// profondo. La pagina memorizza l'indirizzo richiesto e rimanda alla SPA, che
// lo ripristina. Il file viene generato in build per non ripetere il base path.
const spaFallbackPlugin = (base) => ({
  name: "europando-spa-fallback",
  apply: "build",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "404.html",
      source: `<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Reindirizzamento | Europando</title>
    <script>
      sessionStorage.setItem("europando.redirect", window.location.href);
      window.location.replace("${base}");
    </script>
  </head>
  <body></body>
</html>
`,
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBasePath(env.VITE_SITE_BASE_PATH || "/europando/");

  return {
    plugins: [react(), tailwindcss(), spaFallbackPlugin(base)],
    base,
  };
});
