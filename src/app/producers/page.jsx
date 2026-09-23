import React from "react";

const producers = [
  { name: "Christina Gerakiteys", subtitle: "Regional Producer — Oceania & Pacific", img: "/christina.jpg" },
  { name: "Jun Suto", subtitle: "Regional Producer — Kyoto & Osaka", img: "/jun.png" },
  { name: "Deepu S Nath", subtitle: "Regional Producer — South Asia", img: "/deepu.png" },
  { name: "Walied Albasheer", subtitle: "Regional Producer — GCC & Europe", img: "/walied.jpg" },
  { name: "Dr. Lee Kironget", subtitle: "Regional Producer — Africa", img: "/lee.jpg" },
  { name: "Marques Anderson", subtitle: "Regional Producer — Latin America", img: "/marques.jpg" },
  { name: "Ani Chahal Honan", subtitle: "Regional Producer — North America", img: "/ani.jpg" },
];

export default function ProducersPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#0A2144BF]">Our Producers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {producers.map((producer, idx) => (
          <div key={idx} className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
              {producer.img && (
                <img
                  src={producer.img}
                  alt={producer.name}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="font-semibold text-center w-full">{producer.name}</div>
            <div className="text-sm text-gray-500 text-center w-full">{producer.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
