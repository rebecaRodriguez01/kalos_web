import ArrowLink from "../ui/ArrowLink";
import useSectionReveal from "../../hooks/useSectionReveal";
import { WHATSAPP_URL } from "../../data/contact";

export default function BookingCTA() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} className="home-section booking">
      <div className="container booking-inner">
        <p className="eyebrow" data-reveal>
          ¿Hablamos?
        </p>

        <h2 className="booking-title" data-reveal>
          Vuestra historia empieza con <em>un mensaje</em>
        </h2>

        <div data-reveal>
          <ArrowLink href={WHATSAPP_URL} className="arrow-link--solid">
            Reservar mi fecha
          </ArrowLink>
        </div>

        <p className="booking-note" data-reveal>
          Os respondemos por WhatsApp lo antes posible.
        </p>
      </div>
    </section>
  );
}