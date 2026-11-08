import { foundersPhoto, heroPhotos } from "./photos";

// TODO: sustituir todos los textos y fotos por los reales.
export const about = {
  // TODO: nombre real de su pareja
  names: "Keyla & Pedro",
  tagline: { before: "Dos personas, una cámara y", highlight: "un sueño" },
  coverPhoto: foundersPhoto,

  chapters: [
    {
      number: "01",
      title: "Cómo nos conocimos",
      photo: heroPhotos[0],
      text: [
        "Texto de ejemplo. Aquí contaréis cómo os conocisteis: dónde, cuándo y qué fue lo primero que os unió.",
        "Segundo párrafo de ejemplo. Un detalle pequeño y personal vale más que mil palabras bonitas.",
      ],
    },
    {
      number: "02",
      title: "El sueño",
      photo: heroPhotos[3],
      text: [
        "Texto de ejemplo. Aquí contaréis qué soñabais hacer juntos y cuándo nació la idea de dedicaros a contar historias de amor.",
      ],
    },
    {
      number: "03",
      title: "El salto",
      photo: heroPhotos[5],
      text: [
        "Texto de ejemplo. Aquí contaréis cómo disteis el paso (las dudas, los miedos, las primeras bodas) y qué os hizo seguir adelante.",
      ],
    },
  ],

  vision: {
    before: "Sabemos lo que es perseguir un sueño, por eso cuidamos el vuestro como si fuera",
    highlight: "el nuestro",
    principles: [
      {
        title: "Cercanía",
        text: "Texto de ejemplo. Cómo os acercáis a cada pareja antes y durante el día de su boda.",
      },
      {
        title: "Discreción",
        text: "Texto de ejemplo. Cómo trabajáis sin interrumpir ni invadir los momentos importantes.",
      },
      {
        title: "Cuidado del detalle",
        text: "Texto de ejemplo. Qué cuidáis en las fotos, el vídeo y el resultado final.",
      },
    ],
  },

  behind: {
    title: "Detrás de cámara",
    items: [
      { photo: heroPhotos[1], caption: "Texto de ejemplo" },
      { photo: heroPhotos[4], caption: "Texto de ejemplo" },
      { photo: heroPhotos[6], caption: "Texto de ejemplo" },
    ],
  },

  closing: {
    before: "Vuestra historia",
    highlight: "también",
    after: "merece ser contada",
    cta: "Escríbenos",
  },
};