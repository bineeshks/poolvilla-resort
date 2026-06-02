'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.8, // 1.8s premium easing feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium smooth momentum deceleration
      smoothWheel: true,
      wheelMultiplier: 0.95, // Buttery soft momentum
      touchMultiplier: 1.4, // Responsive and fluid on touch devices
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
