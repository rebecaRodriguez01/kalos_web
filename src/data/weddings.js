import { heroPhotos } from "./photos";

// Reordena las fotos de ejemplo para que cada boda se vea distinta.
// TODO: sustituir por las fotos reales de cada boda.
const rotate = (list, n) => [...list.slice(n), ...list.slice(0, n)];

// TODO: sustituir por las bodas reales (nombres, fechas, textos, fotos y vídeos).
export const weddings = [
  {
    slug: "ana-y-luis",
    couple: "Ana & Luis",
    date: "2025-09-13",
    location: "Segovia",
    story: [
      "Texto de ejemplo. Aquí irá la historia de la pareja: cómo se conocieron y qué hizo especial su día.",
      "Segundo párrafo de ejemplo. Puedes escribir uno, dos o los que quieras.",
    ],
    photos: rotate(heroPhotos, 0),
    videos: [
      { src: "/video/ana-y-luis.mp4", poster: heroPhotos[0], title: "Highlights" },
    ],
  },
  {
    slug: "marta-y-pablo",
    couple: "Marta & Pablo",
    date: "2025-06-21",
    location: "Toledo",
    story: ["Texto de ejemplo. Aquí irá la historia de Marta y Pablo."],
    photos: rotate(heroPhotos, 2),
    videos: [],
  },
  {
    slug: "lucia-y-javier",
    couple: "Lucía & Javier",
    date: "2025-05-10",
    location: "Madrid",
    story: ["Texto de ejemplo. Aquí irá la historia de Lucía y Javier."],
    photos: rotate(heroPhotos, 4),
    videos: [],
  },
  {
    slug: "elena-y-diego",
    couple: "Elena & Diego",
    date: "2024-10-05",
    location: "Ávila",
    story: ["Texto de ejemplo. Aquí irá la historia de Elena y Diego."],
    photos: rotate(heroPhotos, 6),
    videos: [],
  },
];

export const getWedding = (slug) => weddings.find((w) => w.slug === slug);

export function formatDate(iso) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}