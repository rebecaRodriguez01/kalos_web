import Logo from "../ui/Logo";
import "../../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <Logo size="lg" />

        <p className="footer-message">Historias que merecen ser recordadas.</p>

        <p className="footer-copy">
          © {new Date().getFullYear()} Kalos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}