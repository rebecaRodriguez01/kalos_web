import { heroPhotos } from "./photos";

// Reordena las fotos de ejemplo para que cada boda se vea distinta.
// TODO: sustituir por las fotos reales de cada boda.
const rotate = (list, n) => [...list.slice(n), ...list.slice(0, n)];

const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s*&\s*/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Fecha y lugar se muestran solos; aquí van los demás detalles.
// TODO: sustituir por los datos reales de cada boda.
const details = () => [
  { label: "Fotografía y vídeo", value: "Kalos · Keyla Leyva" },
  { label: "Planificación", value: "TODO" },
  { label: "Flores", value: "TODO" },
  { label: "Música", value: "TODO" },
];

// TODO: sustituir por las bodas reales: [pareja, lugar, fecha]
const SAMPLE = [
  ["Ana & Luis", "Segovia", "2025-09-13"],
  ["Marta & Pablo", "Toledo", "2025-06-21"],
  ["Lucía & Javier", "Madrid", "2025-05-10"],
  ["Elena & Diego", "Ávila", "2024-10-05"],
  ["Carmen & Álvaro", "Sevilla", "2024-09-14"],
  ["Paula & Sergio", "Valencia", "2024-07-06"],
  ["Laura & Adrián", "Salamanca", "2024-06-01"],
  ["Sofía & Daniel", "Córdoba", "2024-05-18"],
  ["Irene & Marcos", "Granada", "2024-04-20"],
  ["Claudia & Rubén", "Cuenca", "2023-10-07"],
  ["Noelia & Víctor", "Málaga", "2023-09-23"],
  ["Alba & Hugo", "Santander", "2023-08-12"],
  ["Sara & Iván", "Burgos", "2023-07-01"],
  ["Beatriz & Raúl", "Aranjuez", "2023-06-10"],
  ["Natalia & Jorge", "Bilbao", "2023-05-06"],
  ["Cristina & Mario", "Cádiz", "2022-10-15"],
  ["Andrea & Nacho", "Zaragoza", "2022-09-17"],
  ["Raquel & Óscar", "Mallorca", "2022-07-09"],
  ["Patricia & Gonzalo", "León", "2022-06-04"],
  ["Inés & Tomás", "Ronda", "2022-05-14"],
  ["Julia & Fernando", "Almería", "2021-10-02"],
  ["Teresa & Borja", "San Sebastián", "2021-09-11"],
  ["Lorena & Alberto", "Mérida", "2021-07-24"],
  ["Rocío & Samuel", "Jerez", "2021-06-12"],
];
// Disposición del álbum de cada boda:
// "editorial" | "masonry" | "stagger" | "cascade" | "rhythm"
const ALBUM_LAYOUTS = ["editorial", "masonry", "stagger", "cascade", "rhythm"];


// Solo la primera boda lleva tráiler y vídeo, para probar las dos situaciones.
export const weddings = SAMPLE.map(([couple, location, date], i) => ({
  slug: slugify(couple),
  couple,
  date,
  location,
  story: [
    `Texto de ejemplo. Aquí irá la historia de ${couple}: cómo se conocieron y qué hizo especial su día.`,
    "Segundo párrafo de ejemplo. Puedes escribir uno, dos o los que quieras.",
  ],
  details: details(),
  trailer:
    i === 0
      ? {
        loop: "/video/ana-y-luis-loop.mp4",
        full: "/video/ana-y-luis-trailer.mp4",
      }
      : null, albumLayout: ALBUM_LAYOUTS[i % ALBUM_LAYOUTS.length],
  photos: rotate(heroPhotos, i % heroPhotos.length),
  videos:
    i === 0
      ? [
        {
          src: "/video/ana-y-luis.mp4",
          poster: heroPhotos[0],
          title: "Highlights",
        },
      ]
      : [],
}));

export const getWedding = (slug) => weddings.find((w) => w.slug === slug);

export function formatDate(iso) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}