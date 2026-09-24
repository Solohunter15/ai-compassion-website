'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
  Radio,
} from 'lucide-react';
import ThreeEarthGlobe from './ThreeEarthGlobe';
import { RELAY_REGIONS } from './relayData';

export default function GlobalRelayGlobeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [localTime, setLocalTime] = useState('');
  
  const outerTrackRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const infoCardRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  // Live Local Time ticker for the active region
  useEffect(() => {
    const updateTime = () => {
      const region = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: region.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch (e) {
        setLocalTime('--:--:--');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Robust Native & Smooth Sticky Scroll Progress Tracker
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      const track = outerTrackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      
      setScrollProgress(p);

      // Map progress to 0..11 stages
      const rawIndex = Math.floor(p * RELAY_REGIONS.length);
      const clampedIndex = Math.min(RELAY_REGIONS.length - 1, Math.max(0, rawIndex));
      setActiveIndex(clampedIndex);
    };

    const throttledScroll = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          handleScroll();
          animationFrameId = null;
        });
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });
    handleScroll();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
    };
  }, []);

  // Jump to specific region via scroll with stable useCallback
  const handleSelectRegion = useCallback((index) => {
    setActiveIndex(index);
    isProgrammaticScroll.current = true;

    const track = outerTrackRef.current;
    if (track) {
      const trackTop = track.offsetTop;
      const trackHeight = track.offsetHeight - window.innerHeight;
      const targetScroll = trackTop + (index / (RELAY_REGIONS.length - 1)) * trackHeight;

      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, {
          duration: 1.1,
          onComplete: () => {
            isProgrammaticScroll.current = false;
          },
        });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 800);
      }
    }
  }, []);

  const nextRegion = () => {
    const nextIdx = (activeIndex + 1) % RELAY_REGIONS.length;
    handleSelectRegion(nextIdx);
  };

  const prevRegion = () => {
    const prevIdx = (activeIndex - 1 + RELAY_REGIONS.length) % RELAY_REGIONS.length;
    handleSelectRegion(prevIdx);
  };

  const activeRegion = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];
  const { producer } = activeRegion;

  return (
    <section
      id="relay"
      ref={outerTrackRef}
      className="relative w-full min-h-[340vh] bg-[#F8F6F0] border-t border-b border-[#D9DDD6]/80 transition-colors duration-700"
    >
      {/* Sticky Full-Viewport Stage */}
      <div
        ref={stickyContainerRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-2 sm:py-4 lg:py-6 px-3 sm:px-6 lg:px-12 overflow-hidden z-20"
      >
        {/* Background Subtle Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#163B32]/8 via-[#C96F4A]/5 to-transparent rounded-full blur-3xl opacity-70" />
        </div>

        {/* Top Header & Navigation Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-2 border-b border-[#D9DDD6]/80 pb-2">
          
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white border border-[#D9DDD6] text-[10px] sm:text-xs font-mono tracking-widest text-[#163B32] uppercase font-bold shadow-xs">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C96F4A] animate-spin" style={{ animationDuration: '20s' }} />
              <span>04 / Global Relay</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#163B32]/5 border border-[#163B32]/15 text-xs font-mono text-[#163B32]">
              <Radio className="w-3 h-3 text-[#22C55E] animate-pulse" />
              <span>Scroll down to rotate around Earth</span>
            </div>
          </div>

          {/* Stepper Controls & Stage Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={prevRegion}
              className="p-1.5 sm:p-2.5 rounded-full bg-white border border-[#D9DDD6] text-[#171918] hover:bg-[#163B32] hover:text-[#F8F6F0] hover:border-[#163B32] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Previous Region"
              aria-label="Previous Region"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="font-mono text-[11px] sm:text-xs font-bold text-[#163B32] bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#D9DDD6] shadow-xs select-none flex items-center gap-1">
              <span>{String(activeRegion.id).padStart(2, '0')}</span>
              <span className="text-[#5E625D]/50">/</span>
              <span className="text-[#5E625D]">12</span>
            </div>

            <button
              type="button"
              onClick={nextRegion}
              className="p-1.5 sm:p-2.5 rounded-full bg-white border border-[#D9DDD6] text-[#171918] hover:bg-[#163B32] hover:text-[#F8F6F0] hover:border-[#163B32] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Next Region"
              aria-label="Next Region"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Centerpiece 2-Column Interactive Showcase */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center my-auto">
          
          {/* Left: 3D Photorealistic Interactive Earth Globe (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-[180px] sm:max-w-[260px] lg:max-w-[440px] aspect-square flex items-center justify-center">
              <ThreeEarthGlobe
                activeIndex={activeIndex}
                onSelectRegion={handleSelectRegion}
                scrollProgress={scrollProgress}
              />
            </div>
          </div>

          {/* Right: Dynamic Producer & Inquiry Information Card (6 Cols) */}
          <div
            ref={infoCardRef}
            className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 border border-[#D9DDD6] shadow-xl flex flex-col gap-2.5 sm:gap-4 backdrop-blur-md transition-all duration-300"
          >
            {/* Stage Badge & Live Local Clock */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E9E4] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#C96F4A] bg-[#C96F4A]/10 px-2.5 py-0.5 rounded-full">
                  STAGE {String(activeRegion.id).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#163B32]">
                  {activeRegion.code}
                </span>
              </div>

              {/* Live Local Clock at Hub */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8F6F0] border border-[#E6E9E4] text-[10px] sm:text-[11px] font-mono text-[#163B32]">
                <Clock className="w-3 h-3 text-[#C96F4A]" />
                <span className="font-bold" suppressHydrationWarning>{localTime || '--:--:--'}</span>
                <span className="text-[#5E625D] text-[9px] sm:text-[10px]">({activeRegion.utcOffset})</span>
              </div>
            </div>

            {/* Region Title & Ethical Inquiry Question */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#5E625D]">
                <MapPin className="w-3 h-3 text-[#C96F4A]" />
                <span>{activeRegion.city}</span>
              </div>
              <h3 className="font-editorial text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#171918] leading-tight tracking-tight">
                “{activeRegion.question}”
              </h3>
            </div>

            {/* Producer Profile */}
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#F8F6F0] border border-[#E6E9E4] flex flex-row items-center sm:items-start gap-3 sm:gap-4">
              
              {/* Producer Portrait or Monogram */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-[#D9DDD6] bg-white shadow-xs group">
                {producer.img ? (
                  <Image
                    src={producer.img}
                    alt={producer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 48px, 72px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#163B32]/10 via-[#F8F6F0] to-[#C9A96A]/20 text-[#163B32]">
                    <span className="font-editorial text-sm sm:text-lg font-bold tracking-wider text-[#163B32]">
                      {producer.name
                        .split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Producer Details */}
              <div className="flex flex-col gap-0.5 text-left flex-1 min-w-0">
                <div>
                  <h4 className="font-editorial text-xs sm:text-base font-bold text-[#163B32] truncate">
                    {producer.name}
                  </h4>
                  <p className="text-[9px] sm:text-[11px] font-mono text-[#C96F4A] font-semibold uppercase tracking-wider truncate">
                    {producer.role}
                  </p>
                </div>

                <p className="text-[10px] sm:text-xs text-[#5E625D] leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {producer.bio}
                </p>

                {/* Thematic Tags */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {producer.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded-full bg-white border border-[#D9DDD6] text-[9px] font-mono text-[#171918]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hub Details & Next Hub Action */}
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-[#5E625D]">
                Hub: <strong>{activeRegion.hubs}</strong>
              </span>

              <button
                type="button"
                onClick={nextRegion}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#163B32] hover:text-[#C96F4A] transition-colors cursor-pointer group"
              >
                <span>Next Hub</span>
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Relay Progress Bar & Region Pills */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-2 pt-1">
          
          {/* Continuous Scroll Progress Track */}
          <div className="w-full h-1.5 bg-[#E6E9E4] rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#163B32] via-[#22C55E] to-[#C9A96A] transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(8, (activeIndex + 1) / RELAY_REGIONS.length * 100)}%` }}
            />
          </div>

          {/* 12 Region Selector Pills */}
          <div className="w-full flex items-center justify-between gap-1 overflow-x-auto py-1 scrollbar-none select-none">
            {RELAY_REGIONS.map((r, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRegion(idx)}
                  className={`shrink-0 flex items-center justify-center px-2.5 sm:px-3 py-1 rounded-full border text-[10px] font-mono transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#163B32] text-[#F8F6F0] border-[#163B32] shadow-sm font-bold scale-105'
                      : 'bg-white text-[#5E625D] border-[#D9DDD6] hover:text-[#171918] hover:border-[#163B32]/40'
                  }`}
                  title={`${r.code} — ${r.hubs}`}
                >
                  <span>{String(r.id).padStart(2, '0')}</span>
                  <span className="hidden xl:inline ml-1 opacity-80">{r.hubs.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
