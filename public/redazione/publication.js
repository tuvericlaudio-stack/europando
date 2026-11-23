const owner = "tuvericlaudio-stack";
const repo = "europando";
const main = "main";
const site = "https://europando.it";
const api = "https://api.github.com";
const repository = `/repos/${owner}/${repo}`;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const articlePath = (slug) => `src/data/redazione/${slug}.json`;
const articleUrl = (slug) => `${site}/articoli/${slug}/`;
const reviewUrl = (number) => `https://github.com/${owner}/${repo}/pull/${number}`;
const trim = (value) => typeof value === "string" ? value.trim() : "";
const photoDataPattern = /^data:image\/(jpeg|png|webp);base64,([a-z0-9+/=]+)$/i;
const dateInRome = () => new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit"
}).format(new Date());

export function suggestedSlug(title) {
  return trim(title).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80).replace(/^-|-$/g, "");
}

async function digest(value) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function photoDimensions(photo) {
  return Number.isSafeInteger(photo.width) && Number.isSafeInteger(photo.height) &&
    photo.width > 0 && photo.height > 0
    ? { width: photo.width, height: photo.height, aspect: `${photo.width}/${photo.height}` }
    : {};
}

function articleFromDraft(draft, slug, previous) {
  const sections = draft.sections.map(({ title, body }) => ({
    title: trim(title),
    paragraphs: trim(body).split(/\n\s*\n/).map(trim).filter(Boolean)
  })).filter((section) => section.title || section.paragraphs.length);
  return {
    editorialId: draft.id,
    slug,
    status: "published",
    title: trim(draft.title),
    category: "Itinerari di viaggio",
    ...(trim(draft.destination) ? { destinationName: trim(draft.destination) } : {}),
    author: "Europando",
    date: previous?.date ?? dateInRome(),
    intro: trim(draft.intro),
    sections
  };
}

function articleImages(images) {
  const cover = images.find((image) => image.cover) ?? images[0];
  return {
    ...(cover ? {
      heroImage: cover.src,
      heroAlt: cover.alt,
      heroAspect: cover.aspect,
      heroWidth: cover.width,
      heroHeight: cover.height
    } : {}),
    gallery: images.filter((image) => image !== cover).map(({ src, alt }) => ({ src, alt }))
  };
}

function articlePhoto(photo, src) {
  return { src, alt: trim(photo.alt), cover: photo.cover, ...photoDimensions(photo) };
}

export function preparePreview(draft) {
  const previous = draft.publication;
  const slug = previous?.slug ?? draft.publishSlug ?? suggestedSlug(draft.title);
  const images = draft.photos.filter((photo) => photoDataPattern.test(photo.data))
    .map((photo) => articlePhoto(photo, photo.data));
  const article = articleFromDraft(draft, slug, previous);
  return { ...article, ...articleImages(images), status: "draft", title: article.title || "Senza titolo" };
}

export async function preparePublication(draft, slug, previous) {
  if (!slugPattern.test(slug) || slug.length > 80) throw new Error("Usa un indirizzo con lettere minuscole, numeri e trattini.");
  const article = articleFromDraft(draft, slug, previous);
  if (!article.title || !article.intro || !article.sections.length ||
      article.sections.some((section) => !section.title || !section.paragraphs.length)) {
    throw new Error("Completa titolo, introduzione e il testo di ogni sezione prima di inviare.");
  }
  if (!draft.id || !/^[a-f0-9-]{36}$/i.test(draft.id)) throw new Error("Importa di nuovo una copia di lavoro per ottenere un identificatore valido.");

  const images = [];
  const imageFiles = new Map();
  for (const photo of draft.photos) {
    if (!trim(photo.alt)) throw new Error("Aggiungi una descrizione a ogni foto selezionata.");
    const imageData = photoDataPattern.exec(photo.data);
    if (!imageData) throw new Error("Una foto non è leggibile. Caricala di nuovo come JPEG, PNG o WebP.");
    const [, format, base64] = imageData;
    const hash = await digest(base64);
    const extension = format.toLowerCase() === "jpeg" ? "jpg" : format.toLowerCase();
    const src = `/redazione-foto/${slug}/${hash}.${extension}`;
    imageFiles.set(`public${src}`, base64);
    images.push(articlePhoto(photo, src));
  }
  Object.assign(article, articleImages(images));
  const revision = await digest(JSON.stringify(article));
  article.editorialRevision = revision;
  return { article, revision, imageFiles };
}

