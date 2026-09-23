'use client';

import { useState, useEffect, useRef } from 'react';
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

      // rect.top is 0 when track starts sticking at top of viewport
      // rect.top is -totalScrollable when track finishes sticking
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

  // Jump to specific region via scroll
  const handleSelectRegion = (index) => {
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
  };

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
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-5 md:py-7 px-4 sm:px-6 lg:px-12 overflow-hidden z-20"
      >
        {/* Background Subtle Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#163B32]/8 via-[#C96F4A]/5 to-transparent rounded-full blur-3xl opacity-70" />
        </div>

        {/* Top Header & Navigation Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9DDD6]/80 pb-3">
          
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D9DDD6] text-xs font-mono tracking-widest text-[#163B32] uppercase font-bold shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#C96F4A] animate-spin" style={{ animationDuration: '20s' }} />
              <span>06 / Global Relay</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#163B32]/5 border border-[#163B32]/15 text-xs font-mono text-[#163B32]">
              <Radio className="w-3 h-3 text-[#C96F4A] animate-pulse" />
              <span>Scroll down to rotate around Earth</span>
            </div>
          </div>

          {/* Stepper Controls & Stage Indicator */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={prevRegion}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-[#D9DDD6] text-[#171918] hover:bg-[#163B32] hover:text-[#F8F6F0] hover:border-[#163B32] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Previous Region"
              aria-label="Previous Region"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="font-mono text-xs font-bold text-[#163B32] bg-white px-3.5 py-1.5 sm:py-2 rounded-full border border-[#D9DDD6] shadow-xs select-none flex items-center gap-1.5">
              <span>{String(activeRegion.id).padStart(2, '0')}</span>
              <span className="text-[#5E625D]/50">/</span>
              <span className="text-[#5E625D]">12</span>
            </div>

            <button
              type="button"
              onClick={nextRegion}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-[#D9DDD6] text-[#171918] hover:bg-[#163B32] hover:text-[#F8F6F0] hover:border-[#163B32] transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Next Region"
              aria-label="Next Region"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Centerpiece 2-Column Interactive Showcase */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
          
          {/* Left: 3D Photorealistic Interactive Earth Globe (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center">
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
            className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-7 border border-[#D9DDD6] shadow-xl flex flex-col gap-4 backdrop-blur-md transition-all duration-300"
          >
            {/* Stage Badge & Live Local Clock */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E9E4] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#C96F4A] bg-[#C96F4A]/10 px-3 py-1 rounded-full">
                  STAGE {String(activeRegion.id).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#163B32]">
                  {activeRegion.code}
                </span>
              </div>

              {/* Live Local Clock at Hub */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F6F0] border border-[#E6E9E4] text-[11px] font-mono text-[#163B32]">
                <Clock className="w-3.5 h-3.5 text-[#C96F4A]" />
                <span className="font-bold" suppressHydrationWarning>{localTime || '--:--:--'}</span>
                <span className="text-[#5E625D] text-[10px]">({activeRegion.utcOffset})</span>
              </div>
            </div>

            {/* Region Title & Ethical Inquiry Question */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#5E625D]">
                <MapPin className="w-3.5 h-3.5 text-[#C96F4A]" />
                <span>{activeRegion.city}</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#171918] leading-snug tracking-tight">
                “{activeRegion.question}”
              </h3>
            </div>

            {/* Producer Profile */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-[#F8F6F0] border border-[#E6E9E4] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              
              {/* Producer Portrait */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border border-[#D9DDD6] bg-white shadow-sm group">
                <Image
                  src={producer.img}
                  alt={producer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="80px"
                />
              </div>

              {/* Producer Details */}
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <div>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-[#163B32]">
                    {producer.name}
                  </h4>
                  <p className="text-[11px] font-mono text-[#C96F4A] font-semibold uppercase tracking-wider">
                    {producer.role}
                  </p>
                </div>

                <p className="text-xs text-[#5E625D] leading-relaxed">
                  {producer.bio}
                </p>

                {/* Thematic Tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                  {producer.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-white border border-[#D9DDD6] text-[10px] font-mono text-[#171918]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hub Details & Next Hub Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-[#5E625D]">
                Hub: <strong>{activeRegion.hubs}</strong>
              </span>

              <button
                type="button"
                onClick={nextRegion}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#163B32] hover:text-[#C96F4A] transition-colors cursor-pointer group"
              >
                <span>Next Hub</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Relay Progress Bar & Region Pills */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-2 pt-1">
          
          {/* Continuous Scroll Progress Track */}
          <div className="w-full h-1.5 bg-[#E6E9E4] rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#163B32] via-[#C96F4A] to-[#D8B56A] transition-all duration-150 rounded-full"
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
