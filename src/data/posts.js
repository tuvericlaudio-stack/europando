import { CONTENT_STATUS } from "../utils/content";
import { asset } from "../utils/assets";

export const featuredPosts = [
  {
    slug: "due-settimane-palma",
    status: CONTENT_STATUS.DRAFT,
    title: "Due settimane a Palma",
    category: "Travel Journal",
    excerpt:
      "Due settimane per vivere Palma con un ritmo più pieno, alternando centro, mare, pause e giornate costruite con più respiro.",
    meta: "10 min lettura",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Due settimane a Palma, con un ritmo più ampio e più naturale.",
    intro:
      "Una guida pensata per distribuire bene giornate, pause e zone della città senza comprimere tutto troppo in fretta.",
    sections: [
      {
        title: "Perché funziona bene su due settimane",
        text:
          "Palma rende molto meglio quando non la tratti come una semplice tappa veloce. Due settimane permettono di alternare centro, mare, pause vere e giornate più leggere senza perdere qualità.",
      },
      {
        title: "Come organizzare il tempo",
        text:
          "La cosa migliore è non riempire ogni giorno. Palma ha un ritmo che funziona bene con blocchi semplici: una zona principale, una pausa, una seconda parte più libera e una chiusura serale coerente.",
      },
      {
        title: "Che tipo di viaggio viene fuori",
        text:
          "Ne esce un soggiorno più fluido, ordinato e piacevole, dove la città non si esaurisce in pochi luoghi ma costruisce un’esperienza molto più completa.",
      },
    ],
  },
  {
    slug: "una-settimana-irlanda",
    status: CONTENT_STATUS.DRAFT,
    title: "Una settimana in Irlanda",
    category: "Travel Plan",
    freeHero: true,
    excerpt:
      "Sette giorni tra città, paesaggi aperti, soste panoramiche e tappe distribuite con una logica semplice.",
    meta: "9 min lettura",
    image: asset("irlanda-hero.jpg"),
    heroTitle: "Una settimana in Irlanda, senza caricare troppo il viaggio.",
    intro:
      "Una guida organizzata per giorni, pensata per distribuire bene tappe, spostamenti e pause lungo una settimana.",
    daySections: [
      {
        day: "Giorno 1",
        title: "Arrivo e primo approccio",
        text:
          "Qui inserirai il testo del primo giorno: arrivo, sistemazione, prima zona visitata, ritmo della giornata e prime impressioni.",
        image: asset("irlanda-day-1.jpg"),
      },
      {
        day: "Giorno 2",
        title: "Prima giornata piena",
        text:
          "Qui inserirai il testo della prima giornata completa: itinerario, luoghi principali, spostamenti e cosa ha senso fare senza correre.",
        image: asset("irlanda-day-2.jpg"),
      },
      {
        day: "Giorno 3",
        title: "Paesaggi e spostamenti",
        text:
          "Qui inserirai il testo del terzo giorno: tratte panoramiche, tappe naturali, eventuali soste utili e ritmo generale.",
        image: asset("irlanda-day-3.jpg"),
      },
      {
        day: "Giorno 4",
        title: "Tappa centrale del viaggio",
        text:
          "Qui inserirai il testo del quarto giorno: cuore dell’itinerario, luoghi più forti, atmosfera e organizzazione della giornata.",
        image: asset("irlanda-day-4.jpg"),
      },
      {
        day: "Giorno 5",
        title: "Giornata di equilibrio",
        text:
          "Qui inserirai il testo del quinto giorno: alternanza tra visita, spostamenti, pause e gestione più rilassata del viaggio.",
        image: asset("irlanda-day-5.jpg"),
      },
      {
        day: "Giorno 6",
        title: "Ultime tappe forti",
        text:
          "Qui inserirai il testo del sesto giorno: ultime visite davvero importanti, eventuali deviazioni utili e chiusura del percorso.",
        image: asset("irlanda-day-6.jpg"),
      },
      {
        day: "Giorno 7",
        title: "Chiusura del viaggio",
        text:
          "Qui inserirai il testo dell’ultimo giorno: conclusione, ultime ore utili, rientro e bilancio finale della settimana.",
        image: asset("irlanda-day-7.jpg"),
      },
    ],
  },
  {
    slug: "una-settimana-puglia",
    status: CONTENT_STATUS.DRAFT,
    title: "Una settimana in Puglia",
    category: "Travel Guide",
    excerpt:
      "Una settimana per costruire un viaggio chiaro tra borghi, mare, spostamenti lineari e tappe ben distribuite.",
    meta: "8 min lettura",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    heroTitle: "Una settimana in Puglia, con un itinerario semplice e leggibile.",
    intro:
      "Una guida pensata per alternare bene borghi, mare, pause e giornate più forti senza rendere il viaggio dispersivo.",
    sections: [
      {
        title: "Come impostare la settimana",
        text:
          "In Puglia conviene evitare itinerari troppo spezzati. Una settimana funziona bene se scegli un asse chiaro e distribuisci le tappe senza continui cambi di base.",
      },
      {
        title: "Alternare luoghi e ritmo",
        text:
          "Il viaggio rende meglio quando alterni giornate più visive, borghi, tratti di costa e momenti più leggeri. Il valore sta proprio nell’equilibrio.",
      },
      {
        title: "Che tipo di esperienza costruisce",
        text:
          "Ne esce una settimana ordinata e molto leggibile, in cui il paesaggio, la luce e i centri storici lavorano insieme senza creare confusione.",
      },
    ],
  },
  {
    slug: "dove-mangiare-bucarest",
    status: CONTENT_STATUS.DRAFT,
    title: "Dove mangiare a Bucarest",
    category: "Travel Guide",
    excerpt:
      "Qui inserirai l'estratto: una selezione di colazioni, street food e ristoranti per orientarsi a Bucarest senza tentativi a vuoto.",
    meta: "6 min lettura",
    image: asset("bucarest-hero.jpg"),
    heroTitle: "Dove mangiare a Bucarest, senza tentativi a vuoto.",
    intro:
      "Qui inserirai l'introduzione: a chi è rivolto l'articolo e come si collega alla guida principale su Bucarest.",
    sections: [
      {
        title: "Colazione",
        text:
          "Qui inserirai il testo sulla colazione: locali consigliati, zone, cosa aspettarsi. Punto di partenza: la lista già raccolta nella guida di Bucarest (Luca, 5 to go, Ted's Coffee, Café Van Gogh, Coftale, Gram Bistro).",
      },
      {
        title: "Street food",
        text:
          "Qui inserirai il testo sullo street food: locali, piatti tipici, prezzi indicativi. Punto di partenza: Luca, Gyros Thessalonikis, In House Pastrami.",
      },
      {
        title: "Ristoranti",
        text:
          "Qui inserirai il testo sui ristoranti: quando sceglierli, fascia di prezzo, atmosfera. Punto di partenza: Hanu lui Manuc, Caru cu Bere, Simbio, Beraria H Herastrau.",
      },
    ],
  },
  {
    slug: "bucarest-in-2-giorni",
    status: CONTENT_STATUS.DRAFT,
    title: "Bucarest in 2 giorni",
    category: "Travel Guide",
    excerpt:
      "Qui inserirai l'estratto: una versione compressa dell'itinerario per chi ha solo un weekend a disposizione.",
    meta: "6 min lettura",
    image: asset("bucarest-hero.jpg"),
    heroTitle: "Bucarest in 2 giorni, il weekend essenziale.",
    intro:
      "Qui inserirai l'introduzione: per chi è pensato questo itinerario ridotto e in cosa si differenzia dalla guida completa in 3-4 giorni.",
    sections: [
      {
        title: "Primo giorno",
        text:
          "Qui inserirai il testo del primo giorno: cosa tenere dall'itinerario completo, cosa tagliare, priorità.",
      },
      {
        title: "Secondo giorno",
        text:
          "Qui inserirai il testo del secondo giorno: chiusura del weekend, ultime tappe, eventuale nota su rientro o partenza.",
      },
      {
        title: "Cosa sacrificare rispetto a una permanenza più lunga",
        text:
          "Qui inserirai il testo su cosa manca in 2 giorni rispetto ai 3-4 della guida principale, per chi vuole valutare se allungare il viaggio.",
      },
    ],
  },
  {
    slug: "come-arrivare-muoversi-bucarest",
    status: CONTENT_STATUS.DRAFT,
    title: "Come arrivare e muoversi a Bucarest",
    category: "Travel Guide",
    excerpt:
      "Qui inserirai l'estratto: aeroporto, mezzi pubblici, taxi e app, per arrivare in centro senza sorprese.",
    meta: "5 min lettura",
    image: asset("bucarest-hero.jpg"),
    heroTitle: "Come arrivare e muoversi a Bucarest.",
    intro:
      "Qui inserirai l'introduzione: perché conviene un articolo dedicato ai trasporti oltre alla guida principale.",
    sections: [
      {
        title: "Dall'aeroporto al centro",
        text:
          "Qui inserirai il testo su bus 100 Express, treno per Gara de Nord e taxi/Uber/Bolt, riprendendo e ampliando quanto già presente nella guida principale.",
      },
      {
        title: "Muoversi in città",
        text:
          "Qui inserirai il testo su metro, mezzi pubblici e app di trasporto, con dettagli pratici su biglietti e zone coperte.",
      },
      {
        title: "Consigli pratici",
        text:
          "Qui inserirai eventuali accorgimenti utili: orari, sicurezza, app da scaricare prima di partire.",
      },
    ],
  },
  {
    slug: "bucarest-budget-basso",
    status: CONTENT_STATUS.DRAFT,
    title: "Bucarest con un budget contenuto",
    category: "Travel Guide",
    excerpt:
      "Qui inserirai l'estratto: come vivere Bucarest spendendo poco, tra alloggio, trasporti e cibo.",
    meta: "6 min lettura",
    image: asset("bucarest-hero.jpg"),
    heroTitle: "Bucarest con un budget contenuto.",
    intro:
      "Qui inserirai l'introduzione: perché Bucarest si presta a un viaggio economico e cosa aspettarsi in termini di spesa media.",
    sections: [
      {
        title: "Dove dormire spendendo poco",
        text:
          "Qui inserirai il testo su zone e tipologie di alloggio più economiche, collegandoti alle zone già indicate nella guida principale.",
      },
      {
        title: "Mangiare senza spendere troppo",
        text:
          "Qui inserirai il testo su colazioni, street food e locali economici, riprendendo la lista della guida principale.",
      },
      {
        title: "Spostamenti e attività a basso costo",
        text:
          "Qui inserirai il testo su trasporti pubblici economici e attività gratuite o quasi (parchi, passeggiate, quartieri da vedere a piedi).",
      },
    ],
  },
];
