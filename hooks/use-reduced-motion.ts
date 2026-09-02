"use client";

import { useEffect, useState } from "react";

/** `prefers-reduced-motion: reduce` kısayolu — ambient float/parallax gibi
 * sürekli animasyonları kapatmak için (bkz. mimari doküman §6.2). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
