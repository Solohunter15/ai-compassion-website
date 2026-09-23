'use client';

import Image from 'next/image';

const PRODUCERS = [
  {
    name: 'Deepu S Nath',
    role: 'Regional Producer - South Asia',
    img: null,
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
      className="relative z-10 w-full bg-[#FFFFFF] py-14 lg:py-18 px-4 sm:px-6 lg:px-8 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 sm:gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#172554]">
            Our Producers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg">
            Meet the regional conveners and visionaries orchestrating the 24-hour global relay.
          </p>
        </div>

        {/* Clean Compact Responsive Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {PRODUCERS.map((producer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col items-center text-center gap-3 group"
            >
              {/* Compact portrait image or initial monogram placeholder */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shadow-xs group-hover:scale-103 transition-transform duration-300">
                {producer.img ? (
                  <Image
                    src={producer.img}
                    alt={producer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 96px, 112px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#163B32]/10 via-[#F8F6F0] to-[#C9A96A]/20 text-[#163B32] border border-[#163B32]/10">
                    <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-wider text-[#163B32]">
                      {producer.name
                        .split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Producer Name & Role */}
              <div className="flex flex-col items-center gap-0.5">
                <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1E293B] group-hover:text-[#172554] transition-colors">
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
