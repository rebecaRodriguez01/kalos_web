import ArrowLink from "../ui/ArrowLink";
import useSectionReveal from "../../hooks/useSectionReveal";

export default function Manifesto() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} className="home-section manifesto">
      <div className="container manifesto-inner">
        <p className="eyebrow" data-reveal>
          ¿Qué buscáis en cada boda?
        </p>

        <blockquote className="manifesto-quote" data-reveal>
         <p className="phrase">
            “No hacemos fotos de bodas. Guardamos{" "}
            el instante exacto en el que dos personas se eligen.”
          </p>
        <footer className="manifesto-signature">Keyla Leyva</footer>
        </blockquote>

        <ArrowLink to="/portfolio" data-reveal>
          Ver portfolio
        </ArrowLink>
      </div>
    </section>
  );
}