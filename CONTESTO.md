# Contesto del progetto Europando

Documento di passaggio di consegne. Serve a chi riprende il lavoro senza aver
seguito quello fatto finora: una nuova chat, un altro collaboratore, o me stesso
tra qualche mese.

Aggiornato al 1 agosto 2026: continua il lavoro sull'articolo di Bucarest
(layout immagini in linea col testo, niente più tagli), SEO mirata su
"itinerario Bucarest", primi contenuti social per Instagram.

**Passaggio di consegne**: da qui si continua su ChatGPT Codex invece che su
Claude Code. Questo documento è stato riscritto apposta perché chi riprende
non ha memoria della conversazione precedente — leggilo tutto prima di
toccare codice. La sezione 7 elenca i vincoli specifici dell'ambiente Claude
Code: probabilmente non valgono tutti su Codex, vanno riverificati uno per
uno invece di darli per scontati.


---

## 1. Cos'è

Sito di guide di viaggio in italiano, scritto in React con Vite e Tailwind.

- **Repository:** `tuvericlaudio-stack/europando`
- **Online su:** https://europando.it — VPS OVH, Ubuntu 26.04, IP `145.239.74.222`
- **Non più su GitHub Pages:** il sito è stato spostato, il workflow relativo è
  stato rimosso
- **Instagram:** `@_europando_`
- **Autore:** progetto personale, non un'azienda

Il proprietario si definisce principiante e sta imparando: le spiegazioni vanno
date in linguaggio semplice, senza dare per scontato il gergo tecnico.

---

## 2. Stato attuale

### Contenuti pubblicati

Sono pochi, ed è il dato che condiziona ogni ragionamento sulla monetizzazione:

| contenuto | tipo | stato |
| --- | --- | --- |
| Bucarest | guida destinazione | pubblicata, completa |
| "Bucarest ci ha sorpresi" | racconto lungo, 4 giorni | pubblicato, riscritto il 31 luglio 2026 |
| Oslo, Irlanda e altre 2 destinazioni | — | in bozza (`draft`), non visibili |

In totale: 2 pagine di contenuto reale pubblicate (più home, archivio articoli,
archivio destinazioni e 404).

**Palma e Puglia sono state rimesse in `draft`** (29 luglio 2026): tre
paragrafi non si posizionano su Google e segnalano un sito sottile. Restano
in `src/data/posts.js`, pronte per essere completate e ripubblicate.

**Nuovi scaffold in `draft` per articoli satellite su Bucarest**, in linea col
piano di sezione 5 (una guida forte + articoli satellite invece di nuove
città superficiali). Struttura pronta con placeholder, da riempire con
contenuto reale prima di pubblicare:

| slug | argomento |
| --- | --- |
| `dove-mangiare-bucarest` | colazione, street food, ristoranti |
| `bucarest-in-2-giorni` | versione weekend dell'itinerario |
| `come-arrivare-muoversi-bucarest` | aeroporto, mezzi pubblici, taxi/app |
| `bucarest-budget-basso` | viaggio economico |

**"Bucarest ci ha sorpresi" riscritto da zero** (31 luglio 2026) con il
racconto reale di un ponte del 25 aprile, in `src/data/articles.js`: 4 giorni
(arrivo e cena da Hanul lui Manuc, giornata piena tra Calea Victoriei e il
rooftop di Closer to the Moon, la domenica in bici a Herastrau con la scelta
consapevole di saltare le terme, l'ultima mattina). Le foto del vecchio
articolo (generiche/segnaposto, condivise con la pagina destinazione) sono
state sostituite con foto reali del viaggio, caricate dall'utente (HEIC o
incollate in chat), convertite/ridimensionate e salvate in `public/` con
prefisso `bucarest-article-*` per non toccare i file condivisi con
`destinations.js` e `posts.js` (`bucarest-hero.jpg`,
`bucarest-gallery-1/2/3.jpg`).

