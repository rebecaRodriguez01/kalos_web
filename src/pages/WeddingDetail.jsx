import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import useSnapScroll from "../hooks/useSnapScroll";
import useSectionReveal from "../hooks/useSectionReveal";
import ArrowLink from "../components/ui/ArrowLink";
import Lightbox from "../components/ui/Lightbox";
import { weddings, getWedding, formatDate } from "../data/weddings";
import "../styles/pages/Weddings.css";

function Cover({ wedding }) {
    const ref = useSectionReveal();

    return (
        <section
            ref={ref}
            className="wedding-section snap-section wedding-cover"
        >
            <img className="wedding-cover-img" src={wedding.photos[0]} alt="" />
            <div className="wedding-cover-overlay" aria-hidden="true" />

            <div className="container">
                <Link to="/bodas" className="back-link" data-reveal>
                    ← Todas las bodas
                </Link>
            </div>

            <div className="container">
                <h1 className="wedding-cover-title" data-reveal>
                    {wedding.couple}
                </h1>
                <p className="wedding-cover-meta" data-reveal>
                    <time dateTime={wedding.date}>{formatDate(wedding.date)}</time>
                    {" · "}
                    {wedding.location}
                </p>
            </div>
        </section>
    );
}

function Story({ wedding }) {
    const ref = useSectionReveal();

    return (
        <section
            ref={ref}
            className="wedding-section snap-section wedding-story"
        >
            <div className="wedding-story-photo">
                <img
                    src={wedding.photos[1] ?? wedding.photos[0]}
                    alt={`${wedding.couple}`}
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className="wedding-story-text">
                <p className="eyebrow" data-reveal>
                    Su historia
                </p>
                <h2 className="phrase wedding-story-title" data-reveal>
                    {wedding.couple}
                </h2>
                {wedding.story.map((paragraph, index) => (
                    <p key={index} className="wedding-story-copy" data-reveal>
                        {paragraph}
                    </p>
                ))}
            </div>
        </section>
    );
}

function Album({ wedding }) {
    const ref = useSectionReveal();
    const [openIndex, setOpenIndex] = useState(null);
    const total = wedding.photos.length;

    return (
        <>
            <section
                ref={ref}
                className="wedding-section snap-section wedding-album"
            >
                <div className="container">


                    <ul className="album-grid" data-reveal>
                        {wedding.photos.map((src, index) => (
                            <li key={src}>
                                <button
                                    type="button"
                                    className="album-photo"
                                    aria-label={`Ver foto ${index + 1} de ${total}`}
                                    onClick={() => setOpenIndex(index)}
                                >
                                    <img
                                        src={src}
                                        alt={`${wedding.couple}, foto ${index + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {openIndex !== null && (
                <Lightbox
                    photos={wedding.photos}
                    index={openIndex}
                    label={`Boda de ${wedding.couple}`}
                    onClose={() => setOpenIndex(null)}
                    onChange={setOpenIndex}
                />
            )}
        </>
    );
}

function Films({ wedding }) {
    const ref = useSectionReveal();

    return (
        <section
            ref={ref}
            className="wedding-section snap-section wedding-films"
        >
            <div className="container">
                <h2 className="phrase films-title" data-reveal>
                    Film
                </h2>

                <ul className="films-list" data-reveal>
                    {wedding.videos.map((video) => (
                        <li key={video.src}>
                            <figure className="film">
                                <video
                                    controls
                                    preload="metadata"
                                    playsInline
                                    poster={video.poster}
                                    aria-label={video.title ?? `Vídeo de ${wedding.couple}`}
                                >
                                    <source src={video.src} type="video/mp4" />
                                </video>
                                {video.title && <figcaption>{video.title}</figcaption>}
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Next({ wedding }) {
    const ref = useSectionReveal();
    const index = weddings.findIndex((w) => w.slug === wedding.slug);
    const next = weddings[(index + 1) % weddings.length];
    const hasNext = next.slug !== wedding.slug;

    return (
        <section
            ref={ref}
            className="wedding-section snap-section wedding-next"
        >
            <img
                className="wedding-next-img"
                src={hasNext ? next.photos[0] : wedding.photos[0]}
                alt=""
                loading="lazy"
                decoding="async"
            />
            <div className="wedding-next-overlay" aria-hidden="true" />

            <div className="container wedding-next-content">
                {hasNext ? (
                    <>
                        <p className="eyebrow" data-reveal>
                            Siguiente boda
                        </p>
                        <h2 className="wedding-next-name" data-reveal>
                            {next.couple}
                        </h2>
                        <div className="wedding-next-actions" data-reveal>
                            <ArrowLink to={`/bodas/${next.slug}`}>Ver esta boda</ArrowLink>
                            <ArrowLink to="/bodas">Todas las bodas</ArrowLink>
                        </div>
                    </>
                ) : (
                    <div className="wedding-next-actions" data-reveal>
                        <ArrowLink to="/bodas">Todas las bodas</ArrowLink>
                    </div>
                )}
            </div>
        </section>
    );
}

function WeddingContent({ wedding }) {
    useSnapScroll();

    return (
        <main>
            <title>{`${wedding.couple} | Kalos`}</title>

            <Cover wedding={wedding} />
            <Story wedding={wedding} />
            <Album wedding={wedding} />
            {wedding.videos.length > 0 && <Films wedding={wedding} />}
            <Next wedding={wedding} />
        </main>
    );
}

export default function WeddingDetail() {
    const { slug } = useParams();
    const wedding = getWedding(slug);

    if (!wedding) return <Navigate to="/bodas" replace />;

    // "key" reinicia la página (y sus animaciones) al pasar a otra boda
    return <WeddingContent key={wedding.slug} wedding={wedding} />;
}
