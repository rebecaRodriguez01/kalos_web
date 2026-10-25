import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link, Navigate, useParams } from "react-router";
import useSnapScroll from "../hooks/useSnapScroll";
import useSectionReveal from "../hooks/useSectionReveal";
import ArrowLink from "../components/ui/ArrowLink";
import Lightbox from "../components/ui/Lightbox";
import LoopVideo from "../components/ui/LoopVideo";
import TrailerDialog from "../components/ui/TrailerDialog";
import { weddings, getWedding, formatDate } from "../data/weddings";
import "../styles/pages/WeddingDetail.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- 1. Portada con tráiler ---------- */
function Cover({ wedding }) {
    const ref = useSectionReveal();
    const [trailerOpen, setTrailerOpen] = useState(false);
    const { trailer } = wedding;

    return (
        <section
            ref={ref}
            className="wedding-section snap-section wedding-cover"
        >
            {trailer?.loop ? (
                <LoopVideo
                    className="wedding-cover-media"
                    src={trailer.loop}
                    poster={wedding.photos[0]}
                />
            ) : (
                <img className="wedding-cover-media" src={wedding.photos[0]} alt="" />
            )}
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

                {trailer?.full && (
                    <div data-reveal>
                        <button
                            type="button"
                            className="trailer-btn"
                            onClick={() => setTrailerOpen(true)}
                        >
                            <span className="trailer-btn-icon" aria-hidden="true">
                                ▶
                            </span>
                            Ver tráiler
                        </button>
                    </div>
                )}
            </div>

            {trailerOpen && (
                <TrailerDialog
                    src={trailer.full}
                    poster={wedding.photos[0]}
                    title={`Tráiler de ${wedding.couple}`}
                    onClose={() => setTrailerOpen(false)}
                />
            )}
        </section>
    );
}

/* ---------- 2. Su historia: carta sobre foto ---------- */
function Story({ wedding }) {
    const ref = useSectionReveal();

    const details = [
        { label: "Fecha", value: formatDate(wedding.date) },
        { label: "Lugar", value: wedding.location },
        ...wedding.details,
    ];

    return (
        <section
            ref={ref}
            className="wedding-section snap-section wedding-story"
        >

            <div className="story-shade" aria-hidden="true" />

            <div className="container story-layout">
                <div className="letter-wrap" data-reveal>
                    <article className="letter">
                        <p className="letter-date">{formatDate(wedding.date)}</p>
                        <h2 className="letter-title">{wedding.couple}</h2>
                        {wedding.story.map((paragraph, index) => (
                            <p key={index} className="letter-copy">
                                {paragraph}
                            </p>
                        ))}
                        <p className="letter-sign">Con cariño, Kalos</p>
                    </article>
                </div>

                <div className="story-side">
                    <div className="polaroid-wrap" data-reveal>
                        <figure className="polaroid">
                            <img
                                src={wedding.photos[2] ?? wedding.photos[0]}
                                alt={wedding.couple}
                                loading="lazy"
                                decoding="async"
                            />
                            <figcaption>{wedding.couple}</figcaption>
                        </figure>
                    </div>

                    <div className="ficha-wrap" data-reveal>
                        <aside className="ficha" aria-label="Detalles de la boda">
                            <h3>Detalles</h3>
                            <dl>
                                {details.map((item) => (
                                    <div key={item.label}>
                                        <dt>{item.label}</dt>
                                        <dd>{item.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------- 3. Álbum: scroll vertical, fotos rectas ---------- */
function Album({ wedding }) {
    const ref = useSectionReveal();
    const gridRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);

    // Cada foto aparece suavemente al llegar a ella
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const photos = gsap.utils.toArray(".album-photo", gridRef.current);

                gsap.set(photos, { autoAlpha: 0, y: 40 });

                ScrollTrigger.batch(photos, {
                    start: "top 90%",
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            stagger: 0.12,
                        }),
                });
            });

            return () => mm.revert();
        },
        { scope: gridRef }
    );

    // Las fotos cargan poco a poco y cambian la altura de la página:
    // se recalculan las posiciones de las animaciones.
    useEffect(() => {
        const el = gridRef.current;
        let frame;

        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            <section
                ref={ref}
                className="wedding-section snap-section wedding-album"
            >
                <div className="container">
                    <h2 className="phrase album-title" data-reveal>
                        Álbum
                    </h2>

                    <ul
                        ref={gridRef}
                        className="album"
                        data-layout={wedding.albumLayout ?? "editorial"}
                        aria-label="Fotos de la boda"
                    >
                        {wedding.photos.map((src, index) => (
                            <li key={src} className="album-photo">
                                <button
                                    type="button"
                                    aria-label={`Ver foto ${index + 1} de ${wedding.photos.length}`}
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

/* ---------- 4. Vídeos ---------- */
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

/* ---------- 5. Siguiente boda ---------- */
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