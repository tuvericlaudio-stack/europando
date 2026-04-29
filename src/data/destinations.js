import { CONTENT_STATUS } from "../utils/content";
import { asset } from "../utils/assets";

export const destinations = [
  {
    slug: "oslo",
    status: CONTENT_STATUS.DRAFT,
    name: "Oslo",
    seoTitle: "Oslo in 3 giorni: cosa vedere e come organizzare il viaggio",
    seoDescription:
      "Guida essenziale a Oslo tra waterfront, musei, architettura contemporanea e itinerario semplice da seguire in 3 giorni.",
    text: "Una capitale nordica ordinata, elegante e molto facile da leggere anche in pochi giorni.",
    tag: "Nordic City",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=80",
    heroTitle: "Oslo, essenziale ma piena di carattere.",
    intro:
      "Una guida essenziale tra waterfront, musei, architettura contemporanea e quartieri dal ritmo molto ordinato.",
    stats: [
      { label: "Giorni ideali", value: "3" },
      { label: "Zona migliore", value: "Centro" },
      { label: "Mood", value: "Nordico" },
    ],
    sections: [
      {
        title: "Dove iniziare",
        text:
          "Il punto migliore da cui partire è la zona centrale vicina all’acqua. Oslo si capisce subito attraverso il suo waterfront, gli edifici moderni e gli spazi molto aperti.",
      },
      {
        title: "Ritmo giusto",
        text:
          "La città rende bene con un itinerario semplice e lineare. Non serve correre: bastano poche tappe ben scelte, distribuite bene nella giornata.",
      },
      {
        title: "Cosa lascia davvero",
        text:
          "Oslo colpisce per equilibrio, pulizia visiva e rapporto continuo tra architettura, acqua e luce. È una città che non ha bisogno di eccessi per lasciare una sensazione forte.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "bucarest",
    status: CONTENT_STATUS.PUBLISHED,
    name: "Bucarest",
    seoTitle: "Bucarest in 3 giorni: cosa vedere, itinerario e consigli pratici",
    seoDescription:
      "Guida a Bucarest con itinerario di 3-4 giorni, zone dove dormire, come muoversi, prezzi utili e consigli pratici per organizzare il viaggio.",
    text: "Una città di contrasti, grandi viali, centro storico e tappe da distribuire bene senza correre.",
    tag: "Urban Mix",
    image: asset("bucarest-hero.jpg"),
    heroTitle: "Bucarest, meglio a blocchi chiari che di corsa.",
    intro:
      "Una città che rende meglio quando la leggi per zone, alternando centro storico, grandi viali, architettura simbolica e momenti più rilassati.",
    stats: [
      { label: "Giorni ideali", value: "3-4" },
      { label: "Zona migliore", value: "Centro" },
      { label: "Mood", value: "Vivo" },
    ],
    itineraryDays: [
      {
        label: "Giorno 1 — Arrivo e primo orientamento",
        places: [
          "Centrul Vechi",
          "Stavropoleos",
          "Macca-Vilacrosse",
          "Passeggiata libera nel centro storico",
        ],
      },
      {
        label: "Giorno 2 — Parte più rappresentativa",
        places: [
          "Carturesti Carusel",
          "Piata Revolutiei",
          "Ateneul Roman",
          "Calea Victoriei",
          "Parlamento",
          "Rientro verso il centro",
        ],
      },
      {
        label: "Giorno 3 — Zona più aperta e rilassata",
        places: [
          "Parco Herastrau",
          "Primaverii",
          "Arco di Trionfo",
          "Passeggiata più lenta",
          "Chiusura tranquilla di giornata",
        ],
      },
      {
        label: "Giorno 4 — Ultime ore utili e partenza",
        places: [
          "Colazione in zona",
          "Ultimo giro leggero",
          "Partenza per aeroporto",
        ],
      },
    ],
    practicalInfo: {
      airportToCenter: [
        "Il bus 100 Express è la soluzione più economica: collega direttamente l’aeroporto al centro, è attivo 24 ore su 24 e ferma anche in punti utili come Piata Victoriei, Piata Romana e Piata Unirii.",
        "Il treno per Gara de Nord è più rapido del bus, ma richiede una navetta per raggiungere la stazione aeroportuale e arriva in una zona meno centrale rispetto alle fermate principali del bus.",
        "Taxi, Uber e Bolt sono la scelta più comoda se arrivi tardi, hai bagagli o vuoi un trasferimento diretto; conviene controllare il prezzo in app e scegliere la soluzione più conveniente.",
      ],
      prices: [
        "Bus 100 Express: circa 0,60 €, con pagamento contactless direttamente a bordo.",
        "Treno per Gara de Nord: circa 6 lei, cioè intorno a 1,21 €.",
        "Taxi, Uber e Bolt: il prezzo varia in base all’orario e al traffico, quindi conviene confrontare sempre al momento.",
      ],
      whereToStay: [
        "Centrul Vechi è la base più immediata se vuoi avere vicino ristoranti, locali e il cuore più vivo della città, ma può essere più rumorosa soprattutto la sera.",
        "Piata Universitatii è probabilmente la zona più equilibrata: centrale, ben collegata e molto comoda per muoversi verso diverse aree di Bucarest.",
        "Piata Romana è un’ottima alternativa se vuoi restare in una zona centrale, viva e pratica, ma con un’atmosfera un po’ meno turistica rispetto al centro storico stretto.",
      ],
      whenToGo: [
        "La primavera e l’inizio autunno sono i periodi migliori: temperature più piacevoli e città più facile da vivere a piedi.",
        "L’estate può funzionare bene per giornate lunghe e vita serale, ma alcune ore possono essere molto calde.",
        "L’inverno può essere interessante per un’atmosfera diversa, ma con ritmi più lenti e temperature più rigide.",
      ],
      gettingAround: [
        "Per il centro e le zone principali conviene muoversi a piedi, soprattutto se scegli un alloggio centrale.",
        "Metro e mezzi pubblici sono utili per coprire tratte più lunghe o collegare quartieri diversi.",
        "Uber e Bolt restano una soluzione pratica quando vuoi spostarti rapidamente senza complicarti troppo il percorso.",
      ],
      notes: [
        "Se resti solo 3 o 4 giorni conviene scegliere una base centrale.",
        "Per un primo viaggio è meglio evitare zone troppo periferiche, così ti muovi in modo più semplice e lineare.",
      ],
    },
    foodGuide: {
      breakfast: ["5 to go", "Ted’s Coffee", "Café Van Gogh"],
      streetFood: [
        "Luca",
        "Gyros Thessalonikis",
        "Dristor Kebap",
        "La Placinte",
        "Springtime",
      ],
      restaurants: [
        "La Mama",
        "Lacrimi si Sfinti",
        "Hanu lui Manuc",
        "Energiea",
        "Simbio",
      ],
      evening: ["Beer O’Clock", "Control Club", "Linea Closer to the Moon"],
    },
    gallery: [
      asset("bucarest-gallery-1.jpg"),
      asset("bucarest-gallery-2.jpg"),
      asset("bucarest-gallery-3.jpg"),
    ],
  },
  {
    slug: "stoccolma",
    status: CONTENT_STATUS.DRAFT,
    name: "Stoccolma",
    seoTitle: "Stoccolma in 3 giorni: cosa vedere tra centro storico e isole",
    seoDescription:
      "Guida a Stoccolma con consigli per un primo viaggio tra Gamla Stan, isole, acqua, passeggiate e tappe ben distribuite.",
    text: "Acqua, isole, eleganza nordica e una città molto leggibile anche al primo viaggio.",
    tag: "Scandinavian",
    image:
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1600&q=80",
    heroTitle: "Stoccolma, elegante e piena di respiro.",
    intro: "Guida essenziale tra centro storico, isole e scorci sul mare.",
    stats: [
      { label: "Giorni ideali", value: "3" },
      { label: "Zona migliore", value: "Norrmalm" },
      { label: "Mood", value: "Raffinato" },
    ],
    sections: [
      {
        title: "Dove iniziare",
        text:
          "Il centro e Gamla Stan danno subito una base chiara. Da lì puoi allargarti senza perdere orientamento.",
      },
      {
        title: "Ritmo giusto",
        text:
          "Stoccolma rende bene con giornate piene ma non stressanti. Passeggiate, tragitti brevi e pause panoramiche funzionano molto bene.",
      },
      {
        title: "Cosa la rende speciale",
        text:
          "Il rapporto tra acqua, architettura e ordine urbano dà alla città una qualità visiva molto forte e immediata.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "valencia",
    status: CONTENT_STATUS.DRAFT,
    name: "Valencia",
    seoTitle: "Valencia in 3 giorni: cosa vedere tra centro, mare e città moderna",
    seoDescription:
      "Guida a Valencia con itinerario semplice tra centro storico, mare, zone moderne e consigli per vivere la città con ritmo rilassato.",
    text: "Sole, mare, centro storico e spazi moderni con un ritmo molto più rilassato.",
    tag: "Sunny City",
    image:
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60f?auto=format&fit=crop&w=1600&q=80",
    heroTitle: "Valencia, luminosa e molto equilibrata.",
    intro: "Guida essenziale tra centro, mare e zone contemporanee.",
    stats: [
      { label: "Giorni ideali", value: "3" },
      { label: "Zona migliore", value: "Ciutat Vella" },
      { label: "Mood", value: "Solare" },
    ],
    sections: [
      {
        title: "Dove iniziare",
        text:
          "Il centro storico è la base più intuitiva. Valencia si presta molto bene a un primo approccio semplice e lineare.",
      },
      {
        title: "Ritmo giusto",
        text:
          "La città permette di mescolare visite, mare e pause senza stress. È una meta che si lascia vivere con facilità.",
      },
      {
        title: "Cosa funziona meglio",
        text:
          "Valencia rende molto quando alterni zone storiche, spazi aperti e momenti più lenti legati al clima e alla luce.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];
