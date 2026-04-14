import { asset } from "../utils/assets";

export const destinations = [
  {
    slug: "oslo",
    name: "Oslo",
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
  name: "Bucarest",
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
      "Taxi o ride app sono la soluzione più semplice se arrivi tardi o con bagagli.",
      "Il collegamento ferroviario verso Gara de Nord è utile se vuoi entrare in città in modo lineare.",
      "Bus e transfer hanno senso se vuoi spendere meno e non hai necessità di arrivare subito in centro.",
    ],
    whereToStay: [
      "Centrul Vechi è la base più comoda se vuoi muoverti a piedi e avere il cuore della città subito vicino.",
      "Piata Universitatii funziona bene se vuoi restare centrale ma con spostamenti facili.",
      "Piata Romana è una buona alternativa se cerchi una zona viva ma meno turistica del centro storico stretto.",
    ],
    notes: [
      "Per un primo viaggio conviene restare in area centrale.",
      "Se hai pochi giorni, evita alloggi troppo periferici.",
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
    slug: "stoccolma",
    name: "Stoccolma",
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
    name: "Valencia",
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