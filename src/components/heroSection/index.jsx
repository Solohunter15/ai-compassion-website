'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play, Mic } from 'lucide-react';
import JoinModal from '@/components/joinModal';

export default function HeroSection() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const heroRef = useRef(null);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef(null);

  // High-performance RAF lerp loop updating CSS variables directly (ZERO React re-renders)
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const onMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      targetPosRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };

    const onMouseLeave = () => {
      targetPosRef.current = { x: 0, y: 0 };
    };

    const onScroll = () => {
      if (heroEl) {
        heroEl.style.setProperty('--scroll-y', `${window.scrollY * 0.12}px`);
      }
    };

    const renderLoop = () => {
      const { x: tx, y: ty } = targetPosRef.current;
      const { x: cx, y: cy } = currentPosRef.current;

      const nx = cx + (tx - cx) * 0.08;
      const ny = cy + (ty - cy) * 0.08;

      currentPosRef.current = { x: nx, y: ny };

      heroEl.style.setProperty('--mouse-x', nx.toFixed(4));
      heroEl.style.setProperty('--mouse-y', ny.toFixed(4));

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    heroEl.addEventListener('mousemove', onMouseMove, { passive: true });
    heroEl.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      heroEl.removeEventListener('mousemove', onMouseMove);
      heroEl.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className={`relative z-10 w-full min-h-[92vh] lg:min-h-[98vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none transition-all duration-700 ease-out origin-top ${
          isJoinModalOpen ? 'scale-[0.965] -translate-y-2 brightness-90 rounded-3xl' : 'scale-100 translate-y-0 brightness-100'
        }`}
      >
        {/* ========================================================================= */}
        {/* 1. 8K ULTRA-CLARITY SCENIC BACKDROP WITH 3D DEPTH & PARALLAX */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[70%] pointer-events-none z-0 overflow-hidden will-change-transform"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * 16px), calc(var(--scroll-y, 0px) + var(--mouse-y, 0) * 12px), 0) scale(1.03)',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/hero_clean_ultra.jpg"
              alt="AI + Compassion Global Forum 2026 Artwork"
              fill
              priority
              quality={100}
              className="object-cover object-right-bottom opacity-95"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />

            {/* Seamless Editorial Warm Ivory Gradient Masks for Crystal Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/80 lg:via-[#F8F6F0]/50 to-transparent w-full lg:w-[50%]" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F8F6F0] via-[#F8F6F0]/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8F6F0] to-transparent" />
          </div>
        </div>

        {/* Ambient Glassmorphic Glow Orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none will-change-transform"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * -25px), calc(var(--mouse-y, 0) * -25px), 0)',
          }}
        />
        <div
          className="absolute bottom-1/3 right-12 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none will-change-transform"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px), 0)',
          }}
        />

        {/* ========================================================================= */}
        {/* 2. MAIN 2-COLUMN RESPONSIVE LAYOUT (MINIMALISM + MAXIMALISM + GLASSMORPHISM) */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
          
          {/* LEFT COLUMN: Editorial Narrative, CTAs & Live 4-Metric Statistics */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-5 sm:gap-6 z-20">
            
            {/* Main Editorial Headline */}
            <div className="flex flex-col gap-1">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171918] leading-[1.02]">
                AI + Compassion
                <br />
                <span className="text-[#3D443E] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Global Forum 2026
                </span>
              </h1>
            </div>

            {/* Date with Terracotta Orange Accent Line */}
            <div className="flex items-center gap-3">
              <span className="h-[2.5px] w-8 bg-[#C96F4A] rounded-full" />
              <p className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#163B32]">
                October 2–3, 2026
              </p>
            </div>

            {/* Core Story Vision */}
            <p className="text-sm sm:text-base md:text-lg text-[#5E625D] leading-relaxed max-w-xl font-normal text-balance">
              A 24-hour global conversation for a planet-centered future (nature, humanity, &amp; AI/technology).
            </p>

            {/* Action Buttons: REGISTER NOW, JOIN AS SPEAKER & WHY NOW */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
              
              {/* 1. REGISTER NOW Button (Opens Google Form Modal) */}
              <button
                type="button"
                onClick={() => setIsJoinModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* 2. JOIN AS SPEAKER Button (Links to Speaker Form) */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScITmFQEc6adbfZ87EFldr5xMaZFGpKH5WzSigYQa9k1H-UMw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#163B32] hover:text-white bg-emerald-50/90 hover:bg-[#163B32] border border-[#163B32]/30 hover:border-[#163B32] rounded-full shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-[#C96F4A]" />
                <span>JOIN AS SPEAKER</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* 3. WHY NOW Button (Redirects to https://ai-compassion-relay.vercel.app/#relay) */}
              <a
                href="https://ai-compassion-relay.vercel.app/#relay"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#171918] hover:text-[#C96F4A] transition-all rounded-full bg-white/95 hover:bg-white border border-[#D9DDD6] hover:border-[#163B32] shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>WHY NOW</span>
                <Play className="w-3 h-3 fill-current text-[#163B32]" />
              </a>
            </div>

            {/* 4-Metric Statistics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#D9DDD6]/80 text-[#171918] mt-2">
              <div className="flex flex-col">
                <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">24h</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Continuous Relay</span>
              </div>
              <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-4">
                <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">12</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">World Regions</span>
              </div>
              <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-4">
                <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">28+</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Flagship Hubs</span>
              </div>
              <div className="flex flex-col sm:border-l sm:border-[#D9DDD6] sm:pl-4">
                <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">1</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Shared Tomorrow</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Scenic Visual Showcase (Clean background without duplicate overlays) */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[440px] lg:h-[560px]" />

        </div>
      </section>

      {/* Embedded Google Form Registration Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </>
  );
}