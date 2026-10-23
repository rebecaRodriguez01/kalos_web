import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/components/Hero.css";

import { heroPhotos as slides } from "../data/photos";



gsap.registerPlugin(useGSAP);

const SLIDE_DURATION = 4500; // ms que se ve cada foto
const TITLE = "KALOS";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-letter", {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
            delay: 0.2,
          })
          .from(
            ".hero-subtitle",
            { y: 14, autoAlpha: 0, duration: 0.9 },
            "-=0.5"
          );
      });

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-label="Kalos, fotografía de bodas"
    >
      <div className="hero-slideshow" aria-hidden="true">
        {slides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-slide ${index === activeSlide ? "is-active" : ""}`}
          />
        ))}
      </div>

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <h1 className="hero-title" aria-label={TITLE}>
          {TITLE.split("").map((letter, index) => (
            <span className="hero-letter-mask" key={index} aria-hidden="true">
              <span className="hero-letter">{letter}</span>
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">PHOTO &amp; FILM</p>
      </div>
    </section>
  );
}