**Layout immagini rifatto** (1 agosto 2026), in tre passaggi via feedback
dell'utente ("le immagini sono troppo grosse", "non tagliarle"):
1. le foto non sono più un unico blocco enorme a fine sezione: ogni sezione
   può avere più foto (`section.images[]`), ciascuna agganciata a un
   paragrafo preciso (`afterParagraph`, indice 0-based) tramite il
   componente `PhotoGroup` in `ArticlePage.jsx`. Una foto sola diventa una
   card contenuta (max ~420px), due o più si affiancano in griglia
   (2 colonne, o 2×2/1×4 per gruppi da 4)
2. l'aspect ratio segue quello reale della foto invece di forzarne uno
   fisso: campo opzionale `aspect` su ogni immagine (es. `"3/4"`,
   `"1200/669"`), applicato via `style={{ aspectRatio }}` — niente più
   ritagli indesiderati su foto storte o orizzontali
3. anche l'hero in cima all'articolo rispetta il formato reale se
   `heroAspect` è impostato sui dati dell'articolo (altrimenti resta il
   banner panoramico `object-cover` di prima, per non toccare eventuali
   hero panoramici futuri)

Tutte le foto della galleria in fondo alla pagina sono state ridistribuite
dentro il testo con questo sistema: oggi `gallery: []` per questo articolo.
Due sezioni (Closer to the Moon, le terme) restano senza immagine: niente
foto reale disponibile, niente segnaposto per non essere fuorvianti.

**SEO mirata su "itinerario Bucarest"** (1 agosto 2026), la ricerca che
l'utente vuole intercettare: aggiunto `public/robots.txt` (mancava, ora
referenzia la sitemap); su `destinations.js` (voce Bucarest) titolo `<title>`,
H1 (`heroTitle`), meta description e intro riscritti per aprire con la
keyword invece di nominarla a metà frase. Il resto dell'impianto SEO era già
solido (canonical, Open Graph, Twitter card, dati strutturati schema.org,
sitemap generata in build, pagine prerenderizzate). La sitemap risultava già
segnalata su Google Search Console dall'utente. **Non aspettarsi risultati
immediati**: dominio nuovo, zero backlink, query competitiva — Google impiega
giorni/settimane a ri-scansionare, e il vero limite resta la scarsità di
contenuto (vedi sezione 5).

**Contenuti social per Instagram** (1 agosto 2026): due caroselli preparati
su richiesta dell'utente, generati con uno script Python/Pillow (font
DejaVu Sans, colori del brand) scritto al volo nella cartella temporanea di
sessione — **non fa parte del repository e non persiste**: se serve
rigenerarli o modificarli, lo script va riscritto da zero.
- **Bucarest ci ha sorpresi**: 9 slide 1080×1350 (formato 4:5) che
  riprendono foto e momenti dell'articolo, più didascalia con itinerario
  giorno-per-giorno e hashtag, consegnati come file in chat (non nel
  repository)
- **"5 motivi per seguirci"**: carosello di 7 slide 1080×1080 fornito
  dall'utente (già pronto, formato valido così com'è), per cui è stata
  scritta solo la didascalia
Per entrambi, su richiesta esplicita, sono stati proposti anche pacchetti
ridotti di 5 hashtag (uno per contenuto legato a una destinazione, uno per
contenuti "di brand"/scoperta profilo — criteri diversi, vedi la
conversazione se serve replicare il ragionamento). **Non è stato possibile
pubblicare nulla su Instagram**: nessun collegamento/integrazione
disponibile in questo ambiente, i file vanno caricati a mano dall'utente.

### Infrastruttura

- **pubblicazione:** un timer sul server controlla ogni cinque minuti se su
  `main` c'è una versione nuova, e in quel caso ricostruisce e pubblica il sito.
  Nessuna credenziale coinvolta, il repository è pubblico
- controllo automatico (lint + build) su ogni pull request
- certificato HTTPS con rinnovo automatico
- **al server si accede solo da console KVM**: niente SSH dal computer
  dell'utente, quindi niente copia-incolla e niente file trasferibili. Per
  scrivere file lunghi sul server si usa `curl` dal repository pubblico

---

## 3. Come funziona il progetto

Le decisioni prese finora, e il motivo. Chi riprende dovrebbe conoscerle prima
di modificare qualcosa.

### Contenuti in `draft` o `published`

