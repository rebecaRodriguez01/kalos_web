import { foundersPhoto } from "../../data/photos";
import useSectionReveal from "../../hooks/useSectionReveal";

export default function Founders() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} className="home-section founders">
      <div className="founders-photo">
        <img
          src={foundersPhoto}
          alt="Los fundadores de Kalos, una pareja de fotógrafos"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="founders-text">
        <p className="eyebrow" data-reveal>
          Quiénes somos
        </p>
        <h2 data-reveal>
          ¿Quién contará mejor el amor de vuestra boda que{" "}
          <em>dos personas</em> que se aman?
        </h2>
        <p className="eyebrow" data-reveal>
          Somos pareja y llevamos la cámara como llevamos la vida: juntos.
          Por eso sabemos mirar lo que de verdad importa.
        </p>
      </div>
    </section>
  );
}