import { useEffect, useRef } from "react";
import "../../styles/components/Lightbox.css";

export default function Lightbox({ photos, index, label, onClose, onChange }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const total = photos.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  function go(step) {
    onChange((index + step + total) % total);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  }

  function handleClick(event) {
    const clickedBackground =
      event.target === event.currentTarget ||
      event.target.classList.contains("lightbox-stage");
    if (clickedBackground) onClose();
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
      className="lightbox"
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
      <div className="lightbox-stage">
        <img
          className="lightbox-img"
          src={photos[index]}
          alt={`${label}, foto ${index + 1} de ${total}`}
        />
      </div>

      <button
        type="button"
        className="lightbox-btn lightbox-close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        ×
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox-btn lightbox-prev"
            aria-label="Foto anterior"
            onClick={() => go(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="lightbox-btn lightbox-next"
            aria-label="Foto siguiente"
            onClick={() => go(1)}
          >
            →
          </button>
        </>
      )}

      <p className="lightbox-count" aria-live="polite">
        {index + 1} / {total}
      </p>
    </dialog>
  );
}