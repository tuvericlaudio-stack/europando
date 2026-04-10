import { asset } from "../utils/assets";

export const featuredPosts = [
  {
    slug: "due-settimane-palma",
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
];