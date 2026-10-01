'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, MapPin, Sparkles, X, Globe, UserCheck } from 'lucide-react';
import { PRODUCERS } from '@/data/producersData';

export default function ProducersListPage() {
  const [selectedProducer, setSelectedProducer] = useState(null);

  return (
    <main className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Navigation Bar with Back Arrow */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            Global Forum 2026
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9DDD6] text-xs font-mono font-bold text-[#163B32] uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Global Conveners</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Our Producers &amp; Co-Producers
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Meet the regional conveners and visionaries orchestrating the 24-hour continuous global relay. Click any producer to read their complete biography and leadership background.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 w-full">
          {PRODUCERS.map((producer) => (
            <Link
              key={producer.slug}
              href={`/${producer.slug}`}
              className="w-full bg-white hover:bg-[#FAFCFA] rounded-3xl border border-[#D9DDD6] hover:border-[#163B32]/40 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group cursor-pointer text-left relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      producer.type === 'co-producer' || producer.role?.toLowerCase().includes('co-producer') || producer.role?.toLowerCase().includes('mc')
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#163B32] text-white border border-[#163B32]'
                    }`}
                  >
                    {producer.role} • {producer.segment}
                  </span>

                  <span className="text-[11px] font-mono text-emerald-800 font-semibold group-hover:text-[#C96F4A] transition-colors">
                    View Bio &rarr;
                  </span>
                </div>

                {/* Portrait Image */}
                <div className="relative w-full aspect-square max-w-[140px] mx-auto rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={producer.img}
                    alt={producer.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: producer.imgPosition || 'center 20%' }}
                    sizes="(max-width: 640px) 140px, 160px"
                  />
                </div>

                {/* Name & Title */}
                <div className="flex flex-col gap-1 text-center">
                  <h2 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-snug">
                    {producer.name}
                  </h2>
                  {producer.title && (
                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                      {producer.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Full Region Box */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5 bg-emerald-50/50 -mx-2 -mb-2 p-3 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C96F4A] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C96F4A]" />
                    <span>Region</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#163B32] bg-emerald-100 px-2 py-0.5 rounded-full">
                    {producer.segment}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-snug break-words">
                  {producer.region}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Bio Modal with Top Left Back Arrow Button */}
      {selectedProducer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
          onClick={() => setSelectedProducer(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation Bar with Back Arrow */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-emerald-900 text-white border-b border-emerald-800">
              <button
                type="button"
                onClick={() => setSelectedProducer(null)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-emerald-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="font-mono text-xs text-emerald-200 tracking-widest uppercase hidden sm:inline">
                Producer Profile
              </span>

              <button
                type="button"
                onClick={() => setSelectedProducer(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-emerald-200">
                  <Image
                    src={selectedProducer.img}
                    alt={selectedProducer.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: selectedProducer.imgPosition || 'center 20%' }}
                    sizes="(max-width: 640px) 112px, 144px"
                  />
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        selectedProducer.category === 'co-producer'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-[#163B32] border border-emerald-300'
                      }`}
                    >
                      {selectedProducer.role}
                    </span>

                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-200">
                      Segment: {selectedProducer.segment}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163B32]">
                    {selectedProducer.name}
                  </h3>

                  {selectedProducer.title && (
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                      {selectedProducer.title}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-[#C96F4A] font-medium pt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Region: <strong>{selectedProducer.region}</strong></span>
                  </div>

                  {selectedProducer.link && (
                    <a
                      href={selectedProducer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] underline underline-offset-4 transition-colors pt-1"
                    >
                      <span>Visit IDEAZ Business Innovation</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-1 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#22C55E]" />
                  <span>Biography &amp; Leadership</span>
                </h4>
                
                {selectedProducer.bio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedProducer.tags && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  {selectedProducer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#163B32]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
