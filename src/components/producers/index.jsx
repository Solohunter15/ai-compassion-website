'use client';

import Image from 'next/image';

const PRODUCERS = [
  {
    name: 'Jibu Elias',
    role: 'Regional Producer - South Asia',
    img: '/jibu.png',
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
      className="relative z-10 w-full bg-[#FFFFFF] py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-14 sm:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554]">
            Our Producers
          </h2>
        </div>

        {/* Clean Responsive Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {PRODUCERS.map((producer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center text-center gap-4 group"
            >
              {/* Regular sized square image */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-slate-100 shadow-xs group-hover:scale-102 transition-transform duration-300">
                <Image
                  src={producer.img}
                  alt={producer.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 144px, 160px"
                />
              </div>

              {/* Producer Name & Role */}
              <div className="flex flex-col items-center gap-1 mt-1">
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#1E293B] group-hover:text-[#172554] transition-colors">
                  {producer.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
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
