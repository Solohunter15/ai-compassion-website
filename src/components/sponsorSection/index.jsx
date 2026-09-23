'use client';

import Image from 'next/image';
import s1 from '@/../public/usa.webp';
import s2 from '@/../public/ai.webp';
import s3 from '@/../public/lm.webp';
import s4 from '@/../public/goi-peace.svg';
import s5 from '@/../public/health.webp';
import s6 from '@/../public/be.webp';

const SPONSORS = [
  { img: s1, name: 'USA Pavilion Expo 2025 Osaka' },
  { img: s2, name: 'AI+Compassion' },
  { img: s3, name: 'Link and Motivation Group' },
  { img: s4, name: 'Goi Peace Foundation' },
  { img: s5, name: 'HEALTHSPAN X' },
  { img: s6, name: 'Be. ~scubed~' },
];

export default function SponsorSection() {
  // Duplicate array 3 times for seamless infinite continuous marquee loop
  const marqueeList = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section
      id="sponsors"
      className="relative z-10 w-full bg-[#FFFFFF] pt-20 pb-12 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10">
        
        {/* Centered Heading */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#163B32] font-semibold">
            Supporters & Co-Creators
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554] text-center">
            Our Sponsors
          </h2>
        </div>

        {/* Continuous Horizontal Moving Marquee with Full Color Logos */}
        <div className="relative w-full overflow-hidden py-4 group">
          {/* Subtle Left & Right Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Track (Moving Right to Left) */}
          <div className="flex items-center gap-14 sm:gap-20 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
            {marqueeList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-3 transition-transform duration-300 hover:scale-110 shrink-0"
              >
                <div className="relative h-14 sm:h-16 w-36 sm:w-44 flex items-center justify-center">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-contain transition-opacity duration-300"
                    sizes="(max-width: 640px) 144px, 176px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
