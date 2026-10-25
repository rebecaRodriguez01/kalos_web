import { useState } from "react";
import { Link } from "react-router";
import useSectionReveal from "../hooks/useSectionReveal";
import ViewSwitcher from "../components/weddings/ViewSwitcher";
import WeddingCard from "../components/weddings/WeddingCard";
import CarouselView from "../components/weddings/CarouselView";
import ArrowLink from "../components/ui/ArrowLink";
import { weddings, formatDate } from "../data/weddings";
import "../styles/pages/Weddings.css";

const KEYS = { view: "kalos-weddings-view" };
const VIEWS = ["carousel", "detail", "grid"];

function read(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* sin almacenamiento disponible */
  }
}

export default function Weddings() {
  const ref = useSectionReveal();

  const [view, setView] = useState(() => {
    const saved = read(KEYS.view, "carousel");
    return VIEWS.includes(saved) ? saved : "carousel";
  });

  function changeView(next) {
    setView(next);
    save(KEYS.view, next);
  }

  return (
    <main>
      <title>Bodas | Kalos</title>

      <section ref={ref} className="weddings-index">
        <div className="container">
          <header className="weddings-head" data-reveal>
            <h1 className="phrase weddings-title">
              Cada boda, <em>una historia</em>
            </h1>
          </header>

          <div className="views-toolbar" data-reveal>
            <p className="views-count">{weddings.length} bodas</p>
            <ViewSwitcher view={view} onView={changeView} />
          </div>

          <div className="view" key={view}>
           {view === "carousel" && <CarouselView />}

            {view === "grid" && (
              <ul className="wmini">
                {weddings.map((wedding) => (
                  <li key={wedding.slug}>
                    <Link
                      to={`/bodas/${wedding.slug}`}
                      className="wmini-item"
                      title={wedding.couple}
                      aria-label={`${wedding.couple}, ${formatDate(wedding.date)}`}
                    >
                      <img
                        src={wedding.photos[0]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {view === "detail" && (
              <ul className="wdetail">
                {weddings.map((wedding) => (
                  <li key={wedding.slug} className="wdetail-row">
                    <Link
                      to={`/bodas/${wedding.slug}`}
                      className="wdetail-media"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        src={wedding.photos[0]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                    <div>
                      <p className="wcard-meta">
                        <time dateTime={wedding.date}>
                          {formatDate(wedding.date)}
                        </time>
                        {" · "}
                        {wedding.location}
                      </p>
                      <h2 className="wdetail-name">{wedding.couple}</h2>
                      <p className="wdetail-excerpt">{wedding.story[0]}</p>
                      <ArrowLink to={`/bodas/${wedding.slug}`}>
                        Ver esta boda
                      </ArrowLink>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}