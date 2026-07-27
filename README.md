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
npm run build
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
  components/   componenti riutilizzabili
  config/       configurazione sito
  data/         contenuti di articoli e destinazioni
  pages/        pagine principali
  utils/        helper per asset, routing e visibilità contenuti
public/         immagini statiche
```

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
- aggiunto il lint alla pipeline di deploy
