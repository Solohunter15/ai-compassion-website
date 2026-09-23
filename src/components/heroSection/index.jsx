'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import HeroEarthGlobe from './HeroEarthGlobe';

export default function HeroSection() {
  const leftContentRef = useRef(null);

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-[96vh] flex flex-col justify-between pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden select-none"
    >
      {/* Background Horizon Landscape Silhouette (Scenic Kyoto/Osaka Sunrise Horizon) */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] sm:h-[60%] pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/hero_horizon_bg.jpg"
            alt="Scenic Kyoto horizon landscape at sunrise"
            fill
            priority
            className="object-cover object-bottom opacity-85 mix-blend-multiply"
            sizes="100vw"
          />
          {/* Subtle top & side gradient fades into warm ivory */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F8F6F0]/25 to-[#F8F6F0]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/40 to-transparent" />
        </div>
      </div>

      {/* Main 2-Column Responsive Showcase Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto">
        
        {/* Left Column: Editorial Headline, Story Statement, Actions & Stats (6-7 Cols) */}
        <div ref={leftContentRef} className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center gap-5 sm:gap-6 z-20">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D9DDD6] text-xs font-mono font-bold tracking-wider uppercase text-[#171918] w-fit shadow-xs backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#163B32] animate-pulse" />
            <span>GLOBAL FORUM 2026</span>
          </div>

          {/* Main Editorial Headline */}
          <div className="flex flex-col gap-1">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171918] leading-[1.03]">
              AI + Compassion
              <br />
              <span className="text-[#3D443E] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Global Forum 2026
              </span>
            </h1>
          </div>

          {/* Subtitle & Date */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-7 bg-[#C96F4A]" />
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#163B32]">
              October 2–3, 2026
            </p>
          </div>

          {/* Core Vision Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#5E625D] leading-relaxed max-w-xl font-normal text-balance">
            A 24-hour global conversation for a more human-centered future.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>JOIN US</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Why Now Button */}
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

          {/* Bottom Left Metrics Strip */}
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

        {/* Right Column: Revolving 3D World Globe + 3 Hovering Floating Glassmorphic Frames (6 Cols) */}
        <div className="lg:col-span-6 xl:col-span-6 relative w-full h-[480px] sm:h-[560px] lg:h-[620px] flex items-center justify-center">
          
          {/* 1. Revolving 3D World Globe in Upper Right / Center Background */}
          <div className="absolute right-0 sm:right-2 top-0 sm:top-2 w-[340px] sm:w-[440px] lg:w-[500px] aspect-square flex items-center justify-center z-10">
            <HeroEarthGlobe />
          </div>

          {/* 2. Handwritten Elegant Script Overlay on Globe */}
          <div className="absolute top-[38%] sm:top-[40%] right-6 sm:right-16 z-25 pointer-events-none text-right">
            <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[#F8F6F0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] tracking-wide leading-snug">
              A kinder intelligence<br />
              <span className="underline decoration-[#C9A96A] decoration-1 underline-offset-4">
                is possible.
              </span>
            </p>
          </div>

          {/* 3. Floating Hovering Glassmorphic Frame 1 (Top / Upper Right: Person Looking Up into Sunrise) */}
          <div className="absolute top-1 sm:top-4 right-20 sm:right-32 z-20 animate-float-1 group">
            <div className="relative w-28 h-36 sm:w-36 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/90 bg-white/30 shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
              <Image
                src="/hero_frame_person.jpg"
                alt="Visionary looking up into sunrise"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 112px, 144px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
            </div>
          </div>

          {/* 4. Floating Hovering Glassmorphic Frame 2 (Middle Left: Kyoto Pagoda Twilight Street) */}
          <div className="absolute top-[26%] sm:top-[24%] left-4 sm:left-12 z-30 animate-float-2 group">
            <div className="relative w-32 h-44 sm:w-44 sm:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/90 bg-white/30 shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
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

          {/* 5. Floating Hovering Glassmorphic Frame 3 (Middle Right / Foreground: Robot & Human Touching Hands) */}
          <div className="absolute bottom-10 sm:bottom-14 right-10 sm:right-16 z-35 animate-float-3 group">
            <div className="relative w-36 h-48 sm:w-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/90 bg-white/30 shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)]">
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

          {/* 6. Right Side Monospace Pillar Keywords */}
          <div className="absolute bottom-14 sm:bottom-18 right-0 sm:-right-4 z-25 pointer-events-none hidden md:flex flex-col gap-1 text-[10px] font-mono font-bold tracking-widest text-right text-[#171918]/80 uppercase">
            <span>PEOPLE</span>
            <span>IDEAS</span>
            <span>CULTURES</span>
            <span className="text-[#C96F4A]">FOR A BRIGHTER</span>
            <span className="text-[#163B32]">TOMORROW</span>
          </div>

          {/* 7. Bottom Right Scroll Target Badge */}
          <div className="absolute bottom-1 right-2 sm:right-6 z-25 pointer-events-none flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full border border-[#163B32]/40 bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-xs animate-pulse">
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