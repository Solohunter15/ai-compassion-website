'use client';

import { useState } from 'react';
import Image from 'next/image';

const PRODUCERS = [
  // Producers
  {
    name: 'Christina Gerakiteys',
    role: 'Regional Producer — Oceania & Pacific',
    img: '/christina.jpg',
    category: 'producer',
  },
  {
    name: 'Jun Suto',
    role: 'Regional Producer — Kyoto',
    img: '/jun.png',
    category: 'producer',
  },
  {
    name: 'Aditi Singh',
    role: 'Regional Producer — Southeast Asia (Youth Hub)',
    img: '/aditi.jpg',
    category: 'producer',
  },
  {
    name: 'Deepu S Nath',
    role: 'Regional Producer — South Asia',
    img: '/deepu.png',
    category: 'producer',
  },
  {
    name: 'Walied Albasheer',
    role: 'Regional Producer — Middle East, Caucasus & Central Asia',
    img: '/walied.jpg',
    category: 'producer',
  },
  {
    name: 'Dr. Lee Kironget',
    role: 'Regional Producer — Africa & Central Europe',
    img: '/lee.jpg',
    category: 'producer',
  },
  {
    name: 'Fabrizio Gramuglio',
    role: 'Regional Producer — UK, Ireland, Iberia & West Africa',
    img: '/fabrizio.jpg',
    category: 'producer',
  },
  {
    name: 'Julieta Reyes',
    role: 'Regional Producer — Eastern & Southern South America, Caribbean',
    img: '/julieta.jpg',
    category: 'producer',
  },
  {
    name: 'Ani Chahal Honan',
    role: 'Regional Producer — Western North America',
    img: '/ani.jpg',
    category: 'producer',
  },

  // Co-Producers & Regional Leads
  {
    name: 'Edith Öller',
    role: 'Co-Producer — UK, Ireland, Iberia & West Africa',
    img: '/edith-oller.jpg',
    category: 'co-producer',
  },
  {
    name: 'Taikyo Murakami',
    role: 'Co-Producer — Kyoto',
    img: '/murakami.webp',
    category: 'co-producer',
  },
  {
    name: 'Stephin Kalani',
    role: 'Regional Lead — Hawaiʻi, Alaska & Pacific Islands',
    img: '/stephin.webp',
    category: 'co-producer',
  },

  // Regional Coordinators
  {
    name: 'Rasha & Jibu',
    role: 'Regional Coordinators — Kyoto',
    img: '/jibu.png',
    category: 'coordinator',
  },
  {
    name: 'Jeniffer Jerald JN',
    role: 'Regional Coordinator — Oceania & Southeast Asia',
    img: '/jean.png',
    category: 'coordinator',
  },
  {
    name: 'Kavya',
    role: 'Regional Coordinator — Northeast Asia & South Asia',
    img: '/akshaya.png',
    category: 'coordinator',
  },
  {
    name: 'Ann Rose Mathew',
    role: 'Regional Coordinator — Middle East & Western North America',
    img: '/anuka.png',
    category: 'coordinator',
  },
  {
    name: 'Meera',
    role: 'Regional Coordinator — Africa, Central Europe & Eastern North America',
    img: '/naomi.png',
    category: 'coordinator',
  },
  {
    name: 'Adithya Baiju',
    role: 'Regional Coordinator — UK, West Africa & Latin America',
    img: '/akshat.png',
    category: 'coordinator',
  },
  {
    name: 'Niya',
    role: 'Regional Coordinator — Central North America & Pacific Islands',
    img: '/dany.png',
    category: 'coordinator',
  },
];

export default function ProducersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredMembers = PRODUCERS.filter((p) => {
    if (activeTab === 'producers') return p.category === 'producer';
    if (activeTab === 'co-producers') return p.category === 'co-producer';
    if (activeTab === 'coordinators') return p.category === 'coordinator';
    return true;
  });

  return (
    <section
      id="producers"
      className="relative z-10 w-full bg-[#FFFFFF] py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#EAECE8] overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 sm:gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#163B32] uppercase tracking-wider mb-1">
            <span>Global Conveners</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#163B32]">
            Our Producers &amp; Co-Producers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg font-light">
            Meet the regional conveners, producers, co-producers, and regional coordinators orchestrating the 24-hour continuous global relay.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 bg-emerald-50/70 p-1.5 rounded-full border border-emerald-200/70">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#163B32] text-white shadow-xs'
                  : 'text-[#163B32] hover:text-[#0F2620]'
              }`}
            >
              All ({PRODUCERS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('producers')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'producers'
                  ? 'bg-[#163B32] text-white shadow-xs'
                  : 'text-[#163B32] hover:text-[#0F2620]'
              }`}
            >
              Producers ({PRODUCERS.filter((p) => p.category === 'producer').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('co-producers')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'co-producers'
                  ? 'bg-[#163B32] text-white shadow-xs'
                  : 'text-[#163B32] hover:text-[#0F2620]'
              }`}
            >
              Co-Producers ({PRODUCERS.filter((p) => p.category === 'co-producer').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coordinators')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'coordinators'
                  ? 'bg-[#163B32] text-white shadow-xs'
                  : 'text-[#163B32] hover:text-[#0F2620]'
              }`}
            >
              Coordinators ({PRODUCERS.filter((p) => p.category === 'coordinator').length})
            </button>
          </div>
        </div>

        {/* Robust Responsive Grid - Zero Overlap on All Devices */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 w-full max-w-6xl mx-auto">
          {filteredMembers.map((producer, idx) => (
            <div
              key={idx}
              className="w-full bg-white rounded-2xl border border-emerald-100/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 sm:p-5 flex flex-col items-center text-center gap-2.5 group overflow-hidden"
            >
              {/* Portrait Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-xs group-hover:scale-103 transition-transform duration-300 border border-emerald-100 shrink-0">
                {producer.img ? (
                  <Image
                    src={producer.img}
                    alt={producer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#163B32]/10 via-[#F8F6F0] to-[#C9A96A]/20 text-[#163B32]">
                    <span className="font-editorial text-xl sm:text-2xl font-bold tracking-wider text-[#163B32]">
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
              <div className="flex flex-col items-center gap-1 w-full">
                <span className={`text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  producer.category === 'co-producer'
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : producer.category === 'coordinator'
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-emerald-100 text-[#163B32] border border-emerald-200'
                }`}>
                  {producer.category === 'co-producer'
                    ? 'Co-Producer'
                    : producer.category === 'coordinator'
                    ? 'Regional Coordinator'
                    : 'Producer'}
                </span>
                <h3 className="font-editorial text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#163B32] transition-colors leading-tight break-words">
                  {producer.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">
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