function createClient(token) {
  return async (path, { method = "GET", body, missing = false } = {}) => {
    const response = await fetch(`${api}${path}`, {
      method,
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      signal: AbortSignal.timeout(25000),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(body ? { "Content-Type": "application/json" } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    if (missing && response.status === 404) return null;
    if (!response.ok) {
      if (response.status === 401) throw new Error("Accesso GitHub scaduto o non valido. Collega di nuovo GitHub.");
      if (response.status === 403) throw new Error("GitHub ha negato l’operazione. Verifica i permessi del token per il repository europando.");
      throw new Error(`GitHub ha restituito un errore (${response.status}). Riprova o controlla la richiesta su GitHub.`);
    }
    return response.json();
  };
}

function decodeFile(file) {
  return new TextDecoder().decode(Uint8Array.from(
    atob(file.content.replace(/\s/g, "")), (character) => character.charCodeAt(0)
  ));
}

const remoteFile = (client, path, ref) =>
  client(`${repository}/contents/${path}?ref=${encodeURIComponent(ref)}`, { missing: true });

const readArticle = async (client, slug, ref) => {
  const file = await remoteFile(client, articlePath(slug), ref);
  return file ? JSON.parse(decodeFile(file)) : null;
};

export async function stagePublication(client, draft, slug) {
  if (!slugPattern.test(slug) || slug.length > 80) throw new Error("Controlla l’indirizzo dell’articolo.");
  const base = await client(`${repository}/branches/${main}`);
  const previous = await readArticle(client, slug, base.commit.sha);
  if (previous && previous.editorialId !== draft.id) throw new Error("Questo indirizzo appartiene a un altro articolo. Scegline uno diverso.");
  if (!previous) {
    for (const path of ["src/data/articles.js", "src/data/posts.js"]) {
      const file = await remoteFile(client, path, base.commit.sha);
      if (file && new RegExp(`\\bslug\\s*:\\s*["']${slug}["']`).test(decodeFile(file))) {
        throw new Error("Questo indirizzo è già in uso nel sito. Scegline uno diverso.");
      }
    }
  }

  const prepared = await preparePublication(draft, slug, previous);
  const { article, revision, imageFiles } = prepared;
  if (previous?.editorialRevision === revision) return { slug, revision, date: article.date, phase: "deploy" };

  const branch = `redazione/${slug}-${revision.slice(0, 20)}`;
  let ref = await client(`${repository}/git/ref/heads/${branch}`, { missing: true });
  if (!ref) {
    const tree = [{ path: articlePath(slug), mode: "100644", type: "blob", content: JSON.stringify(article, null, 2) + "\n" }];
    for (const [path, content] of imageFiles) {
      const blob = await client(`${repository}/git/blobs`, { method: "POST", body: { encoding: "base64", content } });
      tree.push({ path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const result = await client(`${repository}/git/trees`, {
      method: "POST", body: { base_tree: base.commit.commit.tree.sha, tree }
    });
    const commit = await client(`${repository}/git/commits`, {
      method: "POST", body: { message: `Prepara articolo: ${article.title.replace(/\s+/g, " ").slice(0, 120)}`, tree: result.sha, parents: [base.commit.sha] }
    });
    ref = await client(`${repository}/git/refs`, {
      method: "POST", body: { ref: `refs/heads/${branch}`, sha: commit.sha }
    });
  }

  const head = ref.object.sha;
  const staged = await readArticle(client, slug, head);
  if (staged?.editorialRevision !== revision || staged?.editorialId !== draft.id) throw new Error("Il contenuto su GitHub è cambiato. Controlla la richiesta prima di proseguire.");

  const existing = await client(`${repository}/pulls?base=${main}&head=${encodeURIComponent(`${owner}:${branch}`)}&state=open`);
  const pull = existing[0] ?? await client(`${repository}/pulls`, { method: "POST", body: {
    title: `Articolo: ${article.title.replace(/\s+/g, " ").slice(0, 120)}`,
    body: "Articolo inviato dalla redazione EUROPANDO. La pubblicazione passa dalla build del sito.",
    base: main,
    head: branch
  } });
  if (pull.head.sha !== head) throw new Error("La versione sull’anteprima GitHub è cambiata. Controllala prima di pubblicare.");
  return { number: pull.number, head, slug, revision, date: article.date, phase: "checking" };
}

async function publicationStatus(client, record) {
  const pull = await client(`${repository}/pulls/${record.number}`);
  if (pull.head.sha !== record.head || pull.base.ref !== main) return "changed";
  if (pull.merged) return "deploy";
  if (pull.state === "closed") return "closed";
  const runs = await client(`${repository}/actions/workflows/checks.yml/runs?event=pull_request&head_sha=${record.head}`);
  const check = runs.workflow_runs[0];
  if (check?.status !== "completed") return "checking";
  if (check.conclusion !== "success") return "failed";
  if (pull.mergeable === false) return "conflict";
  return pull.mergeable === true ? "ready" : "checking";
}

async function verifyLive(record) {
  const response = await fetch(`${articleUrl(record.slug)}?rev=${record.revision}`, {
    cache: "no-store",
    credentials: "omit",
    redirect: "error",
    signal: AbortSignal.timeout(12000)
  });
  return response.ok && (await response.text()).includes(`data-editorial-revision="${record.revision}"`);
}

const messages = {
  checking: "Articolo inviato. GitHub sta controllando la build.",
  ready: "Controlli superati. Puoi mettere online questa versione.",
  failed: "La build non è passata. Apri il controllo su GitHub per vedere il problema.",
  conflict: "GitHub ha rilevato un conflitto. Apri il controllo prima di proseguire.",
  changed: "La richiesta è cambiata su GitHub. Verifica il contenuto nella richiesta.",
  closed: "La richiesta è stata chiusa. Modifica la bozza per inviare una nuova versione.",
  deploy: "Versione consegnata al sito. Controlla lo stato finché appare il link pubblico.",
  live: "Questa versione è online su europando.it."
};

export function bindPublication(currentArticle, save) {
  const find = (id) => document.getElementById(id);
  if (location.origin !== site) {
    find("publish-origin").hidden = false;
    return () => {};
  }

  find("publish-controls").hidden = false;
  const slugInput = find("publish-slug");
  const tokenInput = find("github-token");
  let client;
  let busy = false;

  function render() {
    const draft = currentArticle();
    const record = draft.publication;
    const active = record && !["live", "closed"].includes(record.phase);
    const slug = record?.slug ?? draft.publishSlug ?? suggestedSlug(draft.title);
    slugInput.value = slug;
    slugInput.disabled = Boolean(record) || busy;
    find("publish-url").textContent = slug ? articleUrl(slug) : "";
    find("publish-status").textContent = record
      ? messages[record.phase]
      : client ? "GitHub collegato. Quando l’articolo è pronto, invialo al controllo." : "Collega GitHub per inviare la versione finale.";
    find("connect").disabled = Boolean(client) || busy;
    find("disconnect").hidden = !client;
    find("disconnect").disabled = busy;
    tokenInput.disabled = Boolean(client) || busy;
    find("send-for-check").hidden = Boolean(active);
    find("send-for-check").disabled = busy || !client;
    find("send-for-check").textContent = record?.phase === "live" ? "Invia un aggiornamento" : "Invia al controllo";
    find("recheck").hidden = !active;
    find("recheck").disabled = busy || (!client && record?.phase !== "deploy");
    find("publish-live").hidden = record?.phase !== "ready";
    find("publish-live").disabled = busy || !client;
    find("publication-link").hidden = record?.phase !== "live";
    if (record?.phase === "live") find("publication-link").href = articleUrl(record.slug);
    find("review-link").hidden = !record?.number;
    if (record?.number) find("review-link").href = reviewUrl(record.number);
  }

  async function perform(status, operation) {
    if (busy) return;
    const draft = currentArticle();
    busy = true;
    render();
    find("publish-status").textContent = status;
    let error;
    try { await operation(draft); }
    catch (failure) { error = failure; }
    busy = false;
    render();
    if (error && currentArticle() === draft) {
      find("publish-status").textContent = error instanceof TypeError ||
        ["TimeoutError", "AbortError"].includes(error.name)
        ? "Connessione interrotta. Controlla lo stato prima di riprovare."
        : error.message;
    }
  }

  slugInput.addEventListener("input", () => {
    currentArticle().publishSlug = slugInput.value;
    find("publish-url").textContent = slugInput.value ? articleUrl(slugInput.value) : "";
    save();
  });

  find("connect-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const token = tokenInput.value.trim();
    tokenInput.value = "";
    perform("Collegamento a GitHub…", async () => {
      if (!/^github_pat_[A-Za-z0-9_]+$/.test(token)) throw new Error("Inserisci un token GitHub a permessi granulari.");
      const authenticated = createClient(token);
      const user = await authenticated("/user");
      const info = await authenticated(repository);
      if (user.login.toLowerCase() !== owner || !info.permissions?.push) throw new Error("Il profilo GitHub non ha accesso in scrittura a EUROPANDO.");
      client = authenticated;
    });
  });

  find("disconnect").addEventListener("click", () => {
    client = undefined;
    render();
  });

  find("send-for-check").addEventListener("click", () => {
    const slug = slugInput.value.trim();
    if (!client || !window.confirm("Inviare il testo e le foto di questa versione al repository pubblico di EUROPANDO?")) return;
    perform("Invio della versione da controllare…", async (draft) => {
      const snapshot = structuredClone(draft);
      draft.publication = await stagePublication(client, snapshot, slug);
      save();
    });
  });

  async function refresh(draft) {
    const record = draft.publication;
    if (record.phase !== "deploy") record.phase = await publicationStatus(client, record);
    if (record.phase === "deploy" && await verifyLive(record)) record.phase = "live";
    save();
  }

  find("recheck").addEventListener("click", () => perform("Verifica dello stato…", refresh));
  find("publish-live").addEventListener("click", () => {
    if (!client || !window.confirm("Mettere online la versione già controllata da GitHub?")) return;
    perform("Avvio della pubblicazione…", async (draft) => {
      const record = draft.publication;
      record.phase = await publicationStatus(client, record);
      save();
      if (record.phase !== "ready") return;
      const result = await client(`${repository}/pulls/${record.number}/merge`, {
        method: "PUT", body: { sha: record.head, merge_method: "squash" }
      });
      if (!result.merged) throw new Error("GitHub non ha unito la versione. Apri il controllo per verificarla.");
      record.phase = "deploy";
      save();
    });
  });

  return render;
}
