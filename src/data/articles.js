import { CONTENT_STATUS } from "../utils/content";

export const articles = [
  {
    slug: "bucarest-ci-ha-sorpresi",

    status: CONTENT_STATUS.PUBLISHED,

    title: "Bucarest ci ha sorpresi",

    category: "Travel Journal",

    subtitle:
      "Tre giorni tra edifici monumentali, cortili nascosti e una città capace di cambiare atmosfera continuamente.",

    author: "Europando",

    date: "Luglio 2026",

    readingTime: "7 minuti di lettura",

    tripFacts: [
      {
        type: "place",
        label: "Destinazione",
        value: "Bucarest, Romania",
      },
      {
        type: "duration",
        label: "Durata",
        value: "3 giorni",
      },
      {
        type: "budget",
        label: "Stile di viaggio",
        value: "City break low cost",
      },
    ],

    heroImage: "/bucarest-hero.jpg",

    heroWidth: 1200,

    heroHeight: 1600,

    heroAlt: "Palazzo del Parlamento di Bucarest",

    intro:
      "Quando abbiamo scelto Bucarest non cercavamo una città perfetta o da cartolina. Volevamo una destinazione europea accessibile, semplice da raggiungere e adatta a pochi giorni. Quello che abbiamo trovato è stata una città difficile da descrivere con una sola parola, capace di sorprenderci proprio attraverso le sue contraddizioni.",

    days: [
      {
        number: 1,

        navigationTitle: "Arrivo e prime impressioni",

        title: "Il nostro primo incontro con Bucarest",

        subtitle:
          "L’arrivo, il primo giro nel centro e quella sensazione iniziale difficile da interpretare.",

        intro:
          "Il primo giorno è servito soprattutto a orientarci e a capire il carattere della città. Bucarest non ci ha mostrato subito il suo lato più affascinante: abbiamo dovuto camminare, osservare e lasciarle il tempo di raccontarsi.",

        sections: [
          {
            title: "Una città che non si mostra subito",

            paragraphs: [
              "Il primo impatto con Bucarest è stato fatto di grandi strade, edifici imponenti e una sensazione iniziale difficile da interpretare. Alcune zone apparivano eleganti, altre più caotiche e segnate dal tempo.",
              "Abbiamo capito presto che non avremmo dovuto cercare una città uniforme. Il suo fascino si trovava proprio nell’alternanza tra palazzi monumentali, architetture più fragili e piccoli luoghi nascosti dietro strade molto frequentate.",
            ],

            image: "/bucarest-gallery-1.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt:
              "Il cortile della chiesa Stavropoleos a Bucarest",

            caption:
              "Uno degli angoli più silenziosi incontrati durante il primo giorno.",

            quote:
              "A Bucarest basta attraversare una strada per avere la sensazione di essere entrati in un’altra città.",

            tip:
              "Il primo giorno non riempite troppo il programma. Dedicate qualche ora a camminare senza un percorso rigido, così da iniziare a comprendere le diverse anime della città.",
          },
        ],
      },

      {
        number: 2,

        navigationTitle: "Il cuore di Bucarest",

        title: "Tra centro storico e luoghi sorprendenti",

        subtitle:
          "La giornata più intensa, tra architettura, locali, chiese e uno degli interni più fotografati della città.",

        intro:
          "Il secondo giorno è stato quello con il programma più ricco. Dopo il primo orientamento, abbiamo iniziato a riconoscere le zone e a muoverci con maggiore naturalezza.",

        sections: [
          {
            title: "Il silenzio dietro il centro storico",

            paragraphs: [
              "Nel centro storico si concentrano locali, ristoranti e una parte importante della vita serale. È una zona vivace e spesso affollata, ma è sufficiente allontanarsi di pochi metri per trovare un’atmosfera completamente diversa.",
              "Il piccolo cortile di Stavropoleos è stato uno di quei luoghi che non richiedono molto tempo, ma che rimangono impressi. Dopo il rumore delle vie circostanti, entrarvi ci ha dato la sensazione di rallentare improvvisamente.",
            ],

            image: "/bucarest-gallery-2.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt:
              "Interno della libreria Cărturești Carusel",

            caption:
              "Cărturești Carusel, uno degli interni più riconoscibili di Bucarest.",

            quote:
              "I luoghi che ci sono rimasti maggiormente impressi non sono sempre stati quelli più grandi o monumentali.",

            tip:
              "Per visitare con maggiore tranquillità i luoghi più conosciuti del centro, conviene arrivare nelle prime ore del mattino.",
          },

          {
            title: "La bellezza dei contrasti",

            paragraphs: [
              "Bucarest non presenta una bellezza immediata e ordinata. Accanto a un edificio elegante può comparire un palazzo segnato dal tempo; una strada molto trafficata può condurre a un cortile silenzioso.",
              "Questa mancanza di uniformità inizialmente disorienta, ma con il passare delle ore diventa la caratteristica più affascinante della città.",
            ],

            image: "",

            imageAlt: "",

            caption: "",

            quote:
              "Non è una città da osservare soltanto: è una città che bisogna imparare a leggere.",
          },
        ],
      },

      {
        number: 3,

        navigationTitle: "Le ultime ore",

        title: "Il saluto alla città",

        subtitle:
          "Le ultime visite, le passeggiate serali e le impressioni che abbiamo portato a casa.",

        intro:
          "L’ultimo giorno aveva inevitabilmente un ritmo diverso. Il tempo a disposizione era poco, ma ormai Bucarest ci sembrava più familiare rispetto al nostro arrivo.",

        sections: [
          {
            title: "La città dopo il tramonto",

            paragraphs: [
              "La sera Bucarest cambia ancora. Gli edifici illuminati acquistano eleganza, le strade del centro diventano più animate e alcuni luoghi che durante il giorno possono sembrare ordinari assumono un carattere completamente diverso.",
              "È passeggiando dopo il tramonto che abbiamo iniziato a percepirla non soltanto come una destinazione da visitare, ma come una città realmente vissuta.",
            ],

            image: "/bucarest-gallery-3.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt:
              "Edificio storico illuminato durante la notte a Bucarest",

            caption:
              "Le luci serali trasformano l’architettura della città.",

            quote:
              "Bucarest non finisce quando chiudono i monumenti: è proprio allora che mostra un altro volto.",
          },

          {
            title: "Quello che ci è rimasto del viaggio",

            paragraphs: [
              "Bucarest non è perfetta e probabilmente non cerca nemmeno di esserlo. Non possiede sempre l’ordine di altre capitali europee e non offre in ogni strada la fotografia ideale.",
              "Eppure è proprio questo a renderla autentica. Ci sono rimasti il cortile silenzioso di una chiesa, la luce bianca di una libreria, la presenza imponente del Parlamento e le passeggiate serali tra edifici illuminati.",
              "La consiglieremmo a chi cerca una capitale diversa, ancora capace di sorprendere e sufficientemente accessibile da trasformarsi in un viaggio possibile anche per pochi giorni.",
            ],

            image: "/bucarest-hero.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt:
              "Veduta del Palazzo del Parlamento di Bucarest",

            caption:
              "Il Palazzo del Parlamento, simbolo monumentale della città.",

            quote:
              "Non ci ha conquistati attraverso una singola attrazione, ma attraverso l’insieme delle sue contraddizioni.",
          },
        ],
      },
    ],

    gallery: [],

    galleryTitle: "Bucarest attraverso le nostre fotografie",

    relatedDestination: {
      slug: "bucarest",
      name: "Bucarest",
      text:
        "Nella nostra guida trovi l’itinerario di tre giorni, le informazioni sui trasporti, i luoghi da vedere e gli indirizzi che abbiamo raccolto durante il viaggio.",
    },

    seo: {
      title: "Bucarest ci ha sorpresi | Europando",
      description:
        "Il nostro diario di tre giorni a Bucarest, tra centro storico, luoghi nascosti e impressioni personali.",
    },
  },
];