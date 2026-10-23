import { useEffect, useRef } from "react";
import { videoPoster } from "../../data/photos";

export default function VideoLoop() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!video || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-section video-loop" aria-label="Vídeo de Kalos">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={videoPoster}
        aria-hidden="true"
      >
        <source src="/video/reel.mp4" type="video/mp4" />
      </video>
    </section>
  );
}