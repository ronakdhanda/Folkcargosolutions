import { WhatsAppFullIcon } from './Icons';

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href="https://wa.me/919254992649?text=Hi%20Folk%20Cargo%20Solutions%2C%20I%27d%20like%20to%20get%20a%20quote."
      target="_top"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="ping" />
      <WhatsAppFullIcon />
    </a>
  );
}
