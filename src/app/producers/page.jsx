import React from "react";
import Image from "next/image";

const producers = [
  { name: "Christina Gerakiteys", subtitle: "Regional Producer — Oceania & Pacific", img: "/christina.jpg", type: "Producer" },
  { name: "Jun Sato", subtitle: "Regional Producer — Kyoto", img: "/jun.png", type: "Producer" },
  { name: "Aditi Singh", subtitle: "Regional Producer — Southeast Asia (Youth Hub)", img: "/aditi.jpg", type: "Producer" },
  { name: "Deepu S Nath", subtitle: "Regional Producer — South Asia", img: "/deepu.png", type: "Producer" },
  { name: "Walied Albasheer", subtitle: "Regional Producer — GCC & Middle East", img: "/walied.jpg", type: "Producer" },
  { name: "Dr. Lee Kironget", subtitle: "Regional Producer — Africa", img: "/lee.jpg", type: "Producer" },
  { name: "Fabrizio Gramuglio", subtitle: "Regional Producer — UK, Ireland, Iberia & West Africa", img: "/fabrizio.jpg", type: "Producer" },
  { name: "Julieta Reyes", subtitle: "Regional Producer — Eastern & Southern South America, Caribbean", img: "/julieta.jpg", type: "Producer" },
  { name: "Ani Chahal Honan", subtitle: "Regional Producer — North America", img: "/ani.jpg", type: "Producer" },
  { name: "Edith Öller", subtitle: "Co-Producer — UK, Ireland, Iberia & West Africa", img: "/edith-oller.jpg", type: "Co-Producer" },
];

export default function ProducersPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 mt-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#163B32] mb-3">Our Producers &amp; Co-Producers</h1>
        <p className="text-sm text-slate-600">
          Meet the regional conveners and visionaries orchestrating the 24-hour continuous global relay.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {producers.map((producer, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-emerald-100/80 shadow-xs hover:shadow-lg p-5 flex flex-col items-center text-center transition-all group">
            <div className="w-24 h-24 rounded-2xl bg-emerald-50 mb-3 flex items-center justify-center overflow-hidden relative border border-emerald-100">
              {producer.img ? (
                <img
                  src={producer.img}
                  alt={producer.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-xl font-bold text-[#163B32]">
                  {producer.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${
              producer.type === 'Co-Producer'
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : 'bg-emerald-100 text-[#163B32] border border-emerald-200'
            }`}>
              {producer.type}
            </span>
            <div className="font-editorial font-bold text-sm sm:text-base text-slate-900 mb-0.5">{producer.name}</div>
            <div className="text-xs text-slate-500">{producer.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
