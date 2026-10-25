import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

// El navegador no debe restaurar el scroll por su cuenta
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-navigating");
    window.scrollTo(0, 0);

    const frame = requestAnimationFrame(() => window.scrollTo(0, 0));
    const timer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      root.classList.remove("is-navigating");
    }, 150);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      root.classList.remove("is-navigating");
    };
  }, [pathname]);

  return null;
}