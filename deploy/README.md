# Pubblicare Europando su un server proprio

Guida per portare il sito su `europando.it`, ospitato su un VPS Ubuntu.

`dist/` contiene solo file statici: al server basta servirli. Non c'è Node in
esecuzione, niente processi da tenere vivi, niente che possa andare in crash.

L'ordine dei passaggi conta: il certificato HTTPS non può essere emesso prima
che il dominio punti al server, e il deploy automatico non può funzionare prima
che nginx sappia cosa servire.

## 1. DNS

Dal pannello del registrar, due record che puntano all'indirizzo IP del VPS:

| tipo | nome | valore |
| --- | --- | --- |
| A | `@` | indirizzo IP del server |
| A | `www` | indirizzo IP del server |

La propagazione può richiedere da pochi minuti a qualche ora. Prima di andare
avanti, verifica dal tuo computer:

```bash
dig +short europando.it
```

Deve rispondere con l'IP del server.

## 2. Preparazione del server

Da collegato al VPS come utente con privilegi di amministratore.

```bash
sudo apt update
sudo apt install -y nginx rsync certbot python3-certbot-nginx

# utente dedicato alla pubblicazione: entra solo con la chiave, mai con una
# password, e non ha privilegi di amministratore
sudo adduser --disabled-password --gecos "" deploy

# cartelle del sito
sudo mkdir -p /var/www/europando/releases
sudo chown -R deploy:deploy /var/www/europando
```

Perché un utente dedicato: la chiave che finisce su GitHub potrà scrivere solo
dentro `/var/www/europando`. Se venisse compromessa, non è un accesso da
amministratore al server.

## 3. Chiave SSH per il deploy

**Sul tuo computer**, non sul server:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/europando_deploy -C "deploy europando" -N ""
```

Il comando crea due file: `europando_deploy` è la chiave privata e non va mai
condivisa, `europando_deploy.pub` è quella pubblica, che va autorizzata sul
server.

L'utente `deploy` non ha ancora modo di collegarsi, quindi la chiave va
installata passando dall'utente amministratore. Sempre dal proprio computer,
in un comando solo:

```bash
cat ~/.ssh/europando_deploy.pub | ssh root@IP_DEL_SERVER \
  "mkdir -p /home/deploy/.ssh \
   && tee -a /home/deploy/.ssh/authorized_keys \
   && chown -R deploy:deploy /home/deploy/.ssh \
   && chmod 700 /home/deploy/.ssh \
   && chmod 600 /home/deploy/.ssh/authorized_keys"
```

Se sul server si entra con un utente diverso da `root`, ogni comando remoto va
preceduto da `sudo`.

Prova che funzioni prima di andare avanti:

```bash
ssh -i ~/.ssh/europando_deploy deploy@europando.it "echo collegamento riuscito"
```

Deve rispondere `collegamento riuscito` senza chiedere password. Se chiede una
password, la chiave non è stata autorizzata correttamente: l'errore è quasi
sempre nei permessi della cartella `.ssh` sul server.

```bash
```

## 4. nginx

```bash
sudo cp deploy/nginx/europando.it.conf /etc/nginx/sites-available/europando.it
sudo ln -s /etc/nginx/sites-available/europando.it /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Se sul server ci sono già altri siti, questo file non li tocca: risponde solo
per `europando.it` e `www.europando.it`.

A questo punto il sito risponde in HTTP ma la cartella è vuota: normale, il
contenuto arriva al primo deploy.

## 5. Certificato HTTPS

```bash
sudo certbot --nginx -d europando.it -d www.europando.it
```

certbot aggiunge da sé il blocco HTTPS al file di configurazione e imposta il
rinnovo automatico. Verifica che il rinnovo funzioni:

```bash
sudo certbot renew --dry-run
```

Il certificato dura tre mesi: se il rinnovo automatico non funziona, il sito
diventa inaccessibile senza preavviso. Questo controllo non è opzionale.

## 6. Variabili e segreti su GitHub

In *Settings → Secrets and variables → Actions* del repository.

Variabili (`Variables`, valori non riservati):

| nome | valore |
| --- | --- |
| `SITE_URL` | `https://europando.it` |
| `DEPLOY_HOST` | `europando.it` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PATH` | `/var/www/europando` |

Segreti (`Secrets`, valori riservati):

| nome | come ottenerlo |
| --- | --- |
| `DEPLOY_SSH_KEY` | contenuto di `~/.ssh/europando_deploy` (la chiave **privata**, tutto il file) |
| `DEPLOY_KNOWN_HOSTS` | output di `ssh-keyscan -H europando.it` |

`DEPLOY_KNOWN_HOSTS` serve a fissare l'impronta del server: senza, il deploy
accetterebbe qualunque macchina si presentasse con quel nome.

Finché `DEPLOY_HOST` non esiste, il workflow di deploy sul VPS non parte. È
voluto: permette di avere il workflow nel repository prima che il server sia
pronto, senza che il branch `main` diventi rosso.

## 7. Primo deploy

Da *Actions → Deploy Europando sul VPS → Run workflow*, oppure con il prossimo
push su `main`.

Il workflow, in ordine: installa, esegue il lint, costruisce il sito per il
dominio, **verifica che la build punti davvero a `europando.it`** (un errore qui
significherebbe pubblicare pagine con indirizzi sbagliati), copia la nuova
versione in `releases/<commit>`, sposta il symlink `current`, controlla che la
home risponda 200 e che un indirizzo inesistente risponda 404.

Lo scambio del symlink è atomico: nessun visitatore vede il sito a metà.

### Tornare indietro

Sul server restano le ultime cinque versioni:

```bash
ls -1dt /var/www/europando/releases/*/
ln -sfn /var/www/europando/releases/<commit-precedente> /var/www/europando/current.tmp
mv -T /var/www/europando/current.tmp /var/www/europando/current
```

Nessun riavvio di nginx, effetto immediato.

## 8. Dopo il passaggio: la vecchia copia su GitHub Pages

Finché entrambe le copie sono online, lo stesso contenuto esiste a due
indirizzi diversi e Google deve indovinare quale sia quello buono.

Il sito è stato pubblicato su Pages da pochissimo e non è praticamente
indicizzato, quindi la cosa più semplice è anche quella corretta: disattivare
GitHub Pages in *Settings → Pages* e disabilitare il workflow
`deploy.yml`, che a quel punto non ha più uno scopo.

Se invece qualche indirizzo `github.io` fosse già indicizzato, conviene
sostituire il contenuto pubblicato su Pages con una pagina che rimanda al nuovo
dominio, e tenerla lì qualche mese.