`src/data/` contiene articoli e destinazioni. Ogni voce ha uno `status`: solo i
`published` finiscono nel sito, nella navigazione, nella sitemap e nelle pagine
generate. È il modo per lavorare a un contenuto senza pubblicarlo per sbaglio.

### Due formati di articolo, una sola pagina

- `src/data/articles.js` — racconti lunghi: `days[].sections[].paragraphs`, foto, `tripFacts`
- `src/data/posts.js` — schede sintetiche: `sections[].text` oppure `daySections`

`ArticlePage` normalizza entrambi. L'archivio `/articoli` li unisce con
`getPublishedArticleCards`. Un contenuto nuovo va scritto in **un solo** file
dati e compare da solo in lista e nella pagina di dettaglio.

### Prerender: le pagine sono file veri

`npm run build` esegue la build di Vite e poi `scripts/prerender.mjs`, che scrive
un `index.html` per ogni pagina pubblicata, con testo e meta tag già dentro.

Serve perché i crawler dei social non eseguono JavaScript: senza, ogni
condivisione mostrerebbe titolo e immagine generici del sito.

Dettagli che contano:
- l'elenco delle pagine viene da `getPrerenderRoutes` in `src/utils/seo.js`
- i metadati sono definiti **una sola volta** in `src/utils/seo.js`, usati sia dal
  prerender sia dal componente `Seo` durante la navigazione: non possono divergere
- ogni pagina porta `data-prerender-path`; `main.jsx` si aggancia all'HTML
  esistente solo se combacia con l'indirizzo, altrimenti ricostruisce da zero
- niente browser headless: la build in CI resta leggera
- `404.html` è la pagina 404 vera e propria, non un redirect: nginx la
  restituisce con stato 404 mantenendo l'indirizzo richiesto
- le canonical hanno lo slash finale, perché è l'indirizzo realmente servito da
  una cartella con `index.html`

### Navigazione con link veri

Header, footer, schede e call to action usano `<Link>` di react-router, quindi
ogni voce ha un `href` reale. Prima erano pulsanti con `onClick`: i motori di
ricerca non trovavano i percorsi tra le pagine.

`ScrollManager` in `App.jsx` gestisce lo scorrimento: in cima al cambio pagina,
al punto giusto se l'indirizzo contiene un'ancora tipo `#giorno-2`.

### Indirizzo e base path configurabili

| variabile | effetto |
| --- | --- |
| `VITE_SITE_URL` | indirizzo pubblico: canonical, og:url, sitemap, dati strutturati |
| `VITE_SITE_BASE_PATH` | sottocartella da cui il sito è servito |

I valori predefiniti sono già quelli del sito online (`https://europando.it/`
servito dalla radice), quindi una build senza variabili impostate produce il
sito giusto. Le variabili servono per pubblicare altrove, per esempio in una
sottocartella:

```bash
VITE_SITE_URL=https://altro-dominio.it VITE_SITE_BASE_PATH=/sottocartella/ npm run build
```

### Immagini

Le foto in `public/` legate a destinazioni/schede (`destinations.js`,
`posts.js`) restano 1200×1600, con `heroWidth`/`heroHeight`/`imageWidth`/
`imageHeight` dichiarati nei dati così il browser riserva lo spazio prima del
caricamento. Senza quei campi i componenti funzionano lo stesso.

**I racconti lunghi (`articles.js`) usano un sistema diverso**, introdotto
il 1 agosto 2026 proprio per superare i limiti di quello sopra (foto
enormi, tagliate, tutte ammassate in una galleria finale). Vedi il
componente `PhotoGroup` in `src/pages/ArticlePage.jsx`:
- ogni sezione può avere `images: [{ src, alt, caption, afterParagraph,
  aspect }]` invece del vecchio `image`/`imageAlt`/`caption` singolo (che
  resta comunque supportato come fallback, va in coda alla sezione)
- `afterParagraph` (indice 0-based) posiziona la foto subito dopo quel
  paragrafo; più foto con lo stesso indice si affiancano in griglia
