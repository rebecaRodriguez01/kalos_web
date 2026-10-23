import { useEffect } from "react";

export default function useSnapScroll() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-page");
    return () => root.classList.remove("snap-page");
  }, []);
}