import { Link } from "react-router";
import "../../styles/components/Logo.css";

export default function Logo({ size = "md", onClick }) {
  return (
    <Link
      to="/"
      className={`logo logo--${size}`}
      aria-label="Kalos, página de inicio"
      onClick={onClick}
    >
      Kalos<span>.</span>
    </Link>
  );
}