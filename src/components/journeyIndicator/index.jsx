'use client';

import { useEffect, useState } from 'react';

const JOURNEY_STAGES = [
  { id: 'hero', label: '01', title: 'Entrance' },
  { id: 'about', label: '02', title: 'Vision' },
  { id: 'pillars', label: '03', title: 'Thematic Pillars' },
  { id: 'relay', label: '04', title: '12 Regions (3D Globe)' },
  { id: 'producers', label: '05', title: 'Producers' },
  { id: 'media', label: '06', title: '2025 Highlights' },
  { id: 'schedule', label: '07', title: 'Schedule' },
  { id: 'partners-sponsors', label: '08', title: 'Partners & Sponsors' },
  { id: 'faq', label: '09', title: 'FAQ' },
  { id: 'contact', label: '10', title: 'Contact' },
];

export default function JourneyIndicator() {
  const [activeStage, setActiveStage] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total page scroll percentage
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Detect active stage
      for (const stage of JOURNEY_STAGES) {
        const el = document.getElementById(stage.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            setActiveStage(stage.id);
          }
        }
      }

      if (winScroll < 150) {
        setActiveStage('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'hero') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Story Journey Indicator"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Top micro progress counter */}
      <div className="text-[10px] font-mono tracking-widest text-[#5E625D] font-bold opacity-80 mb-1 select-none">
        {Math.round(scrollProgress)}%
      </div>

      <div className="flex flex-col items-center gap-2 relative">
        {/* Background thin connector line */}
        <div className="absolute top-2 bottom-2 w-[1.5px] bg-[#D9DDD6] left-1/2 -translate-x-1/2" />
        
        {/* Active progress fill overlay line */}
        <div
          className="absolute top-2 w-[2px] bg-gradient-to-b from-[#163B32] to-[#C96F4A] left-1/2 -translate-x-1/2 transition-all duration-150 rounded-full"
          style={{ height: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />

        {JOURNEY_STAGES.map((stage) => {
          const isActive = activeStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => scrollToSection(stage.id)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              title={`${stage.label} — ${stage.title}`}
              aria-label={`Jump to ${stage.title}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-3 py-1 text-[11px] font-medium tracking-wide uppercase bg-[#171918] text-[#F8F6F0] rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl translate-x-1 group-hover:translate-x-0">
                <span className="font-mono text-[10px] text-[#C9A96A] mr-1.5">{stage.label}</span>
                {stage.title}
              </span>

              {/* Node dot */}
              <span
                className={`relative z-10 block transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-[#163B32] ring-4 ring-[#163B32]/20 shadow-md scale-110'
                    : 'w-1.5 h-1.5 bg-[#D9DDD6] group-hover:bg-[#C96F4A] group-hover:scale-150'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
