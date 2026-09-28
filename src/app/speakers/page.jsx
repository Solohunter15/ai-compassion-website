'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Mic, Search, Sparkles, X, UserCheck } from 'lucide-react';
import { SPEAKERS } from '@/data/speakersData';

export default function SpeakersListPage() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpeakers = SPEAKERS.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = s.name.toLowerCase().includes(q);
    const matchTitle = s.title?.toLowerCase().includes(q);
    const matchTags = s.tags?.some((t) => t.toLowerCase().includes(q));
    return matchName || matchTitle || matchTags;
  });

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
            <Mic className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Confirmed Speakers</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Speakers &amp; Global Contributors
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Meet the international thought leaders, AI scientists, philosophers, roboticists, and artists contributing to the 24-hour planetary dialogue. Click any speaker to view their bio.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md relative mt-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search speakers by name, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full border border-[#D9DDD6] bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#163B32]/30 shadow-2xs"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
          {filteredSpeakers.map((speaker) => (
            <div
              key={speaker.slug}
              onClick={() => setSelectedSpeaker(speaker)}
              className="w-full bg-white hover:bg-[#FAFCFA] rounded-2xl sm:rounded-3xl border border-[#E2E6DF] hover:border-[#163B32]/40 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between group cursor-pointer text-center relative overflow-hidden"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <Image
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 120px"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#163B32] bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full mx-auto">
                    Speaker
                  </span>

                  <h2 className="font-editorial text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-snug line-clamp-2">
                    {speaker.name}
                  </h2>

                  {speaker.title && (
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight line-clamp-2 mt-0.5">
                      {speaker.title}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-center">
                <span className="text-[10px] font-mono text-emerald-800 font-semibold group-hover:text-[#C96F4A] transition-colors">
                  View Full Bio &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bio Modal with Top Left Back Arrow Button */}
      {selectedSpeaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation Bar with Back Arrow */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#163B32] text-white border-b border-emerald-800">
              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#163B32] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="font-mono text-xs text-emerald-200 tracking-widest uppercase hidden sm:inline">
                Speaker Profile
              </span>

              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
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
                    src={selectedSpeaker.img}
                    alt={selectedSpeaker.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 112px, 144px"
                  />
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 flex-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-300">
                    Confirmed Speaker
                  </span>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#163B32]">
                    {selectedSpeaker.name}
                  </h3>

                  {selectedSpeaker.title && (
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                      {selectedSpeaker.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Talk / Keynote Presentation (if available) */}
              {selectedSpeaker.talkTitle && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C96F4A] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Keynote Talk</span>
                  </div>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {selectedSpeaker.talkTitle}
                  </h4>
                  {selectedSpeaker.talkDescription && (
                    <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed pt-1">
                      {selectedSpeaker.talkDescription.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedSpeaker.bio && selectedSpeaker.bio.trim() && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-1 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#22C55E]" />
                    <span>Biography &amp; Insights</span>
                  </h4>
                  
                  {selectedSpeaker.bio.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {selectedSpeaker.tags && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  {selectedSpeaker.tags.map((tag) => (
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
