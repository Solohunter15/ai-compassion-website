'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Gracefully handle reduced motion preference if requested
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reveal everything immediately if reduced motion is requested
      document.querySelectorAll('.reveal-on-scroll, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    try {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      // Synchronize Lenis with GSAP ScrollTrigger & update dynamic CSS custom properties
      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        if (typeof document !== 'undefined') {
          const root = document.documentElement;
          root.style.setProperty('--scroll-y-px', `${e.scroll}px`);
          root.style.setProperty('--scroll-velocity', `${e.velocity}`);
          root.style.setProperty('--scroll-direction', `${e.direction}`);
        }
      });

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Automated Viewport Reveal Observer for smooth dynamic scrolling reveals
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              // Optionally unobserve after revealing for optimal performance
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.1,
        }
      );

      const observeElements = () => {
        const elements = document.querySelectorAll('.reveal-on-scroll, [data-reveal]');
        elements.forEach((el) => {
          if (!el.classList.contains('is-revealed')) {
            revealObserver.observe(el);
          }
        });
      };

      observeElements();
      const mutationObserver = new MutationObserver(observeElements);
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        gsap.ticker.remove(tickerCallback);
        revealObserver.disconnect();
        mutationObserver.disconnect();
        lenis.destroy();
        window.__lenis = null;
      };
    } catch (err) {
      console.warn('SmoothScrollProvider fallback to native scroll:', err);
    }
  }, []);

  return <>{children}</>;
}
