'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none"
    >
      {/* 1. Full Scenic Horizon & World Artwork (Clean Static Visual matching Reference) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/hero_bg_composite.jpg"
            alt="AI + Compassion Global Forum 2026 visual artwork"
            fill
            priority
            className="object-cover object-right-bottom opacity-95"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />
          {/* Subtle Left Fade into warm ivory for seamless text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/60 to-transparent w-full lg:w-[45%]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F8F6F0] to-transparent" />
        </div>
      </div>

      {/* 2. Main 2-Column Responsive Layout Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
        
        {/* Left Column: Editorial Headline, Subtitle, CTA Actions & 4-Metric Strip */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-5 sm:gap-6 z-20">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D9DDD6] text-xs font-mono font-bold tracking-wider uppercase text-[#171918] w-fit shadow-xs backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#163B32] animate-pulse" />
            <span>GLOBAL FORUM 2026</span>
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

          {/* Date with Terracotta Orange Dash */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-7 bg-[#C96F4A]" />
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#163B32]">
              October 2–3, 2026
            </p>
          </div>

          {/* Core Story Vision */}
          <p className="text-sm sm:text-base md:text-lg text-[#5E625D] leading-relaxed max-w-xl font-normal text-balance">
            A 24-hour global conversation for a more human-centered future.
          </p>

          {/* Action Buttons: JOIN US & WHY NOW */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>JOIN US</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="https://ai-compassion-relay.vercel.app/#relay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#171918] hover:text-[#C96F4A] transition-all rounded-full bg-white/95 hover:bg-white border border-[#D9DDD6] hover:border-[#163B32] shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>WHY NOW</span>
              <Play className="w-3 h-3 fill-current text-[#163B32]" />
            </a>
          </div>

          {/* 4-Metric Statistics Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-[#D9DDD6]/80 text-[#171918] mt-2">
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">24h</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Continuous Relay</span>
            </div>
            <div className="h-8 w-[1px] bg-[#D9DDD6]" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">12</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">World Regions</span>
            </div>
            <div className="h-8 w-[1px] bg-[#D9DDD6]" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">28+</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Flagship Hubs</span>
            </div>
            <div className="h-8 w-[1px] bg-[#D9DDD6]" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#163B32]">1</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D] uppercase tracking-wider font-semibold">Shared Tomorrow</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Area displaying the reference artwork */}
        <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
          {/* Scroll Target indicator at bottom right */}
          <div className="absolute bottom-2 right-2 sm:right-6 z-25 pointer-events-none flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full border border-[#163B32]/40 bg-white/85 backdrop-blur-xs flex items-center justify-center shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#163B32]" />
            </div>
            <span className="text-[9px] font-mono tracking-widest text-[#5E625D] uppercase font-bold text-center">
              SCROLL<br />TO EXPLORE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}