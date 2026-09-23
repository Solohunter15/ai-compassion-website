'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import HeroEarthGlobe from './HeroEarthGlobe';

export default function HeroSection() {
  const containerRef = useRef(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-10 w-full min-h-[94vh] lg:min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none"
    >
      {/* 1. Full Scenic Kyoto Sunrise Horizon & Spectator Landscape (Matching Reference Image) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/hero_right_landscape.jpg"
            alt="Scenic Kyoto landscape with spectator overlooking sunrise and pagoda"
            fill
            priority
            className="object-cover object-right-bottom opacity-85 sm:opacity-95 mix-blend-multiply"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />
          {/* Subtle Left-Edge Fade into warm ivory for seamless text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/50 to-transparent w-full lg:w-[45%]" />
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

        {/* Right Column: Revolving 3D World Globe + 3 Floating Hovering Glassmorphic Frames */}
        <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[540px] lg:h-[600px] flex items-center justify-center">
          
          {/* A. 3D Revolving World Globe (Upper-Right Space/Sky) */}
          <div className="absolute right-0 sm:right-2 top-0 sm:top-2 w-[320px] sm:w-[420px] lg:w-[490px] aspect-square flex items-center justify-center z-10">
            <HeroEarthGlobe />
          </div>

          {/* B. Calligraphy Cursive Script Overlay across Globe */}
          <div className="absolute top-[38%] sm:top-[40%] right-4 sm:right-12 z-25 pointer-events-none text-right">
            <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[#F8F6F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] tracking-wide leading-snug">
              A kinder intelligence<br />
              <span className="underline decoration-[#C9A96A] decoration-1 underline-offset-4">
                is possible.
              </span>
            </p>
          </div>

          {/* C. Floating Hovering Glassmorphic Frame 1 (Top Center: Woman looking into sunrise) */}
          <div className="absolute top-0 sm:top-3 right-24 sm:right-36 z-20 animate-float-1 group">
            <div className="relative w-28 h-36 sm:w-36 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/90 bg-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_25px_45px_rgba(0,0,0,0.3)]">
              <Image
                src="/hero_frame_person.jpg"
                alt="Visionary gazing into sunrise"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 112px, 144px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
            </div>
          </div>

          {/* D. Floating Hovering Glassmorphic Frame 2 (Middle-Left: Kyoto Pagoda Twilight Street) */}
          <div className="absolute top-[24%] sm:top-[22%] left-2 sm:left-10 z-30 animate-float-2 group">
            <div className="relative w-32 h-44 sm:w-44 sm:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/90 bg-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_25px_45px_rgba(0,0,0,0.3)]">
              <Image
                src="/hero_frame_pagoda.jpg"
                alt="Kyoto pagoda twilight alley"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 128px, 176px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
            </div>
          </div>

          {/* E. Floating Hovering Glassmorphic Frame 3 (Foreground Right: Robot & Human Hands Touching) */}
          <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-16 z-35 animate-float-3 group">
            <div className="relative w-36 h-48 sm:w-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/90 bg-white/30 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_30px_55px_rgba(0,0,0,0.35)]">
              <Image
                src="/hero_frame_ai_hand.jpg"
                alt="AI and human hands connecting with golden spark"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 144px, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
            </div>
          </div>

          {/* F. Far-Right Monospace Pillar Words */}
          <div className="absolute bottom-12 sm:bottom-16 right-0 sm:-right-4 z-25 pointer-events-none hidden md:flex flex-col gap-1 text-[10px] font-mono font-bold tracking-widest text-right text-[#171918]/80 uppercase">
            <span>PEOPLE</span>
            <span>IDEAS</span>
            <span>CULTURES</span>
            <span className="text-[#C96F4A]">FOR A BRIGHTER</span>
            <span className="text-[#163B32]">TOMORROW</span>
          </div>

          {/* G. Bottom-Right Scroll Target Badge */}
          <div className="absolute bottom-0 right-2 sm:right-6 z-25 pointer-events-none flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full border border-[#163B32]/40 bg-white/85 backdrop-blur-xs flex items-center justify-center shadow-xs animate-pulse">
              <div className="w-2 h-2 rounded-full bg-[#C96F4A]" />
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