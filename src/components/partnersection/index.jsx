'use client';

import Image from 'next/image';
import p1 from '@/../public/pdie.webp';
import p2 from '@/../public/mulearn logo.png';
import p3 from '@/../public/purple.png';
import p4 from '@/../public/logo-globalai.webp';
import p5 from '@/../public/650.png';
import p6 from '@/../public/intuitio.jpg';
import p7 from '@/../public/ism.jpg';

const PARTNERS = [
  { img: p1, name: 'PDIE Group' },
  { img: p2, name: 'μLearn' },
  { img: p3, name: 'The Purple Movement' },
  { img: p4, name: 'Global AI Alliance' },
  { img: p5, name: '650ai LAB' },
  { img: p6, name: 'INTUITIO VENTURES' },
  { img: p7, name: 'ism.' },
];

export function PartnerSection() {
  return (
    <section
      id="partners"
      className="relative z-10 w-full bg-[#FFFFFF] pt-12 pb-24 px-4 sm:px-6 lg:px-12 border-b border-[#EAECE8]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
        
        {/* Centered Heading */}
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554] text-center">
          Our Partners
        </h2>

        {/* Clean Minimal Horizontal Logo Row Matching Screenshot 3 */}
        <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-12 sm:h-14 w-28 sm:w-36 flex items-center justify-center">
                <Image
                  src={partner.img}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 112px, 144px"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PartnerSection;