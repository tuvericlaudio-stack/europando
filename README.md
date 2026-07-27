# Europando

Europando è un sito di guide di viaggio costruito con React, Vite e Tailwind CSS v4.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint 9

## Avvio locale

```bash
npm install
npm run dev
```

## Script utili

```bash
npm run dev
npm run build      # build di Vite + prerender delle pagine pubblicate
npm run prerender  # solo il prerender, su una dist già presente
npm run lint
npm run check
npm run preview
```

## Configurazione del base path

Di default il progetto pubblica su `/europando/`.

Per cambiare base path in build o in deploy:

```bash
VITE_SITE_BASE_PATH=/ npm run build
```

## Struttura del progetto

```text
src/
  components/         componenti riutilizzabili
  config/             configurazione sito
  data/               contenuti di articoli e destinazioni
  pages/              pagine principali
  utils/              helper per asset, routing, contenuti e metadati SEO
  entry-prerender.jsx render usato dalla build per generare l'HTML statico
scripts/
  prerender.mjs       genera un file HTML per ogni pagina pubblicata
public/               immagini statiche
```

## Prerender

`npm run build` genera, dopo il bundle, un `index.html` per ogni pagina
pubblicata (`dist/articoli/<slug>/index.html` e simili) con il contenuto già
scritto e i meta tag della singola pagina.

Serve perché i crawler dei social non eseguono JavaScript: senza questo passo
ogni condivisione mostrerebbe titolo e immagine generici del sito, e GitHub
Pages risponderebbe 404 su ogni indirizzo profondo prima del redirect.

Da sapere:

- l'elenco delle pagine viene da `getPrerenderRoutes` in `src/utils/seo.js`,
  che considera solo i contenuti `published`: una bozza non viene generata
- i metadati sono definiti una sola volta in `src/utils/seo.js` e usati sia dal
  prerender sia dal componente `Seo` durante la navigazione
- ogni pagina generata porta `data-prerender-path`: il browser lo confronta con
  l'indirizzo corrente e si aggancia all'HTML esistente solo se combacia
- il prerender non usa un browser headless, quindi la build in CI non richiede
  Chromium
- gli indirizzi non generati (bozze, slug inesistenti) continuano a passare da
  `404.html` e mostrano la pagina 404 del sito

## Sitemap

La build scrive anche `dist/sitemap.xml`, dalle stesse rotte che vengono
generate: non può elencare pagine inesistenti né dimenticare quelle nuove, e i
suoi indirizzi coincidono con le `canonical` scritte nelle pagine.

Non contiene `lastmod`, perché i contenuti non portano una data di modifica
affidabile e usare quella della build dichiarerebbe l'intero sito come
aggiornato a ogni pubblicazione.

Il sito è pubblicato in una sottocartella (`/europando/`), quindi la sitemap
risponde su `https://tuvericlaudio-stack.github.io/europando/sitemap.xml`. Un
`robots.txt` non servirebbe a segnalarla: i crawler lo leggono soltanto nella
radice del dominio, che non appartiene a questo repository. Va indicata in
Google Search Console.

## Regola contenuti

Le pagine non pronte devono restare in stato `draft` nei file dati.
Solo i contenuti `published` entrano nella navigazione pubblica.

## Formati dei contenuti

Gli articoli possono essere scritti in due formati, entrambi gestiti da
`ArticlePage`:

- `src/data/articles.js` — racconti lunghi, con `days[].sections[].paragraphs`,
  foto, `tripFacts` e blocco `seo` dedicato
- `src/data/posts.js` — schede più sintetiche, con `sections[].text` oppure
  `daySections`

Per le immagini servite dalla cartella `public` conviene dichiarare le
dimensioni reali del file (`heroWidth`/`heroHeight` per l'immagine di apertura,
`imageWidth`/`imageHeight` per quelle delle sezioni): il browser riserva lo
spazio prima del caricamento e il testo non viene spinto in basso. Senza quei
campi il componente funziona comunque, ma l'immagine fa saltare il layout.

L'archivio `/articoli` unisce le due sorgenti tramite
`getPublishedArticleCards`, quindi un contenuto nuovo va aggiunto in un solo
file dati e compare automaticamente in lista e nella rotta di dettaglio.

## Sistemazione tecnica fatta

- rimosso il template generico di Vite dal branding del progetto
- introdotta gestione `draft/published` per evitare pagine incomplete online
- centralizzati helper per asset e routing
- aggiunto titolo pagina dinamico
- sistemato `index.html` con lingua, favicon e meta description corrette
- reso configurabile il `base path` di Vite tramite variabile ambiente
- pulita la configurazione ESLint per un progetto JavaScript/JSX puro
- collegato l'archivio articoli alle due sorgenti dati, così i racconti scritti
  non restano irraggiungibili
- corretti URL canonici e immagini social, che perdevano il base path
- generato `404.html` in build, senza base path scritto a mano
- aggiunto il lint alla pipeline di deploy e un workflow separato che verifica
  lint e build sulle pull request, senza pubblicare nulla
- resa la navigazione fatta di link reali, seguibili dai motori di ricerca
- aggiunto il prerender delle pagine pubblicate, per anteprime social corrette
  e indirizzi profondi che rispondono senza passare dal redirect
- generata `sitemap.xml` dalle stesse rotte del prerender
