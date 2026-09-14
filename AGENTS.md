# Istruzioni per agenti AI

Riferimento operativo rapido. **Il contesto completo — stato dei contenuti,
perché il progetto è fatto così, cosa resta da fare, ricerca commerciale già
svolta — è in [`CONTESTO.md`](CONTESTO.md). Leggilo per intero prima di
lavorare qui: senza, si rischia di ripetere lavoro già fatto o di contraddire
decisioni già prese.**

Questo file è stato aggiunto passando da Claude Code a un altro strumento
(ChatGPT Codex). Se sei un altro strumento ancora, valgono le stesse regole.

## Cos'è

Sito di guide di viaggio in italiano (React + Vite + Tailwind), online su
**https://europando.it**. Non è un progetto aziendale: è personale, e chi lo
segue si definisce principiante — le spiegazioni rivolte a lui vanno scritte
in linguaggio semplice.

## Comandi

```bash
npm ci --include=dev   # installazione: engine-strict è attivo, serve Node
                        # ^20.19.0 || >=22.12.0 (vedi .nvmrc)
npm run dev             # sviluppo locale
npm run lint             # ESLint
npm run build            # build di Vite + prerender di ogni pagina pubblicata
npm run check             # lint + build, è quello che gira in CI
```

`npm run check` deve passare prima di proporre qualsiasi modifica come finita.

## Attenzione: il deploy è automatico

**Un push su `main` pubblica il sito nel giro di cinque minuti**, senza altra
approvazione. Un server sul VPS controlla il ramo e si autoaggiorna da solo
(dettagli in `deploy/README.md`). Questo significa:

- non unire una pull request pensando che sia "solo su GitHub": diventa
  visibile online quasi subito
- una build che dichiara l'indirizzo sbagliato o rompe una pagina è un
  problema di produzione, non un dettaglio da CI

## Convenzioni del progetto

- **Lingua: italiano ovunque** — codice, commenti, commit, pull request,
  conversazione con l'utente
- **Pull request solo se richieste esplicitamente.** Non aprirne di propria
  iniziativa
- **Commit e PR spiegano il perché**, non solo il cosa. Se una modifica non
  cambia nulla di visibile, va detto esplicitamente
- **Onestà nei resoconti**: se una verifica non è stata possibile, dirlo. Se
  un miglioramento non è misurabile, non venderlo come tale
- **Contenuti**: `src/data/*.js` usa uno `status` (`draft`/`published`); solo
  i `published` finiscono online. Non pubblicare un contenuto sottile o
  incompleto solo perché "tecnicamente funziona"
- **Dopo un lavoro che cambia lo stato del progetto in modo rilevante,
  aggiorna `CONTESTO.md`.** È già successo che il documento restasse indietro
  di undici pull request: chi arriva dopo si fida di quello che c'è scritto.

## Limiti dell'ambiente: non darli per scontati

La sezione 7 di `CONTESTO.md` elenca vincoli di rete incontrati lavorando da
Claude Code su container remoto (domini bloccati, assenza di `whois`, ecc.).
**Sono specifici di quell'ambiente.** Verifica i tuoi vincoli reali invece di
presumere che siano gli stessi — potresti avere accesso a cose che Claude
Code non aveva, o viceversa.
