import { heroPhotos } from "../../data/photos";
import ArrowLink from "../ui/ArrowLink";
import useSectionReveal from "../../hooks/useSectionReveal";

// 30 casillas para cubrir cualquier pantalla (el CSS oculta las sobrantes).
// Con más fotos reales, se repetirán menos.
const collagePhotos = Array.from(
  { length: 30 },
  (_, index) => heroPhotos[index % heroPhotos.length]
);

export default function Collage() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} className="home-section collage">
      <div className="collage-grid" aria-hidden="true">
        {collagePhotos.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div className="collage-content">
        <h2 className="collage-title" data-reveal>
          Vuestra boda merece ser <em>eterna</em>
        </h2>

        <div data-reveal>
          <ArrowLink to="/servicios" className="arrow-link--solid">
            Ver ofertas
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}