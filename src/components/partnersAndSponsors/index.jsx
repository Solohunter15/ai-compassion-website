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
  { img: '/purple-logo-darktext.png', name: 'The Purple Movement', isCustom: true },
  { img: p4, name: 'Global AI Alliance' },
  { img: p5, name: '650ai LAB' },
  { img: p6, name: 'INTUITIO VENTURES' },
  { img: p7, name: 'ism.' },
];

export default function PartnersAndSponsors() {
  const sponsorsMarquee = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];
  const partnersMarquee = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners-sponsors"
      className="relative z-10 w-full bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        
        {/* Centered Main Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#163B32] leading-tight">
            Partners &amp; Sponsors
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light max-w-xl leading-relaxed">
            Co-creating the 24-hour global dialogue with visionary foundations, academic institutions, and transformative ecosystem partners.
          </p>
        </div>

        {/* Seamless Dual Marquee with 3D Depth */}
        <div className="w-full flex flex-col gap-8 sm:gap-12 [perspective:1200px]">
          
          {/* Row 1: Partners Marquee (Moving Left) - Blended directly into background */}
          <div className="relative w-full overflow-hidden py-4 group">
            {/* Left & Right Edge Fades blending smoothly with section white background */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Infinite Marquee Track (Left) */}
            <div className="flex items-center gap-12 sm:gap-20 w-max animate-marquee-left group-hover:[animation-play-state:paused] py-2">
              {partnersMarquee.map((partner, idx) => (
                <div
                  key={`partner-${idx}`}
                  className="flex items-center justify-center p-2.5 transition-all duration-500 hover:scale-110 hover:-translate-y-1.5 shrink-0 [transform-style:preserve-3d] hover:[transform:perspective(600px)_rotateY(-6deg)_rotateX(4deg)_scale(1.12)] cursor-pointer drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] hover:drop-shadow-[0_16px_24px_rgba(22,59,50,0.14)]"
                >
                  <div className="relative h-12 sm:h-16 w-32 sm:w-44 flex items-center justify-center">
                    {partner.isCustom ? (
                      <Image
                        src={partner.img}
                        alt={partner.name}
                        fill
                        className="object-contain transition-all duration-300"
                        sizes="(max-width: 640px) 128px, 176px"
                      />
                    ) : (
                      <Image
                        src={partner.img}
                        alt={partner.name}
                        fill
                        className="object-contain transition-all duration-300"
                        sizes="(max-width: 640px) 128px, 176px"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Sponsors Marquee (Moving Right) - Blended directly into background */}
          <div className="relative w-full overflow-hidden py-4 group">
            {/* Left & Right Edge Fades blending smoothly with section white background */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Infinite Marquee Track (Right) */}
            <div className="flex items-center gap-14 sm:gap-24 w-max animate-marquee-right group-hover:[animation-play-state:paused] py-2">
              {sponsorsMarquee.map((sponsor, idx) => (
                <div
                  key={`sponsor-${idx}`}
                  className="flex items-center justify-center p-2.5 transition-all duration-500 hover:scale-110 hover:-translate-y-1.5 shrink-0 [transform-style:preserve-3d] hover:[transform:perspective(600px)_rotateY(6deg)_rotateX(4deg)_scale(1.12)] cursor-pointer drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] hover:drop-shadow-[0_16px_24px_rgba(201,111,74,0.14)]"
                >
                  <div className="relative h-14 sm:h-18 w-36 sm:w-52 flex items-center justify-center">
                    <Image
                      src={sponsor.img}
                      alt={sponsor.name}
                      fill
                      className="object-contain transition-all duration-300"
                      sizes="(max-width: 640px) 144px, 208px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
