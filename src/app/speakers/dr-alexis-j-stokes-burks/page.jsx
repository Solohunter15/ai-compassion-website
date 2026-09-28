import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import alexis from "@/../public/alexis.png";

export default function AlexisStokesBurks() {
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
              src={alexis}
              alt="Dr. Alexis J. Stokes-Burks"
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
            Dr. Alexis J. Stokes-Burks
          </h1>

          <p className="mt-2 text-sm sm:text-base font-semibold text-slate-700">
            Founder, Stokes Strategy &amp; Consulting
          </p>

          <div className="mt-6 text-left border-t border-slate-100 pt-6">
            <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider mb-3">
              Biography
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Dr. Alexis J. Stokes-Burks is an accomplished equity and inclusion strategist, keynote speaker, and leadership development facilitator with over 15 years of experience. She is the Founder and Chief Strategist of Stokes Strategy &amp; Consulting, partnering with universities, nonprofit, and corporate organizations to build policies, practices and a culture where everyone can thrive. She previously served as Associate Chief Diversity and Inclusion Officer at Harvard University and Assistant Dean at Harvard School of Engineering.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}