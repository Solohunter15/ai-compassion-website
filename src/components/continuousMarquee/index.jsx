'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MARQUEE_ITEMS = [
  'ONE WORLD',
  '12 REGIONS',
  '24 HOURS',
  'ONE GLOBAL CONVERSATION',
  'AI + COMPASSION',
  'OSAKA & GLOBAL RELAY',
  'OCTOBER 2, 2026',
  'HUMAN-CENTERED INTELLIGENCE',
];

export default function ContinuousMarquee({ reverse = false, variant = 'light' }) {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Extremely slow continuous linear scroll
    const totalWidth = track.scrollWidth / 2;
    const duration = 40;

    tweenRef.current = gsap.to(track, {
      x: reverse ? `+=${totalWidth}` : `-=${totalWidth}`,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x);
          return reverse ? `${val % totalWidth}px` : `${(val % totalWidth) - totalWidth}px`;
        }),
      },
    });

    // Subtly increase/decrease movement speed based on scroll velocity
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;

      if (tweenRef.current) {
        const timeScaleFactor = Math.min(3.5, 1 + delta * 0.05);
        gsap.to(tweenRef.current, {
          timeScale: timeScaleFactor,
          duration: 0.3,
          onComplete: () => {
            if (tweenRef.current) {
              gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 });
            }
          },
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [reverse]);

  const isDark = variant === 'dark';

  return (
    <div
      ref={marqueeRef}
      className={`w-full overflow-hidden py-3 border-y select-none pointer-events-none transition-colors duration-500 ${
        isDark
          ? 'bg-[#163B32] border-white/10 text-white/90'
          : 'bg-[#F2F3EF] border-[#E6E9E4] text-[#163B32]'
      }`}
    >
      <div ref={trackRef} className="flex items-center gap-8 whitespace-nowrap will-change-transform w-fit">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
              {item}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#C9A96A]' : 'bg-[#C96F4A]'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