- `aspect` (es. `"3/4"`, `"1200/669"`) fa rispettare il formato reale della
  foto via CSS `aspect-ratio` inline, non un rapporto fisso — se una foto è
  storta o orizzontale va **ruotata/ridimensionata a monte** (con Pillow) e
  il valore di `aspect` aggiornato di conseguenza, mai forzata in un
  riquadro che non le corrisponde
- l'hero dell'articolo (`content.heroImage`) accetta lo stesso principio con
  `heroAspect` a livello di articolo: se assente resta il banner panoramico
  `object-cover` di prima

Palma, Puglia e Oslo caricano le foto da `images.unsplash.com`: dipendenza
esterna non ancora risolta (vedi punto 6).

---

## 4. Passaggio al VPS: fatto

Completato il 28 luglio 2026. Restano note utili in caso di problemi.

### Come è configurato il server

- nginx serve `/var/www/europando/current`, un symlink alla versione pubblicata
- le versioni stanno in `/var/www/europando/releases/`, se ne tengono cinque
- lo script è `/usr/local/bin/europando-deploy`, eseguito dal timer
  `europando-deploy.timer` come utente `deploy`
- il codice sorgente sul server sta in `/home/deploy/src`
- per pubblicare subito senza aspettare il timer:
  `sudo -u deploy /usr/local/bin/europando-deploy`
- per vedere cosa è successo:
  `journalctl -u europando-deploy.service -n 30`
- durante il DNS c'erano **due** record A: quello del VPS e la pagina di
  parcheggio di OVH (`213.186.33.5`). Vanno tenuti solo quelli verso il VPS

### Cosa è già pronto nel repository

| file | contenuto |
| --- | --- |
| `deploy/README.md` | procedura completa in 8 passaggi, nell'ordine giusto |
| `deploy/nginx/europando.it.conf` | virtual host, solo parte HTTP |
| `.github/workflows/deploy-vps.yml` | build per il dominio, copia via SSH, attivazione atomica |

L'ordine dei passaggi non è arbitrario: il certificato HTTPS non si può emettere
prima che il DNS punti al server, e il deploy non funziona prima che nginx sappia
cosa servire. Il virtual host contiene solo HTTP perché il blocco HTTPS lo
aggiunge certbot: percorsi di certificato inesistenti impedirebbero a nginx di
avviarsi.

### Il metodo alternativo resta disponibile

`.github/workflows/deploy-vps.yml` pubblica via SSH da GitHub Actions. È pronto
ma inattivo: il job non parte finché la variabile `DEPLOY_HOST` non esiste.
Serve una chiave privata nei segreti del repository, impossibile da trasportare
attraverso la KVM. Il giorno in cui il server sarà raggiungibile via SSH da un
computer, basta disattivare il timer e configurare variabili e segreti.

I due metodi si escludono a vicenda.

---

## 5. Dopo: analisi commerciale

Ricerca già svolta, da non rifare. Fonti consultate a luglio 2026.

### Punto di partenza onesto

Con 4 contenuti reali, **la scelta del sistema di monetizzazione non è il
problema**. Il collo di bottiglia è la quantità di contenuto che risponde a
ricerche vere. Qualsiasi discorso su pubblicità e affiliazioni è prematuro finché
il sito non cresce.

### Circuiti pubblicitari: soglie d'ingresso

| circuito | soglia |
| --- | --- |
| AdSense | nessuna |
| Ezoic | ~10.000 visite/mese |
| Mediavine | 50.000 sessioni/mese (programma Journey da ~10.000) |
| Raptive | 25.000 visualizzazioni **ma con almeno il 50% del traffico da USA/UK/Canada/Australia/NZ** |

**Raptive è di fatto escluso** per un sito in italiano: il requisito sui mercati
di lingua inglese non sarà mai soddisfatto.

### Affiliazioni: quanto pagano

| categoria | commissione |
| --- | --- |
| tour ed esperienze | 8–35% (GetYourGuide ~7–8% secondo il network) |
| assicurazioni viaggio | 10–40% |
| hotel | 3–7% (Booking condivide fino al 40% della propria commissione, già sottile) |
| voli | 1–3% |

**Conclusione operativa:** voli e hotel non valgono il lavoro. Tour, esperienze e
assicurazioni sì, e sono ciò che una guida su un city break consiglia con
naturalezza.

