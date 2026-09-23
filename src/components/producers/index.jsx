'use client';

import Image from 'next/image';

const PRODUCERS = [
  {
    name: 'Deepu S Nath',
    role: 'Regional Producer - South Asia',
    img: '/deepu.png',
  },
  {
    name: 'Walied Albasheer',
    role: 'Regional Producer - GCC/Europe',
    img: '/walied.jpg',
  },
  {
    name: 'Dr. Lee Kironget',
    role: 'Regional Producer - Africa',
    img: '/lee.jpg',
  },
  {
    name: 'Marques Anderson',
    role: 'Regional Producer - Latin America',
    img: '/marques.jpg',
  },
  {
    name: 'Ani Chahal Honan',
    role: 'Regional Producer - North America',
    img: '/ani.jpg',
  },
  {
    name: 'Jun Suto',
    role: 'Regional Producer - Kyoto,Osaka',
    img: '/jun.png',
  },
  {
    name: 'Christina Gerakiteys',
    role: 'Regional Producer - Oceania',
    img: '/christina.jpg',
  },
];

export default function ProducersPage() {
  return (
    <section
      id="producers"
      className="relative z-10 w-full bg-[#FFFFFF] py-18 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-10 sm:gap-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554]">
            Our Producers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Meet the regional conveners and visionaries orchestrating the 24-hour global relay.
          </p>
        </div>

        {/* Clean Compact Responsive Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {PRODUCERS.map((producer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center gap-3.5 group"
            >
              {/* Compact portrait image */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-100 shadow-xs group-hover:scale-103 transition-transform duration-300">
                <Image
                  src={producer.img}
                  alt={producer.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, 128px"
                />
              </div>

              {/* Producer Name & Role */}
              <div className="flex flex-col items-center gap-0.5">
                <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#172554] transition-colors">
                  {producer.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {producer.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
