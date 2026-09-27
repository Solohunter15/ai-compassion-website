'use client';

import { useState } from 'react';
import { Compass, Clock, MapPin, User, Sparkles, ChevronRight, Users, Mic } from 'lucide-react';
import { SCHEDULE_MATRIX } from '@/components/scheduleSection/scheduleData';

export default function SegmentsSection() {
  const [selectedSegment, setSelectedSegment] = useState(SCHEDULE_MATRIX[0]);

  return (
    <section
      id="segments"
      className="relative z-10 w-full bg-[#F8F6F0] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            12 World Segments &amp; Global Ceremonies
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            A continuous unbroken 24-hour planetary dialogue traveling across timezones, indigenous traditions, frontier laboratories, and community action initiatives.
          </p>
        </div>

        {/* 2-Column Showcase: Interactive Segments List & Deep Detail View */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Scrollable Interactive Segments List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
            {SCHEDULE_MATRIX.map((seg, idx) => {
              const isSelected = selectedSegment.id === seg.id;
              return (
                <div
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left ${
                    isSelected
                      ? 'bg-white border-[#163B32] shadow-md ring-2 ring-emerald-200'
                      : 'bg-white/80 hover:bg-white border-[#E2E6DF] hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        seg.isSpecial
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : isSelected
                          ? 'bg-[#163B32] text-white'
                          : 'bg-emerald-50 text-[#163B32] border border-emerald-200'
                      }`}
                    >
                      {seg.isSpecial ? <Sparkles className="w-4 h-4" /> : String(idx).padStart(2, '0')}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-editorial text-sm font-bold text-slate-900 truncate">
                        {seg.segment}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 truncate">
                        {seg.region} • {seg.times.UTC} UTC
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#163B32] translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right: Rich Selected Segment Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9DDD6] shadow-xl flex flex-col gap-6 sticky top-24">
            
            {/* Header */}
            <div className="flex flex-col gap-2 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-200">
                  {selectedSegment.blockLabel || selectedSegment.blockNumber} • {selectedSegment.segment}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#C96F4A] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedSegment.times.UTC} UTC</span>
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163B32] leading-tight">
                {selectedSegment.segment}
              </h3>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Regional Coverage: <strong>{selectedSegment.region}</strong></span>
              </div>
            </div>

            {/* Segment Theme */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C96F4A]">
                Segment Focus &amp; Theme
              </span>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                &ldquo;{selectedSegment.theme}&rdquo;
              </p>
            </div>

            {/* Regional Producers Strip */}
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E2E6DF] flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#163B32]" />
                <span>Regional Producers</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {selectedSegment.producers?.join(', ') || 'Spot Available'}
              </p>
            </div>

            {/* Multi-Timezone Table Strip */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Live Broadcast Broadcast Times
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block">JST (Kyoto)</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSegment.times.JST}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block">IST (Mumbai)</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSegment.times.IST}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block">BST (London)</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSegment.times.BST}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block">EDT (New York)</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSegment.times.EDT}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