### Ordine di grandezza dei ricavi

Un tour da 30-40 euro all'8% rende circa 3 euro. Considerando quanti visitatori
cliccano e quanti prenotano davvero, si resta nell'ordine di **pochi euro ogni
mille visite**. La pubblicità su traffico italiano atterra in una fascia simile.

Tradotto: **per 100 euro al mese servono decine di migliaia di visite mensili.**
Non è un caso che la soglia di Mediavine stia a 50.000 sessioni.

### Instagram

Il click-through di un link in bio è nell'ordine del **2-3%**, e non dei follower
ma di chi visita il profilo. Instagram è progettato per trattenere le persone
dentro Instagram: **non è un canale di acquisizione traffico**, quello è Google.

A cosa serve davvero:
- costruire riconoscibilità, che rende credibile una guida
- vendere direttamente (le storie con sticker link convertono meglio)
- **ottenere collaborazioni pagate**: un ente del turismo paga in base al pubblico,
  non al traffico del sito. Per un account italiano piccolo è la fonte di ricavo
  più raggiungibile nel breve, molto prima della pubblicità

### Vincolo legale che scatta con la monetizzazione

Oggi il sito non ha cookie né tracciamento: condizione che ha un valore e che si
perde aggiungendo AdSense o Analytics. Da quel momento serve un banner di
consenso a norma, e i link affiliati vanno dichiarati in modo visibile. Un banner
fatto male è un problema legale; uno fatto bene riduce le entrate pubblicitarie.
Motivo in più per non affrettare la pubblicità.

### Piano consigliato

1. approfondire Bucarest invece di aggiungere città: una guida forte più 4-5
   articoli satellite battono cinque città trattate superficialmente. **Passo
   avviato (29 luglio 2026)**: 4 scaffold in `draft` pronti in
   `src/data/posts.js` (vedi sezione 2), da riempire con contenuto reale
2. completare o rimettere in bozza Palma e Puglia: tre paragrafi non si
   posizioneranno mai e comunicano a Google che il sito è sottile. **Fatto
   (29 luglio 2026)**: entrambe rimesse in `draft`
3. spostare il sito sul dominio **prima** di avere traffico da proteggere —
   **fatto** (vedi sezione 4)
4. affiliazioni prima della pubblicità: GetYourGuide sui tour già citati nella
   guida di Bucarest. Nessuna soglia, nessun banner cookie
5. su Instagram puntare alle collaborazioni, non ai clic verso il sito.
   **Passo avviato (1 agosto 2026)**: primi due caroselli pronti (vedi
   sezione 2), ma non pubblicabili da qui — nessun collegamento a Instagram
   in questo ambiente
6. valutare la pubblicità tra sei mesi, sui numeri reali

**SEO tecnico** (non era tra i punti originali del piano, aggiunto il 1
agosto 2026 su richiesta esplicita): titolo, H1, meta description della
pagina Bucarest ottimizzati per "itinerario Bucarest", più `robots.txt` che
mancava. Vedi sezione 2. Non sostituisce il punto 1 (contenuto), lo
accompagna.

---

## 6. Questioni aperte

| questione | di chi è | note |
| --- | --- | --- |
| Sitemap in Google Search Console | **fatto** | l'utente conferma di averla già segnalata |
| "itinerario Bucarest" non compare ancora nei risultati Google | nessuno, richiede tempo | verificato il 1 agosto 2026, poche ore dopo l'ottimizzazione SEO — normale: dominio nuovo, zero backlink, serve tempo di ri-scansione. Da ricontrollare tra qualche settimana con `site:europando.it/destinazioni/bucarest` o Search Console, non prima |
| Disattivare GitHub Pages in *Settings → Pages* | utente | il workflow è stato rimosso, ma la pubblicazione esistente va spenta perché lo stesso contenuto non resti a due indirizzi |
| Foto di Palma, Puglia e Oslo su Unsplash | utente + sviluppo | vanno scaricate in `public/`, poi si aggiornano i dati e si dichiarano le dimensioni |
| Galleria destinazioni | fatto, ma da sapere | il taglio alla terza foto è stato rimosso; oggi nessuna destinazione ne ha più di 3, quindi la resa non cambia |
| Contenuti sottili (Palma, Puglia) | utente | decisione editoriale, non tecnica |
| Action di GitHub Pages su Node 20 | nessuno | `configure-pages`, `deploy-pages`, `upload-artifact` sono già all'ultima versione: l'avviso si risolverà a monte |
| Script di generazione caroselli Instagram | perso, da riscrivere se serve | viveva solo nella cartella temporanea della sessione Claude Code precedente, non è mai entrato nel repository |

