'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JoinSection() {
  const containerRef = useRef(null);
  const quoteRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0.2, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="join"
      ref={containerRef}
      className="relative z-20 w-full bg-[#163B32] text-[#F8F6F0] py-20 sm:py-28 px-4 sm:px-6 lg:px-12 transition-colors overflow-hidden border-t border-[#163B32]/40"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-10 text-[#F8F6F0]">
        
        {/* Quote */}
        <div
          ref={quoteRef}
          className="w-full max-w-3xl mx-auto p-7 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center shadow-2xl"
        >
          <blockquote className="font-editorial text-lg sm:text-xl md:text-2xl italic text-[#F8F6F0] leading-relaxed">
            “The true measure of AI’s success will not be its power, but its wisdom, not its efficiency, but its compassion.”
          </blockquote>
        </div>

        {/* Core Invitation Narrative */}
        <div ref={contentRef} className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs tracking-widest uppercase text-[#C9A96A] font-bold">
              Why Join Us
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F6F0]">
              Why Join Us
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed text-balance font-light">
            On October 2, 2026, our journey will begin in Osaka, circle the globe,
            and conclude in ancient Kyoto—symbolizing the harmonious integration
            of past wisdom and future innovation.
          </p>

          <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
            Together, we will create a world where nature, humanity, and technology
            flourish as one—not in competition, but in compassionate partnership.
          </p>

          {/* Nature • Humanity • Technology FLOURISH AS ONE */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="flex items-center gap-4 text-xs font-mono uppercase text-[#C9A96A] tracking-widest">
              <span>Nature</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C96F4A]" />
              <span>Humanity</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C96F4A]" />
              <span>Technology</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#F8F6F0] tracking-tight">
              FLOURISH AS ONE
            </h3>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            <Link
              href="/join"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C96F4A] hover:bg-[#B55F3B] text-white font-bold text-xs tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Join Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:connect@compassionai.io"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F6F0] border border-white/20 font-semibold text-xs tracking-wider uppercase backdrop-blur-sm transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-[#C9A96A]" />
              <span>Ask a Question</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}