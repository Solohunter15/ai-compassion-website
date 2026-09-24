'use client';

import Image from 'next/image';
import s1 from '@/../public/usa.webp';
import s2 from '@/../public/ai.webp';
import s3 from '@/../public/lm.webp';
import s4 from '@/../public/goi-peace.svg';
import s5 from '@/../public/health.webp';
import s6 from '@/../public/be.webp';

import p1 from '@/../public/pdie.webp';
import p2 from '@/../public/mulearn logo.png';
import p3 from '@/../public/purple.png';
import p4 from '@/../public/logo-globalai.webp';
import p5 from '@/../public/650.png';
import p6 from '@/../public/intuitio.jpg';
import p7 from '@/../public/ism.jpg';

const SPONSORS = [
  { img: s1, name: 'USA Pavilion Expo 2025 Osaka' },
  { img: s2, name: 'AI+Compassion' },
  { img: s3, name: 'Link and Motivation Group' },
  { img: s4, name: 'Goi Peace Foundation' },
  { img: s5, name: 'HEALTHSPAN X' },
  { img: s6, name: 'Be. ~scubed~' },
];

const PARTNERS = [
  { img: p1, name: 'PDIE Group' },
  { img: p2, name: 'μLearn' },
  { img: p3, name: 'The Purple Movement' },
  { img: p4, name: 'Global AI Alliance' },
  { img: p5, name: '650ai LAB' },
  { img: p6, name: 'INTUITIO VENTURES' },
  { img: p7, name: 'ism.' },
];

export default function PartnersAndSponsors() {
  const sponsorsMarquee = [...SPONSORS, ...SPONSORS, ...SPONSORS];
  const partnersMarquee = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners-sponsors"
      className="relative z-10 w-full bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12 sm:gap-16">
        
        {/* Centered Main Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#163B32] uppercase tracking-widest shadow-2xs">
            <span>Global Ecosystem</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Partners &amp; Sponsors
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light max-w-xl leading-relaxed">
            Co-creating the 24-hour global dialogue with visionary foundations, academic institutions, and transformative ecosystem partners.
          </p>
        </div>

        {/* Unified Dual Marquee Showcase */}
        <div className="w-full flex flex-col gap-8 sm:gap-10">
          
          {/* Row 1: Strategic Partners (Moving Left) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 sm:px-6">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#163B32] bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/60">
                Strategic Partners
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                Global Network
              </span>
            </div>

            <div className="relative w-full overflow-hidden py-3 bg-[#F9FAF8] rounded-2xl border border-emerald-100/80 group">
              {/* Left & Right Edge Fades */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F9FAF8] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#F9FAF8] to-transparent z-10 pointer-events-none" />

              {/* Infinite Marquee Track (Left) */}
              <div className="flex items-center gap-10 sm:gap-16 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
                {partnersMarquee.map((partner, idx) => (
                  <div
                    key={`partner-${idx}`}
                    className="flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 shrink-0"
                  >
                    <div className="relative h-11 sm:h-14 w-28 sm:w-36 flex items-center justify-center">
                      <Image
                        src={partner.img}
                        alt={partner.name}
                        fill
                        className="object-contain transition-opacity duration-300"
                        sizes="(max-width: 640px) 112px, 144px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Sponsors & Supporters (Moving Right) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 sm:px-6">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C96F4A] bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200/60">
                Sponsors &amp; Supporters
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                Co-Creators
              </span>
            </div>

            <div className="relative w-full overflow-hidden py-3 bg-[#F9FAF8] rounded-2xl border border-emerald-100/80 group">
              {/* Left & Right Edge Fades */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F9FAF8] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#F9FAF8] to-transparent z-10 pointer-events-none" />

              {/* Infinite Marquee Track (Right) */}
              <div className="flex items-center gap-12 sm:gap-18 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
                {sponsorsMarquee.map((sponsor, idx) => (
                  <div
                    key={`sponsor-${idx}`}
                    className="flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 shrink-0"
                  >
                    <div className="relative h-12 sm:h-16 w-32 sm:w-44 flex items-center justify-center">
                      <Image
                        src={sponsor.img}
                        alt={sponsor.name}
                        fill
                        className="object-contain transition-opacity duration-300"
                        sizes="(max-width: 640px) 128px, 176px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
