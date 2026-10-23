import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../ui/Logo";
import "../../styles/components/Header.css";

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/bodas", label: "Bodas" },
   { to: "/conocenos", label: "Conocénos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/contacto", label: "Contacto" },
];

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isVisible = !isHome || scrolled;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`site-header ${isVisible ? "is-visible" : ""}`}
      inert={!isVisible}
    >
      <div className="header-inner container">
        <Logo onClick={closeMenu} />

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}