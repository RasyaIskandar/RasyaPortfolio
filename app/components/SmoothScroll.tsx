"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,       // Semakin tinggi, semakin lembut
      smoothWheel: true,   // Halus untuk scroll mouse
    //   smoothTouch: false,  // Opsional untuk mobile
      easing: (t) => 1 - Math.pow(1 - t, 2), // Ease out curve
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}
