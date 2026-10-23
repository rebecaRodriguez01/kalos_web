import { useEffect, useState } from "react";
import ArrowLink from "../ui/ArrowLink";
import useSectionReveal from "../../hooks/useSectionReveal";
import { fallbackReviews, GOOGLE_REVIEWS_URL } from "../../data/reviews";

const ENDPOINT = import.meta.env.VITE_REVIEWS_URL;

function Stars({ value }) {
  return (
    <span className="stars" role="img" aria-label={`${value} de 5 estrellas`}>
      {"★".repeat(value)}
    </span>
  );
}

export default function Reviews() {
  const ref = useSectionReveal();
  const [data, setData] = useState(fallbackReviews);

  useEffect(() => {
    if (!ENDPOINT) return;

    const controller = new AbortController();

    fetch(ENDPOINT, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json) => {
        if (json?.reviews?.length) setData(json);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <section ref={ref} className="home-section reviews">
      <div className="container">
        <header className="reviews-head" data-reveal>
          <h2 className="reviews-title">
            Lo que dicen <em>nuestras parejas</em>
          </h2>
          <p className="reviews-score">
            <Stars value={Math.round(data.rating)} />
            <span>
              {data.rating.toFixed(1)} en Google
              {data.total > 0 && ` · ${data.total} reseñas`}
            </span>
          </p>
        </header>

        <ul className="reviews-list" data-reveal>
          {data.reviews.slice(0, 5).map((review, index) => (
            <li className="review-card" key={index}>
              <Stars value={review.rating} />
              <p className="review-text">“{review.text}”</p>
              <p className="review-author">
                {review.author}
                {review.date && <span> · {review.date}</span>}
              </p>
            </li>
          ))}
        </ul>

        <div className="reviews-footer" data-reveal>
          <ArrowLink href={GOOGLE_REVIEWS_URL}>Ver todas en Google</ArrowLink>
        </div>
      </div>
    </section>
  );
}