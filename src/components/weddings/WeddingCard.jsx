import { Link } from "react-router";
import { formatDate } from "../../data/weddings";

export default function WeddingCard({ wedding }) {
  return (
    <Link to={`/bodas/${wedding.slug}`} className="wcard">
      <div className="wcard-media">
        <img
          src={wedding.photos[0]}
          alt={`Boda de ${wedding.couple}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h2 className="wcard-name">{wedding.couple}</h2>
      <p className="wcard-meta">
        <time dateTime={wedding.date}>{formatDate(wedding.date)}</time>
        {" · "}
        {wedding.location}
      </p>
    </Link>
  );
}