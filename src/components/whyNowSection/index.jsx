'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyNowSection() {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const summary = summaryRef.current;

      if (card1 && card2) {
        gsap.fromTo(
          card1,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card1,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          card2,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card2,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (summary) {
        gsap.fromTo(
          summary,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: summary,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-now"
      ref={containerRef}
      className="relative z-10 w-full bg-[#FFFFFF] py-20 lg:py-28 border-t border-[#D9DDD6]/80"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E9E4] pb-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs tracking-widest uppercase text-[#C96F4A] font-bold">
              03 / Context
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171918]">
              Why Now : The Critical Moment
            </h2>
          </div>
          <p className="text-xs font-mono text-[#5E625D] uppercase tracking-wider">
            2026 Global Index Findings
          </p>
        </div>

        {/* Monumental Data Composition — Both Statistics Fully Visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Stat Card 1: 90% */}
          <div
            ref={card1Ref}
            className="flex flex-col justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-[#F8F6F0] border border-[#E6E9E4] shadow-sm hover:shadow-xl hover:border-[#163B32] transition-all duration-400 group"
          >
            <div className="flex items-baseline justify-between border-b border-[#D9DDD6]/60 pb-6">
              <span className="font-editorial text-7xl sm:text-8xl md:text-9xl font-extrabold text-[#163B32] tracking-tighter leading-none group-hover:scale-105 transition-transform duration-300">
                90%
              </span>
              <span className="font-mono text-xs text-[#163B32] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#163B32]/10">
                ISACA 2026
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171918]">
                AI Use at Work
              </h3>
              <p className="text-sm sm:text-base text-[#5E625D] leading-relaxed">
                90% of digital-trust professionals surveyed by ISACA in 2026 said they believe employees
                are already using AI in their organizations—while only 22% said AI ROI had met or exceeded expectations.
              </p>
            </div>
          </div>

          {/* Stat Card 2: 52% */}
          <div
            ref={card2Ref}
            className="flex flex-col justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-[#F8F6F0] border border-[#E6E9E4] shadow-sm hover:shadow-xl hover:border-[#C96F4A] transition-all duration-400 group"
          >
            <div className="flex items-baseline justify-between border-b border-[#D9DDD6]/60 pb-6">
              <span className="font-editorial text-7xl sm:text-8xl md:text-9xl font-extrabold text-[#C96F4A] tracking-tighter leading-none group-hover:scale-105 transition-transform duration-300">
                52%
              </span>
              <span className="font-mono text-xs text-[#C96F4A] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#C96F4A]/10">
                Stanford 2026
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171918]">
                People Say AI Makes Them Nervous
              </h3>
              <p className="text-sm sm:text-base text-[#5E625D] leading-relaxed">
                Stanford's 2026 AI Index reports that 52% of respondents said AI products and services
                make them nervous, even as 59% said they see more benefits than drawbacks.
              </p>
            </div>
          </div>
        </div>

        {/* Synthesis Narrative Statement */}
        <div
          ref={summaryRef}
          className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#EEF1EC] border border-[#D9DDD6] text-center flex flex-col gap-3 shadow-xs"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#163B32] font-bold">
            The Imperative
          </span>
          <p className="text-sm sm:text-base text-[#171918] leading-relaxed font-normal">
            AI capability is accelerating. Adoption is accelerating. Trust, governance and public
            understanding must evolve with them. The question is no longer simply what AI can do. It is what we choose to do
            with it and how we keep humanity at the centre.
          </p>
        </div>
      </div>
    </section>
  );
}
