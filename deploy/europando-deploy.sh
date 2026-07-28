#!/usr/bin/env bash
# Pubblica Europando sul server, senza bisogno di chiavi né segreti.
#
# È il server a controllare se su GitHub c'è qualcosa di nuovo, invece di
# GitHub che entra nel server: il repository è pubblico, quindi non serve
# nessuna credenziale. Utile quando non si può accedere al server via SSH dal
# proprio computer e non è pratico trasportare una chiave privata.
#
# Va eseguito come utente `deploy`. Se non c'è niente di nuovo esce subito
# senza fare nulla, quindi può essere lanciato spesso da un timer.
#
# Uso manuale:
#   sudo -u deploy /usr/local/bin/europando-deploy
#   sudo -u deploy /usr/local/bin/europando-deploy --forza   (ricostruisce comunque)

set -euo pipefail

REPO="https://github.com/tuvericlaudio-stack/europando.git"
BRANCH="main"
SORGENTE="$HOME/src"
DESTINAZIONE="/var/www/europando"
SITE_URL="https://europando.it"

FORZA=0
if [ "${1:-}" = "--forza" ]; then
  FORZA=1
fi

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

# --- codice aggiornato ------------------------------------------------------

if [ -d "$SORGENTE/.git" ]; then
  git -C "$SORGENTE" fetch --quiet origin "$BRANCH"
else
  log "primo scaricamento del codice"
  git clone --quiet --branch "$BRANCH" "$REPO" "$SORGENTE"
fi

LOCALE="$(git -C "$SORGENTE" rev-parse HEAD)"
REMOTO="$(git -C "$SORGENTE" rev-parse "origin/$BRANCH")"

# Senza modifiche non c'è motivo di ricostruire: il timer può girare spesso
# senza consumare risorse.
if [ "$LOCALE" = "$REMOTO" ] && [ -e "$DESTINAZIONE/current" ] && [ "$FORZA" -eq 0 ]; then
  exit 0
fi

git -C "$SORGENTE" reset --quiet --hard "origin/$BRANCH"
log "codice aggiornato a $(git -C "$SORGENTE" rev-parse --short HEAD)"

# --- costruzione ------------------------------------------------------------

cd "$SORGENTE"
npm ci --include=dev --no-audit --no-fund
VITE_SITE_URL="$SITE_URL" VITE_SITE_BASE_PATH=/ npm run build

# Meglio accorgersi qui che il sito è stato costruito per l'indirizzo
# sbagliato, piuttosto che dopo averlo pubblicato.
if ! grep -q "rel=\"canonical\" href=\"${SITE_URL%/}/\"" dist/index.html; then
  log "ERRORE: la home non dichiara $SITE_URL come indirizzo canonico"
  exit 1
fi

if [ ! -f dist/404.html ] || [ ! -f dist/sitemap.xml ]; then
  log "ERRORE: mancano 404.html o sitemap.xml"
  exit 1
fi

# --- pubblicazione ----------------------------------------------------------

VERSIONE="$DESTINAZIONE/releases/$(date '+%Y%m%d-%H%M%S')-$(git -C "$SORGENTE" rev-parse --short HEAD)"
mkdir -p "$VERSIONE"
cp -r dist/. "$VERSIONE/"

# mv -T su un symlink è atomico: non esiste un istante in cui il sito è
# visibile a metà aggiornamento.
ln -sfn "$VERSIONE" "$DESTINAZIONE/current.tmp"
mv -T "$DESTINAZIONE/current.tmp" "$DESTINAZIONE/current"
log "pubblicata $(basename "$VERSIONE")"

# Le ultime cinque versioni restano sul server, per poter tornare indietro.
# Attenzione: `ls -1dt` senza `*/` elencherebbe la cartella stessa e non
# cancellerebbe mai niente.
cd "$DESTINAZIONE/releases"
ls -1dt */ | tail -n +6 | xargs -r rm -rf