---

## 7. Limiti dell'ambiente di sviluppo

Vincoli incontrati lavorando da Claude Code su container remoto, fino al 1
agosto 2026. **Chi riprende su Codex o un altro strumento non deve darli per
scontati**: sono specifici di quel container e di quei tool, vanno
riverificati (prova a raggiungere un indirizzo, prova un push, ecc.) invece
di assumere che valgano ancora.

- **`europando.it` e `tuvericlaudio-stack.github.io` erano bloccati** dalla
  policy di rete (`host_not_allowed`) di quel container: il sito pubblicato
  non era verificabile dall'interno, bisognava chiedere all'utente di
  guardare. Le verifiche tecniche si facevano sulla cartella `dist/` servita
  in locale (vedi sezione 8) — pratica valida comunque, a prescindere
  dall'ambiente
- **`images.unsplash.com` era bloccato**: impossibile scaricare le foto per
  ospitarle nel repository
- **`whois` non disponibile**: la disponibilità di un dominio non era
  verificabile
- **il push richiedeva che l'accesso in scrittura fosse abilitato** nelle
  impostazioni GitHub dell'utente: all'inizio era in sola lettura e il push
  falliva con 403
- niente `gh` CLI: si usavano gli strumenti MCP di GitHub — su Codex la
  modalità di interazione con GitHub sarà probabilmente diversa
- **foto caricate in chat dall'utente**: quelle allegate con `@percorso` sono file
  reali in `/root/.claude/uploads/...`, anche se hanno estensione `.HEIC`
  risultano già JPEG (`file` lo conferma) — nessuna conversione HEIC
  necessaria. Quelle incollate direttamente nel messaggio (senza `@percorso`)
  non sono su disco: vanno estratte in base64 dall'ultimo messaggio utente nel
  file di sessione (`~/.claude/projects/.../*.jsonl`, campo
  `message.content[].source.data` dove `type` è `image`) e scritte su file con
  Python prima di poterle processare. In entrambi i casi: `Pillow` non è
  preinstallato, va fatto `pip install pillow`

---

## 8. Come si verifica il lavoro

Pratiche adottate finora, utili da mantenere.

**Servire `dist/` come farebbe GitHub Pages**, non con `vite preview`: quello
applica un fallback che restituisce la home per qualsiasi indirizzo, dando un
falso via libera. Serve un server che faccia l'indice di cartella e restituisca
`404.html` con stato 404.

**Controllare le pagine con JavaScript disattivato**: è così che le vedono i
crawler dei social. Il testo deve esserci nell'HTML statico.

**Misurare, non dedurre.** Due esempi concreti:
- il punteggio CLS risultava 0 sia prima sia dopo una correzione sulle immagini,
  perché gli spostamenti avvenivano fuori schermo. La prova utile è stata
  misurare l'altezza della scatola dell'immagine prima e dopo il caricamento
- un errore di idratazione è emerso solo servendo il sito come fa GitHub Pages

**Provare la build anche con impostazioni diverse**: `VITE_SITE_BASE_PATH=/` e un
dominio alternativo, per accorgersi degli indirizzi scritti a mano.

### Errori già commessi, da non ripetere

- `ls -1dt` senza argomenti elenca la cartella stessa, non il contenuto: la
  rotazione delle versioni sul server non cancellava nulla. Va usato `ls -1dt */`
- un heredoc dentro un blocco YAML non si chiude se il terminatore è indentato
- `vite preview` maschera i problemi di routing (vedi sopra)

---

## 9. Convenzioni

