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
  const itemsContainerRef = useRef(null);
  const firstNodeRef = useRef(null);
  const lastNodeRef = useRef(null);
  const [lineBounds, setLineBounds] = useState({ top: 24, height: 0 });

  // Dynamically calculate the precise center-to-center distance from Node 1 to Homecoming Node
  useEffect(() => {
    const updateLineBounds = () => {
      if (!itemsContainerRef.current || !firstNodeRef.current || !lastNodeRef.current) return;
      const containerRect = itemsContainerRef.current.getBoundingClientRect();
      const firstRect = firstNodeRef.current.getBoundingClientRect();
      const lastRect = lastNodeRef.current.getBoundingClientRect();

      const firstCenterY = firstRect.top + firstRect.height / 2 - containerRect.top;
      const lastCenterY = lastRect.top + lastRect.height / 2 - containerRect.top;
      const totalHeight = Math.max(0, lastCenterY - firstCenterY);

      setLineBounds({
        top: firstCenterY,
        height: totalHeight,
      });
    };

    updateLineBounds();
    window.addEventListener('resize', updateLineBounds);
    const ro = new ResizeObserver(updateLineBounds);
    if (itemsContainerRef.current) ro.observe(itemsContainerRef.current);

    return () => {
      window.removeEventListener('resize', updateLineBounds);
      ro.disconnect();
    };
  }, [filteredBlocks, selectedTz, activeView]);

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
        
        {/* Top Header in Dark Green Palette */}
        <div className="flex flex-col items-center text-center gap-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#163B32] uppercase tracking-widest shadow-2xs">
            <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            <span>24-Hour Continuous Journey</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Complete 24-Hour Schedule
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-light">
            AI + Compassion Global Forum (24-Hour Relay, Oct 2–3, 2026). Times update automatically with your chosen timezone.
          </p>
        </div>

        {/* Timezone Selector Buttons Row in Brand Dark Green */}
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
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#163B32] text-white border-2 border-[#163B32] shadow-md shadow-[#163B32]/20'
                        : 'bg-white text-[#163B32] border-2 border-[#163B32]/40 hover:border-[#163B32] hover:bg-emerald-50/50'
                    }`}
                  >
                    {tz.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control Bar: View Mode Switcher & Search Bar */}
          <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-2 bg-emerald-50/70 p-1 rounded-xl border border-emerald-200/70">
              <button
                type="button"
                onClick={() => setActiveView('timeline')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === 'timeline'
                    ? 'bg-[#163B32] text-white shadow-xs'
                    : 'text-[#163B32] hover:text-[#0F2620]'
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
                    ? 'bg-[#163B32] text-white shadow-xs'
                    : 'text-[#163B32] hover:text-[#0F2620]'
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
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-emerald-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#163B32]/30"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: STORYTELLING TIMELINE VIEW (Dark Green Theme & Perfectly Terminating Line) */}
        {/* ========================================================================= */}
        {activeView === 'timeline' && (
          <div
            ref={timelineContainerRef}
            className="w-full max-w-5xl mx-auto flex flex-col gap-12 py-6 relative"
          >
            {/* Stage Progress HUD Bar */}
            <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-emerald-50 border border-emerald-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#163B32] animate-ping" />
                <span className="font-mono text-xs font-bold text-[#163B32] uppercase tracking-wider">
                  Stage {String(activeNodeIdx + 1).padStart(2, '0')} of {filteredBlocks.length}
                </span>
                <span className="hidden sm:inline text-xs text-slate-600 font-medium">
                  • {filteredBlocks[activeNodeIdx]?.region.replace(/Block \d+ — /, '')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-36 h-2 bg-emerald-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#163B32] via-[#22C55E] to-[#C9A96A] transition-all duration-150 rounded-full"
                    style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] font-bold text-[#163B32]">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>

            {/* Vertical Timeline Structure */}
            <div className="relative w-full max-w-4xl mx-auto pt-2 pb-2">
              
              {/* Timeline Items Container with Exact Start & End Anchors */}
              <div ref={itemsContainerRef} className="relative flex flex-col gap-10 sm:gap-14">
                
                {/* Central Bounded Track: strictly from first milestone node to Homecoming closing node */}
                <div
                  className="absolute left-5 md:left-1/2 w-1 -translate-x-1/2 z-0 pointer-events-none"
                  style={{
                    top: `${lineBounds.top}px`,
                    height: `${lineBounds.height}px`,
                  }}
                >
                  {/* Background Track Guide Line */}
                  <div className="w-full h-full bg-emerald-100 rounded-full" />

                  {/* Dynamic Animated Scroll Progress Line */}
                  <div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#163B32] via-[#22C55E] to-[#C9A96A] rounded-full transition-all duration-75 shadow-sm shadow-emerald-700/20"
                    style={{ height: `${scrollProgress * 100}%` }}
                  >
                    {/* Glowing Leading Orb at Tip of Progress Line */}
                    {scrollProgress > 0.01 && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#22C55E] ring-4 ring-emerald-300/40 shadow-lg shadow-emerald-500/50 animate-pulse" />
                    )}
                  </div>
                </div>

                {filteredBlocks.map((block, idx) => {
                  const isEven = idx % 2 === 0;
                  const timeVal = block.times[selectedTz] || block.times.UTC;
                  const isSpecial = block.isSpecial;
                  const isPassed = idx <= activeNodeIdx;
                  const isCurrent = idx === activeNodeIdx;
                  const isFirst = idx === 0;
                  const isLast = idx === filteredBlocks.length - 1;

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
                              ? 'bg-white border-[#163B32] shadow-xl shadow-emerald-950/10 scale-[1.02] ring-2 ring-emerald-200'
                              : isSpecial
                              ? 'bg-amber-50/80 border-amber-200 shadow-xs'
                              : 'bg-[#F9FAF8] hover:bg-white border-emerald-100/90 shadow-2xs hover:shadow-md'
                          }`}
                        >
                          {/* Time & Stage Header Pill */}
                          <div
                            className={`flex flex-wrap items-center gap-2 ${
                              isEven ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            <span className="font-mono text-xs font-bold text-[#163B32] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
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
                            <span className="text-xs font-semibold text-[#163B32] flex items-center gap-1">
                              <Globe className="w-3 h-3 text-[#22C55E]" />
                              <span>{block.hub}</span>
                            </span>
                          </div>

                          {/* Speakers & Moderators Section if available */}
                          {(block.moderators?.length > 0 || block.speakers?.length > 0) && (
                            <div className="pt-3 border-t border-emerald-100/80 flex flex-col gap-1.5 mt-1 text-xs text-slate-600">
                              {block.moderators?.length > 0 && (
                                <p className="font-medium text-[#163B32]">
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
                      <div
                        ref={isFirst ? firstNodeRef : isLast ? lastNodeRef : null}
                        className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center"
                      >
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-sm ${
                            isCurrent
                              ? 'bg-[#163B32] text-white ring-4 ring-emerald-200 scale-125 shadow-lg shadow-emerald-900/30'
                              : isPassed
                              ? 'bg-[#2D6A4F] text-white ring-4 ring-emerald-100 scale-105'
                              : 'bg-white text-emerald-900 border-2 border-emerald-200 scale-95'
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
              <div className="w-full p-12 text-center text-slate-500 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                No sessions found matching &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: MASTER MATRIX TABLE (Dark Green Header Grid) */}
        {/* ========================================================================= */}
        {activeView === 'matrix' && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-2xl border border-emerald-200 shadow-md bg-white">
              <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
                {/* Dark Green Table Header */}
                <thead>
                  <tr className="bg-[#163B32] text-white font-bold tracking-wide">
                    <th className="py-3.5 px-4 sticky left-0 bg-[#163B32] z-10 min-w-[240px] border-r border-emerald-800">
                      Region
                    </th>
                    {TIMEZONES.map((tz) => (
                      <th
                        key={tz.key}
                        onClick={() => setSelectedTz(tz.key)}
                        className={`py-3.5 px-3 text-center cursor-pointer transition-colors ${
                          selectedTz === tz.key
                            ? 'bg-[#0F2620] text-emerald-300 font-black ring-1 ring-emerald-300/40'
                            : 'hover:bg-[#1D4A3F]'
                        }`}
                        title={tz.city}
                      >
                        {tz.key}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-emerald-100">
                  {SCHEDULE_MATRIX.map((row, idx) => {
                    const isSpecial = row.isSpecial;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors duration-150 ${
                          isSpecial
                            ? 'bg-amber-50/70 hover:bg-amber-100/70 font-semibold'
                            : idx % 2 === 0
                            ? 'bg-[#F9FAF8] hover:bg-emerald-50/40'
                            : 'bg-white hover:bg-[#F9FAF8]'
                        }`}
                      >
                        {/* Region Name */}
                        <td
                          className={`py-3 px-4 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 z-10 ${
                            isSpecial
                              ? 'bg-amber-50 text-[#78350F]'
                              : idx % 2 === 0
                              ? 'bg-[#F9FAF8]'
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
                                  ? 'bg-emerald-100 font-bold text-[#163B32]'
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
              <span className="font-mono text-[#163B32] font-bold">
                Selected: {activeTzObj.label} ({activeTzObj.city})
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
