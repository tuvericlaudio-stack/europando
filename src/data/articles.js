export const articles = [
  {
    slug: "bucarest-ci-ha-sorpresi",

    title: "Bucarest ci ha sorpresi",

    subtitle: "",

    author: "Europando",

    date: "",

    readingTime: "",

    heroImage: "/bucarest-hero.jpg",

    heroAlt: "Palazzo del Parlamento di Bucarest",

    intro: "",

    sections: [
      {
        title: "",
        paragraphs: [],
        image: "",
        imageAlt: "",
        caption: "",
        quote: "",
      },
    ],

    gallery: [
      {
        src: "/bucarest-gallery-1.jpg",
        alt: "",
      },
      {
        src: "/bucarest-gallery-2.jpg",
        alt: "",
      },
      {
        src: "/bucarest-gallery-3.jpg",
        alt: "",
      },
    ],

    seo: {
      title: "",
      description: "",
    },
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}