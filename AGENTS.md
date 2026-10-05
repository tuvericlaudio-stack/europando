# AGENTS.md — Europando

Istruzioni operative per agenti AI che lavorano sul repository Europando.

Prima di modificare codice o contenuti:

1. leggi questo file;
2. leggi `CONTESTO.md`;
3. controlla il codice corrente, che prevale sempre sulla documentazione se i due divergono;
4. controlla gli ultimi commit di `main` prima di creare un branch.

`CONTESTO.md` contiene la storia del progetto, le decisioni editoriali e tecniche, le questioni aperte e il passaggio di consegne dal precedente sviluppo con Claude Code.

## Progetto

Europando è un sito personale italiano di guide e racconti di viaggio.

Sito pubblico: `https://europando.it`

Stack principale:

- React 19
- Vite 8
- Tailwind CSS 4
- React Router
- JavaScript / JSX
- hosting statico tramite nginx su VPS

Non c'è un backend applicativo e non c'è un database.

Firebase non fa parte dell'architettura attuale, anche se nel repository restano file di configurazione provenienti dal precedente ambiente Firebase Studio.

## Fonte di verità

In caso di informazioni discordanti usa questo ordine:

1. codice corrente su `main`
2. `AGENTS.md`
3. `CONTESTO.md`
4. `README.md`
5. documentazione in `deploy/`
6. `GEMINI.md`

`GEMINI.md` contiene soprattutto istruzioni generiche del vecchio ambiente Firebase Studio e non deve essere considerato una specifica architetturale del progetto.

Non esiste attualmente un `CLAUDE.md`: il passaggio di consegne dal lavoro svolto con Claude Code è documentato principalmente in `CONTESTO.md` e nella cronologia Git.

## Installazione e controlli

Serve Node compatibile con:

`^20.19.0 || >=22.12.0`

`.nvmrc` indica Node 22 e `.npmrc` abilita `engine-strict`.

Comandi:

```bash
npm ci --include=dev
npm run dev
npm run lint
npm run build
npm run check
npm run preview
```

Prima di considerare completata una modifica deve passare:

```bash
npm run check
```

Se non è possibile eseguire una verifica, dichiararlo esplicitamente nel resoconto.

Non affermare che una modifica funziona se non è stata verificata.

## Architettura

La struttura principale è:

```text
src/
  components/       componenti condivisi
  config/           configurazione generale del sito
  data/             contenuti editoriali
  pages/            pagine React
  utils/            routing, asset, contenuti e SEO
  entry-prerender.jsx

scripts/
  prerender.mjs

public/
  immagini e file statici

deploy/
  configurazione e documentazione del VPS
```

I contenuti editoriali nei file `src/data/*.js` funzionano di fatto come CMS.

Non introdurre database, CMS esterni o nuove dipendenze importanti senza una necessità reale e senza spiegare il motivo.

## Draft e contenuti pubblicati

I contenuti usano:

```js
CONTENT_STATUS.DRAFT
CONTENT_STATUS.PUBLISHED
```

Solo i contenuti pubblicati devono comparire:

- nel sito pubblico;
- negli archivi;
- nelle rotte prerenderizzate;
- nella sitemap.

Non cambiare un contenuto da `draft` a `published` soltanto perché tecnicamente renderizza.

Placeholder, articoli incompleti o contenuti sottili devono rimanere `draft`.

## Articoli

Esistono due formati supportati intenzionalmente.

`src/data/articles.js`

Racconti lunghi con struttura tipo:

```text
days
  sections
    paragraphs
    images
```

`src/data/posts.js`

Guide e articoli più semplici basati su:

```text
sections[].text
```

oppure:

```text
daySections
```

`ArticlePage.jsx` normalizza entrambi.

Non duplicare il renderer e non creare un terzo formato senza una necessità concreta.

## Immagini degli articoli

Il formato attuale supporta:

```js
images: [
  {
    src,
    alt,
    caption,
    afterParagraph,
    aspect
  }
]
```

`afterParagraph` è un indice 0-based.

Più immagini associate allo stesso paragrafo vengono mostrate in griglia.

`aspect` deve rappresentare il formato reale dell'immagine, per esempio:

```js
aspect: "3/4"
aspect: "1200/669"
```

L'hero può usare:

```js
heroAspect
```

Non forzare fotografie verticali in riquadri panoramici e non usare immagini segnaposto che mostrano un luogo diverso da quello descritto.

Il vecchio formato `image` / `imageAlt` / `caption` resta supportato per compatibilità.

## SEO e prerender

`src/utils/seo.js` è la fonte unica dei metadati SEO.

Gli stessi dati vengono usati:

- dal componente React `Seo`;
- dal prerender statico.

Non duplicare title, canonical o altri metadati in sistemi paralleli.

`npm run build` esegue Vite e poi `scripts/prerender.mjs`.

