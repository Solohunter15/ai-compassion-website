'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play, Sparkles, Mic, ChevronDown } from 'lucide-react';
import JoinModal from '@/components/joinModal';

export default function HeroSection() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full min-h-[92vh] lg:min-h-[98vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none"
      >
        {/* ========================================================================= */}
        {/* 1. 8K ULTRA-CLARITY SCENIC BACKDROP WITH 3D DEPTH & PARALLAX */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[70%] pointer-events-none z-0 overflow-hidden transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 16}px, ${scrollY * 0.12 + mousePos.y * 12}px, 0) scale(1.03)`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/hero_scenic_ultra.jpg"
              alt="AI + Compassion Global Forum 2026 8K Ultra Artwork"
              fill
              priority
              quality={100}
              className="object-cover object-right-bottom opacity-95 transition-opacity duration-1000"
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
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none transition-transform duration-1000"
          style={{
            transform: `translate3d(${-mousePos.x * 25}px, ${-mousePos.y * 25}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-12 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none transition-transform duration-1000"
          style={{
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
          }}
        />

        {/* ========================================================================= */}
        {/* 2. MAIN 2-COLUMN RESPONSIVE LAYOUT (MINIMALISM + MAXIMALISM + GLASSMORPHISM) */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
          
          {/* LEFT COLUMN: Editorial Narrative, CTAs & Live 4-Metric Statistics */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-5 sm:gap-6 z-20">
            
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D9DDD6] text-xs font-mono font-bold tracking-wider uppercase text-[#171918] w-fit shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#163B32] animate-pulse" />
              <span>GLOBAL FORUM 2026</span>
              <span className="text-[#C96F4A] font-bold">• 24H RELAY</span>
            </div>

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
              A 24-hour global conversation for a more human-centered future.
            </p>

            {/* Action Buttons: JOIN US, JOIN AS SPEAKER & WHY NOW */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
              
              {/* 1. JOIN US Button (Opens Google Form Modal) */}
              <button
                type="button"
                onClick={() => setIsJoinModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>JOIN US</span>
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

              {/* 3. WHY NOW Button */}
              <a
                href="#about"
                onClick={(e) => handleScrollToSection(e, 'about')}
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

          {/* RIGHT COLUMN: Interactive 3D Layered Glassmorphic Scene */}
          <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[480px] lg:h-[580px] flex items-center justify-center perspective-1000">
            
            {/* 3D Floating Glass Card 1: AI Hand Connection with Glow */}
            <div
              className="absolute top-4 sm:top-8 right-2 sm:right-6 z-20 max-w-[240px] sm:max-w-[280px] p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/60 shadow-xl transition-transform duration-500 hover:scale-105 animate-float-1"
              style={{
                transform: `translate3d(${-mousePos.x * 30}px, ${-mousePos.y * 25}px, 40px) rotate(${mousePos.x * 4}deg)`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C96F4A] animate-ping" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#163B32]">Human Connection</span>
              </div>
              <p className="font-editorial text-xs sm:text-sm font-semibold italic text-[#163B32] leading-snug">
                &ldquo;A kinder intelligence is possible.&rdquo;
              </p>
            </div>

            {/* 3D Floating Glass Card 2: Cultural Pillars */}
            <div
              className="absolute bottom-12 sm:bottom-16 right-4 sm:right-12 z-20 max-w-[260px] sm:max-w-[300px] p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl transition-transform duration-500 hover:scale-105 animate-float-2"
              style={{
                transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 30}px, 60px) rotate(${-mousePos.x * 4}deg)`,
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C96F4A] uppercase">
                  Global Relay 2026
                </span>
                <p className="text-xs font-semibold text-[#171918] tracking-tight">
                  PEOPLE • IDEAS • CULTURES • FOR A BRIGHTER TOMORROW
                </p>
              </div>
            </div>

            {/* Scroll Target Indicator */}
            <a
              href="#about"
              onClick={(e) => handleScrollToSection(e, 'about')}
              className="absolute bottom-2 right-2 sm:right-6 z-25 flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full border border-[#163B32]/40 bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#163B32] transition-all">
                <ChevronDown className="w-4 h-4 text-[#163B32] animate-bounce" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[#5E625D] group-hover:text-[#163B32] uppercase font-bold text-center transition-colors">
                SCROLL<br />TO EXPLORE
              </span>
            </a>

          </div>

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