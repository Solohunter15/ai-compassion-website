import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import gary from "@/../public/gary.webp";

export default function GaryABolles() {
  return (
    <main className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <Link
          href="/speakers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Speakers</span>
        </Link>

        <div className="bg-white rounded-3xl border border-[#D9DDD6] shadow-xl p-8 sm:p-12 text-center flex flex-col items-center">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-200">
            <Image
              src={gary}
              alt="Gary A. Bolles"
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-300">
              Confirmed Speaker
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-[#163B32] border border-emerald-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C96F4A]" />
              <span>Region: Africa</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#163B32] mt-4">
            Gary A. Bolles
          </h1>

          <p className="mt-2 text-sm sm:text-base font-semibold text-slate-700">
            Global Fellow for Transformation @ Singularity University
          </p>

          <div className="mt-6 text-left border-t border-slate-100 pt-6">
            <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider mb-3">
              Biography
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Gary A. Bolles is co-founder of SoCap Global and partner at Charrette LLC, specializing in impact, innovation, and capital strategies. A leading expert on the future of work, he authored &quot;The Next Rules of Work&quot; and created LinkedIn courses with 1.7 million learners. As Global Fellow for Transformation at Singularity University, he guides organizations on leveraging AI and exponential technologies. Previously led major technology companies and directed six technology magazines including Yahoo! Internet Life.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
