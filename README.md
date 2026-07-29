# Europando

Europando è un sito di guide di viaggio costruito con React, Vite e Tailwind CSS v4.

Chi riprende il progetto senza conoscerlo trova lo stato attuale, le decisioni
prese e i prossimi passi in [`CONTESTO.md`](CONTESTO.md).

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint 9

## Avvio locale

Serve Node `^20.19.0 || >=22.12.0`, il requisito dichiarato da Vite. La versione
consigliata è nel file `.nvmrc`:

```bash
nvm use     # legge .nvmrc
npm install
npm run dev
```

`engine-strict` è attivo in `.npmrc`: con una versione di Node incompatibile
`npm install` si ferma con un errore esplicito invece di far scoprire il
problema più tardi, con un errore di Vite difficile da interpretare.

## Script utili

```bash
npm run dev
npm run build      # build di Vite + prerender delle pagine pubblicate
npm run prerender  # solo il prerender, su una dist già presente
npm run lint
npm run check
npm run preview
```

## Configurazione di indirizzo e base path

Di default il progetto pubblica su `https://europando.it/`, servito dalla radice
del dominio. Due variabili d'ambiente spostano il sito altrove senza toccare il
codice — per esempio per pubblicarlo in una sottocartella:

| variabile | a cosa serve |
| --- | --- |
| `VITE_SITE_BASE_PATH` | la sottocartella da cui il sito è servito |
| `VITE_SITE_URL` | l'indirizzo pubblico, usato per canonical, og:url, sitemap e dati strutturati |

```bash
VITE_SITE_URL=https://altro-dominio.it VITE_SITE_BASE_PATH=/sottocartella/ npm run build
```

L'indirizzo va impostato correttamente: da lì dipendono gli URL canonici, le
anteprime social e la sitemap. Un sito pubblicato con l'indirizzo sbagliato
dichiara a Google di essere una copia di un altro.

## Pubblicazione

Il sito è online su **https://europando.it**, ospitato su un VPS.

Il server controlla ogni cinque minuti se su `main` c'è una versione nuova e in
quel caso si ricostruisce il sito da sé: non serve nessuna credenziale, perché
il repository è pubblico. La procedura completa, incluso il metodo alternativo
con GitHub Actions, è in [`deploy/README.md`](deploy/README.md).

`dist/` è composta da soli file statici: non serve Node in esecuzione. Ogni
pagina pubblicata è una cartella con `index.html`, quindi al server basta
servire i file e restituire `404.html` quando l'indirizzo non corrisponde a
nulla. Estratto della configurazione, quella completa è in
[`deploy/nginx/europando.it.conf`](deploy/nginx/europando.it.conf):

```nginx
root /var/www/europando/current;
index index.html;

location / {
    try_files $uri $uri/ =404;
}

error_page 404 /404.html;

location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

Gli asset in `assets/` hanno l'hash nel nome e possono essere messi in cache a
lungo; l'HTML no, perché cambia a ogni pubblicazione.

## Struttura del progetto

```text
deploy/
  README.md           procedura di pubblicazione sul server
  nginx/              configurazione del virtual host
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
- gli indirizzi non generati (bozze, slug inesistenti) ricevono `404.html`, che
  è la pagina 404 del sito già disegnata: il server risponde 404 mantenendo
  l'indirizzo richiesto, e la pagina è leggibile anche senza JavaScript

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
- spostato il sito da GitHub Pages al dominio proprio, con pubblicazione
  automatica dal server
- resi configurabili indirizzo del sito e base path, per poter cambiare dominio
  senza modificare il codice
- sostituito il redirect di `404.html`, specifico di GitHub Pages, con una vera
  pagina 404 statica che funziona su qualunque server
