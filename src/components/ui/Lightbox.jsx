import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../../styles/components/Lightbox.css";

gsap.registerPlugin(useGSAP);

// Inclinación suave y distinta para cada foto, como copias sobre una mesa
const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];

export default function Lightbox({ photos, index, label, onClose, onChange }) {
  const dialogRef = useRef(null);
  const printRef = useRef(null);
  const stripRef = useRef(null);
  const touchX = useRef(null);
  const direction = useRef(1);

  const total = photos.length;
  const tilt = TILTS[index % TILTS.length];

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  function go(step) {
    direction.current = step;
    onChange((index + step + total) % total);
  }

  // La copia entra desde el lado hacia el que avanzas
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.killTweensOf(printRef.current);
        gsap.fromTo(
          printRef.current,
          {
            x: direction.current * 120,
            rotation: tilt + direction.current * 6,
            autoAlpha: 0,
          },
          {
            x: 0,
            rotation: tilt,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      });

      return () => mm.revert();
    },
    { dependencies: [index], scope: dialogRef }
  );

  // Centra la miniatura activa en la tira
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.children[index];
    if (!active) return;
    strip.scrollTo({
      left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  }

  function handleClick(event) {
    const background =
      event.target === event.currentTarget ||
      event.target.classList.contains("viewer-stage");
    if (background) onClose();
  }

  function handleTouchEnd(event) {
    if (touchX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1);
  }

  return (
    <dialog
      ref={dialogRef}
      className="viewer"
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <img
        className="viewer-ambient"
        src={photos[index]}
        alt=""
        aria-hidden="true"
      />

      <div className="viewer-stage">
        <figure
          ref={printRef}
          className="viewer-print"
          style={{ "--tilt": `${tilt}deg` }}
        >
          <img
            src={photos[index]}
            alt={`${label}, foto ${index + 1} de ${total}`}
          />
          <figcaption aria-live="polite">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </figcaption>
        </figure>
      </div>

      <button
        type="button"
        className="viewer-btn viewer-close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        ×
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            className="viewer-btn viewer-prev"
            aria-label="Foto anterior"
            onClick={() => go(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="viewer-btn viewer-next"
            aria-label="Foto siguiente"
            onClick={() => go(1)}
          >
            →
          </button>
        </>
      )}

      <ul ref={stripRef} className="viewer-strip">
        {photos.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`Ir a la foto ${i + 1}`}
              aria-current={i === index}
              onClick={() => {
                direction.current = i > index ? 1 : -1;
                onChange(i);
              }}
            >
              <img src={src} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}