import { WHATSAPP_URL } from "../../data/contact";
import "../../styles/components/WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      title="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}