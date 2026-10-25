import { useEffect, useRef } from "react";

export default function TrailerDialog({ src, poster, title, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="trailer"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="trailer-close"
        aria-label="Cerrar tráiler"
        onClick={onClose}
      >
        ×
      </button>
      <video src={src} poster={poster} controls autoPlay playsInline />
    </dialog>
  );
}