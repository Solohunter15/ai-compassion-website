'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, MapPin, Users, Globe, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { COORDINATORS } from '@/data/coordinatorsData';

export default function CoordinatorsSection() {
  return (
    <section
      id="coordinators"
      className="relative z-10 w-full bg-[#FFFFFF] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#163B32] uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Official Global Operations &amp; Regional Coordinators</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Regional Coordinators &amp; Team
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Official coordination leads responsible for regional producer alignment, session hosting, ambassador onboarding, and global broadcast operations.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified official team roster for global forum ambassadors</span>
          </div>
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 w-full">
          {COORDINATORS.map((coordinator, idx) => (
            <div
              key={idx}
              className="w-full bg-[#FAFCFA] rounded-3xl border border-emerald-100/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group text-left relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-200 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-[#22C55E]" />
                    <span>{coordinator.role}</span>
                  </span>

                  <span className="w-2 h-2 rounded-full bg-[#22C55E] ring-4 ring-emerald-100" title="Verified Active Member" />
                </div>

                {/* Headshot Portrait */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-emerald-50 shadow-xs border-2 border-emerald-200 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={coordinator.img}
                      alt={coordinator.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-tight">
                      {coordinator.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[#C96F4A] font-semibold mt-0.5">
                      {coordinator.role}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {coordinator.description}
                </p>

                {/* Assigned Regions */}
                <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100/80 flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#163B32]" />
                    <span>Assigned Regions / Scope:</span>
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {coordinator.regions.map((reg, rIdx) => (
                      <span key={rIdx} className="text-xs font-semibold text-slate-800 leading-tight">
                        • {reg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Producers */}
                {coordinator.producers && coordinator.producers.length > 0 && (
                  <div className="p-3 bg-white rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C96F4A] flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#C96F4A]" />
                      <span>Coordinating Producers:</span>
                    </span>
                    <span className="text-xs font-medium text-slate-700 leading-tight">
                      {coordinator.producers.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Tag Pills */}
              {coordinator.tags && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                  {coordinator.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#F8F6F0] border border-[#D9DDD6] text-[10px] font-mono text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