- **Branch di lavoro:** uno nuovo per ogni cambiamento, sempre da
  `origin/main` aggiornato, con nome che descrive il contenuto (es.
  `claude/seo-itinerario-bucarest`, non un nome fisso riusato). Non si
  impilano commit su un branch il cui PR è già stato unito
- **Lingua:** italiano ovunque — codice, commenti, commit, pull request
- **Commit e PR:** spiegano *perché*, non solo *cosa*. Se una modifica non cambia
  nulla di visibile, va detto esplicitamente
- **Onestà nei resoconti:** se una verifica non è stata possibile, si dice. Se un
  miglioramento non è misurabile, non lo si vende come tale
- **Pull request:** nella pratica recente se ne apre una per ogni modifica
  (anche piccola), e si mergia dopo il check CI verde — l'utente lo conferma
  di volta in volta ("mergiala quando è verde") più che chiederlo caso per
  caso. Non presumere però il permesso per azioni distruttive o push diretti
  su `main`
- **Lavoro fuori dal repository** (script una tantum, immagini generate per
  social, file di testo per didascalie): va nella cartella temporanea di
  sessione, mai committato. Se il lavoro deve sopravvivere alla sessione
  (per essere ripreso, rigenerato, capito da chi viene dopo), va invece
  scritto in questo documento o nel repository — la cartella temporanea non
  persiste (vedi il caso dello script dei caroselli Instagram, sezione 6)
- Node richiesto: `^20.19.0 || >=22.12.0` (`.nvmrc` indica la 22)

---

## 10. Storia delle modifiche

Sedici pull request, tutte unite.

| PR | contenuto |
| --- | --- |
| #1 | l'archivio articoli era scollegato: il racconto su Bucarest dava 404 e gli articoli mostravano il titolo senza testo. Corretti anche canonical, dominio sbagliato in `index.html`, voce "Articoli" nel menu, lint in CI |
| #2 | galleria non più troncata alla terza foto; dimensioni delle immagini dichiarate, l'hero non salta più da 360 a 760 pixel |
| #3 | indirizzo del sito configurabile; `404.html` diventa una pagina vera invece di un redirect specifico di GitHub Pages |
| #4 | deploy sul VPS: workflow, virtual host nginx, procedura |
| #5 | versione di Node dichiarata in `package.json`, `.nvmrc` e `.npmrc` |
| #6 | prima versione di questo documento (`CONTESTO.md`) |
| #7 | metodo di pubblicazione via timer sul server, senza credenziali nel repository |
| #8 | rimossa la pubblicazione su GitHub Pages, valori predefiniti spostati sul dominio proprio |
| #9 | la più grande: Palma e Puglia rimesse in bozza, 4 scaffold `draft` per articoli satellite, "Bucarest ci ha sorpresi" riscritto da zero col racconto reale del ponte del 25 aprile, prime foto vere al posto dei segnaposto (in più round: Victoriei/Ateneo/Parlamento, Arco di Trionfo/memoriale Michael Jackson, pastrami/colazione finale/galleria Herastrau), rimosse le due immagini segnaposto rimaste senza foto reale corrispondente (Closer to the Moon, terme) |
| #10 | foto ricompresse (da ~7MB a ~3.6MB totali) e riorganizzate in linea col testo invece che ammassate a fine sezione; corretto "Uber" in "Bolt" |
| #11 | le foto singole non erano più tagliate a un formato 16:10 forzato: rispettano il loro aspect ratio reale |
| #12 | la foto dell'ultima colazione, scattata storta, ruotata sull'originale invece che lasciata così |
| #13 | quella foto sostituita con una versione nuova fornita dall'utente, già dritta |
| #14 | anche la foto hero (la cattedrale di notte) non veniva più tagliata: rispetta il suo formato verticale reale |
| #15 | riscritto il testo della sezione Closer to the Moon con il racconto corretto fornito dall'utente |
| #16 | SEO mirata su "itinerario Bucarest": title, H1, meta description riscritti, aggiunto `robots.txt` che mancava |

Prima di questi interventi il sito aveva un articolo completo irraggiungibile e
due guide che mostravano solo il titolo.
