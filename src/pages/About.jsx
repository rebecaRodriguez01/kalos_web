import useSnapScroll from "../hooks/useSnapScroll";
import useSectionReveal from "../hooks/useSectionReveal";
import ArrowLink from "../components/ui/ArrowLink";
import { about } from "../data/about";
import { WHATSAPP_URL } from "../data/contact";
import "../styles/pages/About.css";

// Frase con una palabra destacada en caligrafía
function Highlighted({ before, highlight, after }) {
    return (
        <>
            {before} <em>{highlight}</em>
            {after && ` ${after}`}
        </>
    );
}

/* ---------- 1. Portada ---------- */
function Cover() {
    const ref = useSectionReveal();

    return (
        <section ref={ref} className="about-section snap-section about-cover">
            <img
                className="about-cover-img"
                src={about.coverPhoto}
                alt="Los fundadores de Kalos"
            />
            <div className="about-cover-overlay" aria-hidden="true" />

            <div className="container">
                <h1 className="about-cover-title" data-reveal>
                    {about.names}
                </h1>
                <p className="about-tagline phrase" data-reveal>
                    <Highlighted {...about.tagline} />
                </p>
            </div>
        </section>
    );
}

/* ---------- 2-4. Capítulos de su historia ---------- */
function Chapter({ chapter, reverse, tone }) {
    const ref = useSectionReveal();

    return (
        <section
            ref={ref}
            className={`about-section snap-section about-chapter tone-${tone} ${reverse ? "is-reverse" : ""
                }`}
        >
            <div className="about-chapter-photo">
                <img
                    src={chapter.photo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className="about-chapter-text">
                <p className="about-number" data-reveal aria-hidden="true">
                    {chapter.number}
                </p>
                <h2 className="phrase about-chapter-title" data-reveal>
                    {chapter.title}
                </h2>
                {chapter.text.map((paragraph, index) => (
                    <p key={index} className="about-chapter-copy" data-reveal>
                        {paragraph}
                    </p>
                ))}
            </div>
        </section>
    );
}

/* ---------- 5. Visión de Kalos ---------- */
function Vision() {
    const ref = useSectionReveal();
    const { vision } = about;

    return (
        <section ref={ref} className="about-section snap-section about-vision">
            <div className="container">
                <blockquote className="about-statement phrase" data-reveal>
                    <Highlighted before={vision.before} highlight={vision.highlight} />
                </blockquote>

                <ul className="principles">
                    {vision.principles.map((principle) => (
                        <li key={principle.title} data-reveal>
                            <h3>{principle.title}</h3>
                            <p>{principle.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ---------- 6. Detrás de cámara ---------- */
function Behind() {
    const ref = useSectionReveal();
    const { behind } = about;

    return (
        <section ref={ref} className="about-section snap-section about-behind">
            <div className="container">
                <h2 className="phrase about-behind-title" data-reveal>
                    {behind.title}
                </h2>

                <ul className="behind-grid" data-reveal>
                    {behind.items.map((item, index) => (
                        <li key={index}>
                            <figure>
                                <img
                                    src={item.photo}
                                    alt={item.caption}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <figcaption>{item.caption}</figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ---------- 7. Cierre ---------- */
function Close() {
    const ref = useSectionReveal();
    const { closing } = about;

    return (
        <section ref={ref} className="about-section snap-section about-close">
            <div className="container about-close-inner">
                <p className="about-close-text phrase" data-reveal>
                    <Highlighted
                        before={closing.before}
                        highlight={closing.highlight}
                        after={closing.after}
                    />
                </p>

                <p className="about-signature" data-reveal>
                    Keyla Leyva
                </p>

                <div data-reveal>
                    <ArrowLink href={WHATSAPP_URL}>{closing.cta}</ArrowLink>
                </div>
            </div>
        </section>
    );
}

export default function About() {
    useSnapScroll();

    return (
        <main>
            <title>Conócenos | Kalos</title>

            <Cover />

            {about.chapters.map((chapter, index) => (
                <Chapter
                    key={chapter.number}
                    chapter={chapter}
                    reverse={index % 2 === 1}
                    tone={index % 2 === 0 ? "paper" : "sand"}
                />
            ))}

            <Vision />
            <Behind />
            <Close />
        </main>
    );
}