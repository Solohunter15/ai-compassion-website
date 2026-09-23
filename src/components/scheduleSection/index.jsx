'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  Globe,
  Search,
  CheckCircle2,
  Table as TableIcon,
  GitCommit,
  Sparkles,
  ChevronRight,
  Radio,
} from 'lucide-react';
import {
  TIMEZONES,
  SCHEDULE_MATRIX,
} from './scheduleData';

export default function ScheduleSection() {
  const [selectedTz, setSelectedTz] = useState('UTC');
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'matrix'
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);

  const timelineContainerRef = useRef(null);

  // Find active timezone object
  const activeTzObj = TIMEZONES.find((t) => t.key === selectedTz) || TIMEZONES[0];

  // Filter schedule based on search query
  const filteredBlocks = SCHEDULE_MATRIX.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchRegion = b.region.toLowerCase().includes(q);
    const matchHub = b.hub.toLowerCase().includes(q);
    return matchRegion || matchHub;
  });

  // Scroll Progress Tracker for the Storytelling Timeline
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const container = timelineContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start filling when container enters middle of viewport
      const startOffset = windowHeight * 0.75;
      const totalScrollable = rect.height - windowHeight * 0.5;

      const currentScroll = startOffset - rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      
      setScrollProgress(progress);

      // Determine active block index based on progress
      if (filteredBlocks.length > 0) {
        const rawIdx = Math.floor(progress * filteredBlocks.length);
        const clampedIdx = Math.min(filteredBlocks.length - 1, Math.max(0, rawIdx));
        setActiveNodeIdx(clampedIdx);
      }
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
  }, [filteredBlocks.length]);

  return (
    <section
      id="schedule"
      className="relative z-10 w-full bg-[#FFFFFF] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono font-bold text-[#8B5083] uppercase tracking-widest shadow-2xs">
            <Radio className="w-3.5 h-3.5 text-[#C96F4A] animate-pulse" />
            <span>24-Hour Continuous Journey</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#8B5083] leading-tight">
            Complete 24-Hour Schedule
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
            AI + Compassion Global Forum (24-Hour Relay, Oct 2–3, 2026). Times update automatically with your chosen timezone.
          </p>
        </div>

        {/* Timezone Selector Buttons Row */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center justify-center min-w-max gap-2 sm:gap-3 px-2 mx-auto">
              {TIMEZONES.map((tz) => {
                const isActive = selectedTz === tz.key;
                return (
                  <button
                    key={tz.key}
                    type="button"
                    onClick={() => setSelectedTz(tz.key)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#8B5083] text-white border-2 border-[#8B5083] shadow-md shadow-purple-900/10'
                        : 'bg-white text-[#8B5083] border-2 border-[#8B5083]/70 hover:border-[#8B5083] hover:bg-[#8B5083]/5'
                    }`}
                  >
                    {tz.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control Bar: View Mode Switcher & Search Bar */}
          <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-purple-100 pb-4">
            <div className="flex items-center gap-2 bg-purple-50/70 p-1 rounded-xl border border-purple-200/60">
              <button
                type="button"
                onClick={() => setActiveView('timeline')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === 'timeline'
                    ? 'bg-[#8B5083] text-white shadow-xs'
                    : 'text-[#8B5083] hover:text-[#5E2B57]'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5 rotate-90" />
                <span>Storytelling Timeline</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('matrix')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === 'matrix'
                    ? 'bg-[#8B5083] text-white shadow-xs'
                    : 'text-[#8B5083] hover:text-[#5E2B57]'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Master Matrix</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search region, hub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-purple-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B5083]/30"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: STORYTELLING TIMELINE VIEW (Animated Scroll-Driven Progression) */}
        {/* ========================================================================= */}
        {activeView === 'timeline' && (
          <div
            ref={timelineContainerRef}
            className="w-full max-w-5xl mx-auto flex flex-col gap-12 py-6 relative"
          >
            {/* Stage Progress HUD Bar */}
            <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-50 via-amber-50/50 to-purple-50 border border-purple-100 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5083] animate-ping" />
                <span className="font-mono text-xs font-bold text-[#8B5083] uppercase tracking-wider">
                  Stage {String(activeNodeIdx + 1).padStart(2, '0')} of {filteredBlocks.length}
                </span>
                <span className="hidden sm:inline text-xs text-slate-500">
                  • {filteredBlocks[activeNodeIdx]?.region.replace(/Block \d+ — /, '')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-36 h-2 bg-purple-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8B5083] via-[#C96F4A] to-[#D8B56A] transition-all duration-150 rounded-full"
                    style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] font-bold text-[#8B5083]">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>

            {/* Vertical Timeline Structure */}
            <div className="relative w-full max-w-4xl mx-auto pt-4 pb-8">
              
              {/* Central Background Guide Line */}
              <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-1 bg-purple-100 -translate-x-1/2 rounded-full z-0" />

              {/* Dynamic Animated Scroll Progress Line */}
              <div
                className="absolute left-5 md:left-1/2 top-4 w-1 bg-gradient-to-b from-[#8B5083] via-[#C96F4A] to-[#D8B56A] -translate-x-1/2 rounded-full z-0 transition-all duration-75 shadow-sm shadow-purple-500/20"
                style={{ height: `${scrollProgress * 100}%` }}
              >
                {/* Glowing Leading Orb at Tip of Progress Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#C96F4A] ring-4 ring-[#C96F4A]/30 shadow-lg shadow-[#C96F4A]/50 animate-pulse" />
              </div>

              {/* Timeline Items List */}
              <div className="flex flex-col gap-10 sm:gap-14">
                {filteredBlocks.map((block, idx) => {
                  const isEven = idx % 2 === 0;
                  const timeVal = block.times[selectedTz] || block.times.UTC;
                  const isSpecial = block.isSpecial;
                  const isPassed = idx <= activeNodeIdx;
                  const isCurrent = idx === activeNodeIdx;

                  return (
                    <div
                      key={block.id}
                      className={`relative flex items-start gap-6 md:gap-0 transition-all duration-500 ${
                        isEven
                          ? 'md:flex-row'
                          : 'md:flex-row-reverse'
                      } ${isPassed ? 'opacity-100' : 'opacity-70'}`}
                    >
                      {/* Content Box */}
                      <div
                        className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                          isEven
                            ? 'md:pr-12 md:text-right'
                            : 'md:pl-12 md:text-left'
                        }`}
                      >
                        <div
                          className={`flex flex-col gap-2.5 rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                            isCurrent
                              ? 'bg-white border-[#8B5083] shadow-xl shadow-purple-900/10 scale-[1.02] ring-2 ring-purple-200'
                              : isSpecial
                              ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                              : 'bg-[#FAF8FC] hover:bg-white border-purple-100/90 shadow-2xs hover:shadow-md'
                          }`}
                        >
                          {/* Time & Stage Header Pill */}
                          <div
                            className={`flex flex-wrap items-center gap-2 ${
                              isEven ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            <span className="font-mono text-xs font-bold text-[#8B5083] bg-purple-100/80 px-2.5 py-0.5 rounded-full">
                              {timeVal} {selectedTz}
                            </span>

                            {isSpecial && (
                              <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Special Block
                              </span>
                            )}
                          </div>

                          {/* Block Title / Region */}
                          <h4 className="font-editorial text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug">
                            {block.region.replace(/Block \d+ — /, '')}
                          </h4>

                          {/* Hub Tag */}
                          <div
                            className={`flex items-center gap-1.5 ${
                              isEven ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            <span className="text-xs font-semibold text-[#8B5083] flex items-center gap-1">
                              <Globe className="w-3 h-3 text-[#C96F4A]" />
                              <span>{block.hub}</span>
                            </span>
                          </div>

                          {/* Speakers & Moderators Section if available */}
                          {(block.moderators?.length > 0 || block.speakers?.length > 0) && (
                            <div className="pt-3 border-t border-purple-100/70 flex flex-col gap-1.5 mt-1 text-xs text-slate-600">
                              {block.moderators?.length > 0 && (
                                <p className="font-medium text-[#8B5083]">
                                  Moderator: {block.moderators.join(', ')}
                                </p>
                              )}
                              {block.speakers?.length > 0 && (
                                <p className="text-slate-500 line-clamp-2">
                                  Speakers: {block.speakers.slice(0, 4).join(', ')}
                                  {block.speakers.length > 4 ? ` +${block.speakers.length - 4} more` : ''}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Center Milestone Node (Illuminates & Scales on Scroll) */}
                      <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-sm ${
                            isCurrent
                              ? 'bg-[#C96F4A] text-white ring-4 ring-orange-200 scale-125 shadow-lg shadow-orange-500/30'
                              : isPassed
                              ? 'bg-[#8B5083] text-white ring-4 ring-purple-100 scale-105'
                              : 'bg-white text-purple-900 border-2 border-purple-200 scale-95'
                          }`}
                        >
                          {isSpecial ? (
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          ) : (
                            <span>{String(idx + 1).padStart(2, '0')}</span>
                          )}
                        </div>
                      </div>

                      {/* Empty Spacing column on opposite side for desktop alternation */}
                      <div className="hidden md:block w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>

            {filteredBlocks.length === 0 && (
              <div className="w-full p-12 text-center text-slate-500 bg-purple-50/50 rounded-2xl border border-purple-200">
                No sessions found matching &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: MASTER MATRIX TABLE (Cross-Timezone Full Grid) */}
        {/* ========================================================================= */}
        {activeView === 'matrix' && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-2xl border border-purple-200 shadow-md bg-white">
              <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
                {/* Purple Table Header */}
                <thead>
                  <tr className="bg-[#8B5083] text-white font-bold tracking-wide">
                    <th className="py-3.5 px-4 sticky left-0 bg-[#8B5083] z-10 min-w-[240px] border-r border-purple-800">
                      Region
                    </th>
                    {TIMEZONES.map((tz) => (
                      <th
                        key={tz.key}
                        onClick={() => setSelectedTz(tz.key)}
                        className={`py-3.5 px-3 text-center cursor-pointer transition-colors ${
                          selectedTz === tz.key
                            ? 'bg-[#703669] text-amber-200 font-black ring-1 ring-amber-300/40'
                            : 'hover:bg-[#7D4376]'
                        }`}
                        title={tz.city}
                      >
                        {tz.key}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-purple-100">
                  {SCHEDULE_MATRIX.map((row, idx) => {
                    const isSpecial = row.isSpecial;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors duration-150 ${
                          isSpecial
                            ? 'bg-amber-50/70 hover:bg-amber-100/70 font-semibold'
                            : idx % 2 === 0
                            ? 'bg-[#FAF8FC] hover:bg-[#F3EBF7]'
                            : 'bg-white hover:bg-[#FAF8FC]'
                        }`}
                      >
                        {/* Region Name */}
                        <td
                          className={`py-3 px-4 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 z-10 ${
                            isSpecial
                              ? 'bg-amber-50 text-[#78350F]'
                              : idx % 2 === 0
                              ? 'bg-[#FAF8FC]'
                              : 'bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSpecial && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            )}
                            <span>{row.region}</span>
                          </div>
                        </td>

                        {/* Timezone Columns */}
                        {TIMEZONES.map((tz) => {
                          const timeVal = row.times[tz.key] || '—';
                          const isHighlightedCol = selectedTz === tz.key;

                          return (
                            <td
                              key={tz.key}
                              className={`py-3 px-3 text-center text-[11px] whitespace-nowrap ${
                                isHighlightedCol
                                  ? 'bg-purple-100 font-bold text-[#8B5083]'
                                  : 'text-slate-700'
                              }`}
                            >
                              {timeVal}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
              <span>* Click any timezone column to focus.</span>
              <span className="font-mono text-[#8B5083] font-bold">
                Selected: {activeTzObj.label} ({activeTzObj.city})
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
