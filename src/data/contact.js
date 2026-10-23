// TODO: número real con prefijo de país, sin "+" ni espacios (España = 34)
export const WHATSAPP_NUMBER = "+34605416189";

const message =
  "Hola Kalos, nos casamos y nos encantaría saber si tenéis disponible nuestra fecha.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  message
)}`;
