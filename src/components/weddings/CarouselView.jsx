import { useRef, useState } from "react";
import useDragScroll from "../../hooks/useDragScroll";
import WeddingCard from "./WeddingCard";
import { weddings } from "../../data/weddings";

export default function CarouselView() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useDragScroll(trackRef);

  function handleScroll() {
    const el = trackRef.current;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
   <div className="carousel">
      <ul
        ref={trackRef}
        className="carousel-track"
        tabIndex={0}
        aria-label="Listado de bodas"
        onScroll={handleScroll}
      >
        {weddings.map((wedding) => (
          <li key={wedding.slug}>
            <WeddingCard wedding={wedding} />
          </li>
        ))}
      </ul>

      <div className="carousel-foot">
        <div className="carousel-progress" style={{ "--p": progress }}>
          <span />
        </div>
        <p className="carousel-hint">Arrastra o desliza</p>
      </div>
    </div>
  );
}