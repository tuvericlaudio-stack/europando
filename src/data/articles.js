import { CONTENT_STATUS } from "../utils/content";

export const articles = [
  {
    slug: "bucarest-ci-ha-sorpresi",

    status: CONTENT_STATUS.PUBLISHED,

    title: "Bucarest ci ha sorpresi",

    category: "Travel Journal",

    subtitle:
      "Un ponte del 25 aprile tra strade in festa, rooftop suggestivi e la scelta di vivere la città come i suoi abitanti, non come i turisti.",

    author: "Europando",

    date: "Aprile 2026",

    readingTime: "9 minuti di lettura",

    tripFacts: [
      {
        type: "place",
        label: "Destinazione",
        value: "Bucarest, Romania",
      },
      {
        type: "duration",
        label: "Durata",
        value: "Ponte del 25 aprile, 2 giorni pieni più arrivo e partenza",
      },
      {
        type: "budget",
        label: "Stile di viaggio",
        value: "City break autentico e low cost",
      },
    ],

    heroImage: "/bucarest-article-intro.jpg",

    heroWidth: 1200,

    heroHeight: 1600,

    heroAlt: "Un edificio storico di Bucarest illuminato di notte",

    intro:
      "Abbiamo scelto Bucarest per il ponte del 25 aprile, cercando una destinazione europea accessibile e adatta a pochi giorni. Quello che ci ha colpito fin da subito è stata l'aria di festa che si respira nelle strade del centro nei weekend: nella bella stagione, ogni domenica Calea Victoriei si trasforma in una via interamente pedonale, tra attività e artisti di strada. È stato l'inizio di un viaggio in cui abbiamo scelto più volte di andare controcorrente rispetto a quello che fanno tutti.",

    days: [
      {
        number: 1,

        navigationTitle: "Arrivo e prima sera",

        title: "L'arrivo e la prima sera a Bucarest",

        subtitle:
          "Un arrivo verso sera, una cena tradizionale con musica dal vivo e una prima passeggiata nel Centrul Vechi.",

        intro:
          "Siamo arrivati verso sera, con il tempo giusto per una cena e una prima passeggiata nel centro. Non un giorno pieno, ma è bastato a darci il tono di quello che ci avrebbe accompagnato per tutto il weekend.",

        sections: [
          {
            title: "Cena da Hanul lui Manuc",

            paragraphs: [
              "Per la prima cena abbiamo scelto Hanul lui Manuc, un locale molto tradizionale con musica e balli dal vivo. I prezzi sono nella media, ma l'atmosfera vale da sola la serata: è il modo più diretto per entrare subito nel carattere della città.",
              "Dopo cena abbiamo fatto una passeggiata nel Centrul Vechi. Nel weekend le strade del centro hanno un'aria di festa continua, con locali affollati e musica che esce dai portoni: è la prima cosa che colpisce di Bucarest, ancora prima dei monumenti.",
            ],

            image: "/bucarest-article-hanul-2.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt: "Il cortile di Hanul lui Manuc affollato la sera",

            caption:
              "Il cortile di Hanul lui Manuc, tra tavoli pieni e musica dal vivo.",

            quote:
              "Non ci aspettavamo che il primo impatto con Bucarest fosse un locale pieno di musica dal vivo e gente che balla.",

            tip:
              "Se puoi, organizza il tuo weekend a Bucarest includendo una domenica: da primavera in poi Calea Victoriei diventa interamente pedonale, con artisti di strada lungo tutto il percorso.",
          },
        ],
      },

      {
        number: 2,

        navigationTitle: "Il cuore della città",

        title: "Un giorno intero tra librerie, viali e rooftop",

        subtitle:
          "Colazione in una caffetteria che non promette nulla e mantiene tutto, Calea Victoriei, il Parlamento e una serata sospesa dentro una bolla con vista.",

        intro:
          "Il secondo giorno è stato quello più pieno, dalla colazione fino a tarda sera. Abbiamo attraversato il centro a piedi quasi per intero, e chiuso la giornata in uno dei posti più sorprendenti del viaggio.",

        sections: [
          {
            title: "Colazione da Coftale e Strada Cu Umbrele",

            paragraphs: [
              "Abbiamo fatto colazione da Coftale Coffee Shop: da fuori non sembra niente di che, ma ne vale davvero la pena. È il tipo di posto che non trovi cercando le liste più scontate.",
              "Dalla colazione siamo passati per la famosissima e particolarissima Strada Cu Umbrele, la strada degli ombrelli, prima di arrivare a Cărturești Carusel, la cartolibreria più famosa di Bucarest: vale la visita anche solo per l'interno.",
            ],

            image: "/bucarest-article-carturesti.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt: "Interno della libreria Cărturești Carusel",

            caption:
              "Cărturești Carusel, uno degli interni più riconoscibili di Bucarest.",

            quote:
              "Bastava alzare gli occhi sopra la testa per capire perché tutti fotografano questo posto.",

            tip:
              "Vai a Cărturești Carusel nelle prime ore del mattino: è uno dei luoghi più fotografati della città e si affolla rapidamente.",
          },

          {
            title: "Calea Victoriei, l'Ateneo e il Parlamento",

            paragraphs: [
              "Da lì abbiamo camminato lungo Calea Victoriei, passando dall'Ateneul Roman fino ad arrivare al Palazzo del Parlamento, il più grande edificio governativo al mondo dopo il Pentagono. Tornando indietro ci siamo fermati alla suggestiva chiesa di Stavropoleos, un altro di quei piccoli angoli che si nascondono dietro le strade principali.",
              "Al tramonto siamo andati al Parcul Cismigiu: un parco piacevole da visitare per il laghetto e i ponti che lo attraversano, perfetto per rallentare dopo una giornata di cammino.",
            ],

            image: "/bucarest-article-parlamento.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt: "Il Palazzo del Parlamento di Bucarest in una giornata di sole",

            caption:
              "Il Palazzo del Parlamento, il più grande edificio governativo al mondo dopo il Pentagono.",

            quote:
              "Bastava allontanarsi di poche centinaia di metri da Calea Victoriei per trovare un ritmo completamente diverso.",
          },

          {
            title: "Aperitivo sospeso da Closer to the Moon",

            paragraphs: [
              "Come after dinner siamo andati a bere un cocktail sul suggestivo rooftop di Closer to the Moon. Per cena tappa veloce da Luca, la famosissima catena di panini e hot dog tipici rumeni, alla modica cifra di qualche euro.",
              "Cena e drink li abbiamo consumati dentro una delle bolle del rooftop, con una vista mozzafiato sulla cattedrale di Biserica Zlătari. Come dolce abbiamo scelto i papanași, i tipici dolcetti rumeni: una delle esperienze più belle di tutto il viaggio.",
            ],

            image: "",

            imageAlt: "",

            caption: "",

            quote:
              "Non ci aspettavamo di finire la serata dentro una bolla trasparente, con la cattedrale illuminata proprio davanti.",
          },
        ],
      },

      {
        number: 3,

        navigationTitle: "Bici, parchi e scelte controcorrente",

        title: "In bici a Herastrau e la Bucarest che non fa notizia",

        subtitle:
          "Una pedalata lungo il lago, il vero pastrami rumeno e la scelta consapevole di saltare le terme più famose della città.",

        intro:
          "La domenica, con le famiglie nei parchi e le strade più tranquille, è stata la giornata in cui abbiamo deciso più chiaramente cosa volevamo dal viaggio: vivere la città, non spuntare una lista.",

        sections: [
          {
            title: "In bici lungo il lago di Herastrau",

            paragraphs: [
              "Abbiamo fatto un giro in bici lungo il lago del Parcul Herastrau, con il noleggio consigliato da iVelo: le postazioni si trovano in tutto il parco e si sbloccano facilmente con la loro app dedicata.",
              "Pedalando si passa dal memoriale a Michael Jackson fino all'Arco di Trionfo, molto simile a quello parigino, tra scorci che meritano più di una sosta.",
            ],

            image: "/bucarest-article-arco-trionfo.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt: "L'Arco di Trionfo di Bucarest in una giornata di sole",

            caption:
              "L'Arco di Trionfo, molto simile a quello parigino, tappa finale della pedalata lungo il lago.",

            quote:
              "Il parco più bello lo abbiamo scoperto in bici, non a piedi.",

            tip:
              "Scarica l'app di iVelo prima di arrivare al parco: velocizza molto lo sblocco delle biciclette nelle postazioni.",
          },

          {
            title: "Pranzo da In House Pastrami e un pomeriggio tra i quartieri",

            paragraphs: [
              "Per pranzo tappa da In House Pastrami: il vero pastrami nasce proprio in Romania, anche se poi ha avuto una storia travagliata prima di diventare famoso altrove.",
              "Il pomeriggio lo abbiamo passato girando i dintorni del centro, osservando la classica domenica delle famiglie nei tanti parchi della città, con un caffè freddo nel suggestivo bar Mayfair 39.",
            ],

            image: "/bucarest-article-pastrami.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt: "Un sandwich di pastrami da In House Pastrami",

            caption: "Il pastrami di In House Pastrami, la versione originale rumena del piatto.",

            quote:
              "La domenica pomeriggio a Bucarest si vive nei parchi, tra famiglie e passeggini, non nei musei.",
          },

          {
            title: "Perché abbiamo saltato le terme",

            paragraphs: [
              "Abbiamo deciso volutamente di omettere le famosissime terme. Perché? Perché spesso si pensa che la cosa che fanno tutti sia quella da provare assolutamente, e si finisce nella banalità, a condividere l'attività con altri italiani in vacanza.",
              "Noi di Europando vogliamo vivere il posto con la sua autenticità: ogni tanto qualcosa di scontato ci sta, ma non sarà mai il filo conduttore dei nostri viaggi. Amiamo vivere con i cittadini, parlare con loro, ascoltare le loro storie e imparare dalla storia del paese che visitiamo.",
              "Ogni spostamento lo abbiamo fatto con Uber: economico e veloce. I mezzi pubblici, nella nostra esperienza, sono risultati poco efficienti.",
            ],

            image: "",

            imageAlt: "",

            caption: "",

            quote:
              "Fare la cosa che fanno tutti non è mai stato il nostro obiettivo: preferiamo vivere il posto, non solo visitarlo.",
          },
        ],
      },

      {
        number: 4,

        navigationTitle: "L'ultima mattina",

        title: "Il saluto alla città",

        subtitle:
          "Un'ultima colazione, un pranzo al sacco e le strade del centro come ultimo ricordo.",

        intro:
          "L'ultima mattina aveva inevitabilmente un ritmo diverso, sospeso tra l'ultima colazione e l'attesa del pullman per l'aeroporto.",

        sections: [
          {
            title: "Ultima colazione e partenza",

            paragraphs: [
              "Prima di prendere l'aereo abbiamo voluto assolutamente provare la colazione di Gram Bistro. Per il pranzo abbiamo optato per un pranzo al sacco da Luca, in attesa del pullman per l'aeroporto.",
              "Se dovessimo raccontare una sola cosa di questo viaggio a un amico, racconteremmo che le strade del centro di Bucarest sono un luogo in cui capita di fermarsi a cantare con sconosciuti: un momento bellissimo che non conosce limiti né barriere linguistiche.",
            ],

            image: "/bucarest-article-colazione-finale.jpg",

            imageWidth: 1200,

            imageHeight: 1600,

            imageAlt: "L'ultima colazione da Gram Bistro prima della partenza",

            caption: "L'ultima colazione da Gram Bistro, prima del pullman per l'aeroporto.",

            quote:
              "Non ci ha conquistati una singola attrazione, ma la sensazione di essere finiti a cantare per strada con degli sconosciuti.",
          },
        ],
      },
    ],

    gallery: [
      {
        src: "/bucarest-article-hanul-1.jpg",
        alt: "Un piatto tradizionale rumeno da Hanul lui Manuc",
      },
      {
        src: "/bucarest-article-colazione.jpg",
        alt: "Pancake alla colazione di Coftale Coffee Shop",
      },
      {
        src: "/bucarest-article-victoriei.jpg",
        alt: "Calea Victoriei pedonale in una giornata di sole",
      },
      {
        src: "/bucarest-article-ateneul.jpg",
        alt: "L'Ateneul Roman visto dal giardino",
      },
      {
        src: "/bucarest-article-stavropoleos.jpg",
        alt: "La facciata dipinta della chiesa di Stavropoleos",
      },
      {
        src: "/bucarest-article-memorial-jackson.jpg",
        alt: "Il memoriale a Michael Jackson nel Parcul Herastrau",
      },
      {
        src: "/bucarest-article-strada-ombrele.jpg",
        alt: "Gli ombrelli colorati di Strada Cu Umbrele",
      },
      {
        src: "/bucarest-article-bici-herastrau.jpg",
        alt: "Bici a noleggio sul lago del Parcul Herastrau",
      },
      {
        src: "/bucarest-article-pedalo-tramonto.jpg",
        alt: "Pedalò al tramonto su un laghetto di Bucarest",
      },
    ],

    galleryTitle: "Bucarest attraverso le nostre fotografie",

    relatedDestination: {
      slug: "bucarest",
      name: "Bucarest",
      text:
        "Nella nostra guida trovi l'itinerario di più giorni, le informazioni sui trasporti, i luoghi da vedere e gli indirizzi che abbiamo raccolto durante il viaggio.",
    },

    seo: {
      title: "Bucarest ci ha sorpresi | Europando",
      description:
        "Il nostro diario di un ponte del 25 aprile a Bucarest, tra Calea Victoriei, un rooftop sospeso e la scelta di vivere la città come i suoi abitanti.",
    },
  },
];
