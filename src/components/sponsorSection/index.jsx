'use client';

import Image from 'next/image';
import s1 from '@/../public/usa.webp';
import s2 from '@/../public/ai.webp';
import s3 from '@/../public/lm.webp';
import s4 from '@/../public/goi-peace.svg';
import s5 from '@/../public/health.webp';
import s6 from '@/../public/be.webp';

const SPONSORS = [
  { img: s1, name: 'USA Pavilion Expo 2025 Osaka', width: 140, height: 60 },
  { img: s2, name: 'AI+Compassion', width: 150, height: 50 },
  { img: s3, name: 'Link and Motivation Group', width: 140, height: 60 },
  { img: s4, name: 'Goi Peace Foundation', width: 130, height: 60 },
  { img: s5, name: 'HEALTHSPAN X', width: 160, height: 60 },
  { img: s6, name: 'Be. ~scubed~', width: 140, height: 50 },
];

export default function SponsorSection() {
  return (
    <section
      id="sponsors"
      className="relative z-10 w-full bg-[#FFFFFF] pt-20 pb-12 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
        
        {/* Centered Heading */}
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554] text-center">
          Our Sponsors
        </h2>

        {/* Clean Minimal Horizontal Logo Row Matching Screenshot 3 */}
        <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {SPONSORS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-14 sm:h-16 w-32 sm:w-40 flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
