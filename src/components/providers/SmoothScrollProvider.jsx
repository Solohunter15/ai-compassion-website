'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Gracefully handle reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    try {
      // 1. Register GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // 2. Initialize Lenis Smooth Scroll Engine
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.2,
        infinite: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      // 3. Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        window.dispatchEvent(
          new CustomEvent('lenis-scroll', {
            detail: { velocity: e.velocity, scroll: e.scroll, progress: e.progress },
          })
        );
      });

      // 4. Drive Lenis updates via GSAP Ticker
      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);

      // 5. Setup Dynamic Bidirectional Scroll Animations & Parallax
      let ctx;
      const initScrollAnimations = () => {
        if (ctx) ctx.revert();

        ctx = gsap.context(() => {
          // A. Multi-speed Parallax Scrub on [data-parallax]
          const parallaxEls = document.querySelectorAll('[data-parallax]');
          parallaxEls.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
            const yDist = speed * 80;
            gsap.fromTo(
              el,
              { y: -yDist },
              {
                y: yDist,
                ease: 'none',
                scrollTrigger: {
                  trigger: el.closest('section') || el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              }
            );
          });

          // B. Section-level Dynamic Fade In & Fade Out on Enter/Leave
          const sections = document.querySelectorAll('section:not(#hero)');
          sections.forEach((section) => {
            // Smooth entrance fade & slide up when coming into view, subtle fade out when exiting
            gsap.fromTo(
              section,
              { opacity: 0.25, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 88%',
                  end: 'bottom 12%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );

            // Staggered child elements reveal inside each section
            const childCards = section.querySelectorAll('.scroll-card, .scroll-fade-up, .scroll-pop, .scroll-slide-left, .scroll-slide-right');
            if (childCards.length > 0) {
              gsap.fromTo(
                childCards,
                { opacity: 0, y: 28, scale: 0.96 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.75,
                  stagger: 0.07,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 82%',
                    end: 'bottom 15%',
                    toggleActions: 'play reverse play reverse',
                  },
                }
              );
            }
          });
        });

        ScrollTrigger.refresh();
      };

      // Initial run & deferred refresh for images
      initScrollAnimations();
      const t1 = setTimeout(initScrollAnimations, 250);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);

      // Listen for window resize to recalculate trigger bounds
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('resize', handleResize);
        gsap.ticker.remove(tickerCallback);
        if (ctx) ctx.revert();
        lenis.destroy();
        window.__lenis = null;
      };
    } catch (err) {
      console.warn('SmoothScrollProvider fallback to native scroll:', err);
    }
  }, []);

  return <>{children}</>;
}



