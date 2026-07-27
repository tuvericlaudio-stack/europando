// Genera un file HTML per ogni pagina pubblicata dopo la build di Vite.
// Serve perché i crawler dei social non eseguono JavaScript: senza questo passo
// ogni condivisione mostrerebbe titolo e immagine generici di index.html.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(projectRoot, "dist");

const HEAD_START = "<!--seo:start-->";
const HEAD_END = "<!--seo:end-->";

const outputPathFor = (routePath) =>
  routePath === "/"
    ? join(distDir, "index.html")
    : join(distDir, routePath.replace(/^\/+/, ""), "index.html");

const injectHead = (template, head) => {
  const start = template.indexOf(HEAD_START);
  const end = template.indexOf(HEAD_END);

  if (start === -1 || end === -1) {
    throw new Error(
      `index.html non contiene i marcatori ${HEAD_START} / ${HEAD_END}: ` +
        "senza di essi i metadati per pagina non possono essere sostituiti."
    );
  }

  return (
    template.slice(0, start + HEAD_START.length) +
    `\n    ${head}\n    ` +
    template.slice(end)
  );
};

// Il path generato viene lasciato nel markup: il browser lo confronta con
// l'indirizzo corrente per capire se può agganciarsi all'HTML esistente. Serve
// per gli URL sconosciuti, che GitHub Pages fa passare da 404.html e che quindi
// ricevono l'HTML della home pur dovendo mostrare la pagina 404.
const injectBody = (template, html, routePath) => {
  const marker = '<div id="root"></div>';

  if (!template.includes(marker)) {
    throw new Error(`index.html non contiene ${marker}`);
  }

  return template.replace(
    marker,
    `<div id="root" data-prerender-path="${routePath}">${html}</div>`
  );
};

async function main() {
  const template = await readFile(join(distDir, "index.html"), "utf8");

  const vite = await createServer({
    root: projectRoot,
    logLevel: "warn",
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { routes, renderRoute } = await vite.ssrLoadModule(
      "/src/entry-prerender.jsx"
    );

    for (const seo of routes) {
      const { html, head } = renderRoute(seo);
      const page = injectBody(injectHead(template, head), html, seo.path);
      const outputPath = outputPathFor(seo.path);

      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, page, "utf8");

      console.log(`prerender ${seo.path} → ${outputPath.slice(distDir.length + 1)}`);
    }

    console.log(`\n${routes.length} pagine generate.`);
  } finally {
    await vite.close();
  }
}

main().catch((error) => {
  console.error("Prerender non riuscito:", error);
  process.exitCode = 1;
});
