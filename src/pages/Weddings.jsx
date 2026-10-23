import { Link } from "react-router";
import useSnapScroll from "../hooks/useSnapScroll";
import useSectionReveal from "../hooks/useSectionReveal";
import { weddings, formatDate } from "../data/weddings";
import "../styles/pages/Weddings.css";

export default function Weddings() {
    useSnapScroll();
    const ref = useSectionReveal();

    return (
        <main>
            <title>Bodas | Kalos</title>

            <section
                ref={ref}
                className="wedding-section snap-section weddings-index"
            >
                <div className="container">
                    <header className="weddings-head" data-reveal>

                        <h1 className="phrase weddings-title">
                            Cada boda, <em>una historia</em>
                        </h1>
                    </header>

                    <ul className="weddings-grid">
                        {weddings.map((wedding) => (
                            <li key={wedding.slug} data-reveal>
                                <Link to={`/bodas/${wedding.slug}`} className="wedding-card">
                                    <div className="wedding-card-media">
                                        <img
                                            src={wedding.photos[0]}
                                            alt={`Boda de ${wedding.couple}`}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <h2 className="wedding-card-name">{wedding.couple}</h2>
                                    <p className="wedding-card-meta">
                                        <time dateTime={wedding.date}>
                                            {formatDate(wedding.date)}
                                        </time>
                                        {" · "}
                                        {wedding.location}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}