La build genera:

- HTML statico delle pagine pubblicate;
- `404.html`;
- `sitemap.xml`.

Canonical, sitemap, Open Graph e dati strutturati dipendono da:

```text
VITE_SITE_URL
VITE_SITE_BASE_PATH
```

Valori predefiniti di produzione:

```text
VITE_SITE_URL=https://europando.it
VITE_SITE_BASE_PATH=/
```

Quando tocchi routing, SEO, prerender o base path verifica anche una build con configurazione alternativa per evitare URL scritti a mano.

## Routing

Il routing usa React Router.

Usare `<Link>` per la navigazione interna invece di pulsanti con `onClick`, quando la destinazione è una vera pagina.

Questo permette anche ai crawler di scoprire i collegamenti.

`ScrollManager` in `App.jsx` gestisce cambio pagina e hash come `#giorno-2`.

## Deploy e produzione

Attualmente il sito viene pubblicato tramite il VPS.

Un timer systemd controlla periodicamente il branch `main`. Quando trova un nuovo commit:

1. aggiorna il repository;
2. installa le dipendenze;
3. esegue la build;
4. verifica canonical, `404.html` e sitemap;
5. crea una nuova release;
6. cambia atomicamente il symlink `current`;
7. conserva le ultime cinque release.

Di conseguenza:

**un merge su `main` può diventare pubblico entro circa cinque minuti.**

Non trattare un merge come una semplice operazione GitHub.

`.github/workflows/deploy-vps.yml` rappresenta un metodo alternativo via GitHub Actions/SSH ed è separato dal timer attualmente documentato come sistema operativo.

## Workflow Git

Per ogni task:

1. aggiorna la conoscenza di `main`;
2. crea un branch nuovo da `main`;
3. usa un nome descrittivo, preferibilmente `codex/<task>`;
4. modifica soltanto ciò che serve al task;
5. esegui `npm run check`;
6. controlla il diff;
7. prepara commit e PR che spieghino anche il motivo della modifica.

Non riutilizzare branch di PR già unite.

Prima di aprire o unire una PR verifica nuovamente se `main` è cambiato, soprattutto quando più sessioni stanno lavorando sul repository.

Non fare push diretti o operazioni distruttive su `main` senza autorizzazione esplicita.

## Lingua e comunicazione

Usare italiano per:

- commenti specifici del progetto;
- commit;
- descrizioni delle pull request;
- documentazione;
- comunicazione con il proprietario.

Il proprietario del progetto preferisce spiegazioni semplici.

Quando introduci un termine tecnico non necessario, spiega cosa significa.

Commit e PR devono spiegare perché è stata fatta una modifica, non soltanto quali file sono cambiati.

## Documentazione

Dopo una modifica che cambia in modo sostanziale:

- architettura;
- deploy;
- stato dei contenuti;
- strategia editoriale;
- workflow di sviluppo;
- questioni aperte;

aggiorna anche `CONTESTO.md`.

Non aggiornare `CONTESTO.md` per modifiche puramente cosmetiche se non cambiano lo stato del progetto.

La documentazione può essere diventata obsoleta: confrontala sempre con il codice corrente.

## Regole di lavoro

Preferire modifiche piccole e mirate.

Non fare refactoring estesi non richiesti durante un bug fix o un intervento editoriale.

Non aggiungere dipendenze solo per evitare di scrivere poche righe di codice.

Preservare accessibilità e responsive design.

Preservare il comportamento con `prefers-reduced-motion`.

Quando una modifica riguarda HTML prerenderizzato o SEO, non verificare soltanto la SPA con JavaScript attivo: controllare anche l'HTML generato in `dist`.

Non usare `vite preview` come unica verifica del comportamento 404, perché il fallback della SPA può mascherare errori di routing.

Misurare quando possibile invece di dedurre.

## Stato editoriale da ricordare

Attualmente i contenuti principali pubblicati sono:

- destinazione Bucarest;
- articolo “Bucarest ci ha sorpresi”.

Le altre destinazioni e gli articoli satellite presenti nei file dati sono in gran parte bozze.

Molti contengono placeholder intenzionali.

Non pubblicarli senza completamento editoriale.

La strategia definita finora privilegia una destinazione approfondita e articoli satellite collegati rispetto alla pubblicazione di molte guide superficiali.

## File legacy da trattare con cautela

`GEMINI.md` deriva dal precedente ambiente Firebase Studio e contiene istruzioni generiche non necessariamente valide per Europando.

`.idx/` riguarda principalmente l'ambiente Firebase Studio.

I file `tsconfig*.json` derivano in parte dal template Vite e non indicano che il progetto sia TypeScript: il codice applicativo corrente è JavaScript/JSX.

Prima di modificare o eliminare questi file verifica se servono ancora all'ambiente di sviluppo utilizzato.
