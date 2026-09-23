'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Globe,
  Search,
  CheckCircle2,
  Table as TableIcon,
  GitCommit,
  Sparkles,
} from 'lucide-react';
import {
  TIMEZONES,
  SCHEDULE_MATRIX,
} from './scheduleData';

export default function ScheduleSection() {
  const [selectedTz, setSelectedTz] = useState('UTC');
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'matrix'
  const [searchQuery, setSearchQuery] = useState('');

  // Find active timezone object
  const activeTzObj = TIMEZONES.find((t) => t.key === selectedTz) || TIMEZONES[0];

  // Filter schedule based on search query
  const filteredBlocks = SCHEDULE_MATRIX.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchRegion = b.region.toLowerCase().includes(q);
    const matchHub = b.hub.toLowerCase().includes(q);
    const matchMods = b.moderators?.some((m) => m.toLowerCase().includes(q));
    const matchSpeakers = b.speakers?.some((s) => s.toLowerCase().includes(q));
    return matchRegion || matchHub || matchMods || matchSpeakers;
  });

  return (
    <section
      id="schedule"
      className="relative z-10 w-full bg-[#FFFFFF] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-4xl mx-auto">
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
                <span>Timeline View</span>
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
                placeholder="Search speaker, region, hub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-purple-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B5083]/30"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: TIMELINE VIEW */}
        {/* ========================================================================= */}
        {activeView === 'timeline' && (
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 py-6">

            {/* MAIN RELAY TIMELINE: Alternating Global 24-Hour Schedule (12 Regions + Ceremonies) */}
            <div className="flex flex-col items-center gap-12">
              <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#8B5083] text-center">
                Global 24-Hour Relay Schedule
              </h3>

              {/* Vertical Timeline Structure */}
              <div className="relative w-full max-w-4xl mx-auto">
                {/* Continuous Central Vertical Purple Line */}
                <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-[#8B5083] -translate-x-1/2 z-0" />

                <div className="flex flex-col gap-12 sm:gap-16">
                  {filteredBlocks.map((block, idx) => {
                    const isEven = idx % 2 === 0;
                    const timeVal = block.times[selectedTz] || block.times.UTC;
                    const isSpecial = block.isSpecial;

                    return (
                      <div
                        key={block.id}
                        className={`relative flex items-start gap-6 md:gap-0 ${
                          isEven
                            ? 'md:flex-row'
                            : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Content Box (Left or Right on desktop, aligned on right of line on mobile) */}
                        <div
                          className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                            isEven
                              ? 'md:pr-12 md:text-right'
                              : 'md:pl-12 md:text-left'
                          }`}
                        >
                          <div
                            className={`flex flex-col gap-2 rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                              isSpecial
                                ? 'bg-amber-50/70 border border-amber-200/80 shadow-xs'
                                : 'bg-[#FAF8FC] hover:bg-white border border-purple-100/90 shadow-2xs hover:shadow-md'
                            }`}
                          >
                            {/* Time Header */}
                            <div
                              className={`text-sm sm:text-base font-bold text-slate-900 ${
                                isEven ? 'md:justify-end' : 'md:justify-start'
                              } flex items-center gap-2`}
                            >
                              <span className="text-[#8B5083] font-mono">
                                {timeVal} {selectedTz}
                              </span>
                            </div>

                            {/* Block Title / Region */}
                            <h4
                              className={`text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug`}
                            >
                              {block.region.replace(/Block \d+ — /, '')}
                            </h4>

                            {/* Hub tag */}
                            <span className="text-xs font-semibold text-[#8B5083]">
                              {block.hub}
                            </span>

                            {/* Bulleted List of Moderators and Speakers */}
                            <div className="pt-3 border-t border-purple-100/70 flex flex-col gap-1.5 mt-1">
                              {/* Moderators */}
                              {block.moderators?.map((mod, mIdx) => (
                                <div
                                  key={mIdx}
                                  className={`text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2 ${
                                    isEven ? 'md:justify-end' : 'md:justify-start'
                                  }`}
                                >
                                  <span className="text-[#8B5083] font-black text-sm">•</span>
                                  <span>{mod}</span>
                                </div>
                              ))}

                              {/* Speakers */}
                              {block.speakers?.map((speaker, sIdx) => (
                                <div
                                  key={sIdx}
                                  className={`text-xs sm:text-sm text-slate-700 flex items-center gap-2 ${
                                    isEven ? 'md:justify-end' : 'md:justify-start'
                                  }`}
                                >
                                  <span className="text-[#8B5083] font-black text-sm">•</span>
                                  <span>{speaker}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Center Purple Dot sitting on the central line */}
                        <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                          <div
                            className={`w-4 h-4 rounded-full bg-[#8B5083] ring-4 ${
                              isSpecial ? 'ring-amber-200 bg-amber-600' : 'ring-purple-100'
                            }`}
                          />
                        </div>

                        {/* Empty spacing column for other side on desktop */}
                        <div className="hidden md:block w-1/2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {filteredBlocks.length === 0 && (
              <div className="w-full p-12 text-center text-slate-500 bg-purple-50/50 rounded-2xl border border-purple-200">
                No sessions or speakers found matching &ldquo;{searchQuery}&rdquo;.
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
