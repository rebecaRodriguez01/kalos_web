import { useEffect } from "react";
import Hero from "../components/Hero";
import Manifesto from "../components/home/Manifesto";
import Founders from "../components/home/Founders";
import VideoLoop from "../components/home/VideoLoop";
import Collage from "../components/home/Collage";
import Reviews from "../components/home/Reviews";
import BookingCTA from "../components/home/BookingCTA";
import "../styles/pages/Home.css";

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-home");
    return () => root.classList.remove("snap-home");
  }, []);

  return (
    <main>
      <Hero />
      <Manifesto />
      <Founders />
      <VideoLoop />
      <Collage />
      <Reviews />
      <BookingCTA />
    </main>
  );
}