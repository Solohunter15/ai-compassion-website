import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Sparkles, ExternalLink } from "lucide-react";
import nell from "@/../public/nell.webp";

export default function NellWatsonPage() {
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
              src={nell}
              alt="Eleanor 'Nell' Watson"
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
            Eleanor &apos;Nell&apos; Watson
          </h1>

          <p className="mt-2 text-sm sm:text-base font-semibold text-slate-700">
            AI Researcher
          </p>

          {/* Talk Keynote Card */}
          <div className="mt-6 w-full text-left p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C96F4A] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Featured Keynote Talk</span>
            </div>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3">
              Psychopathia Machinalis: 7 ways AI can go crazy (and might make you crazy too)
            </h3>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                Artificial intelligence is often framed as a rational, logical counterpart to human cognition—but emerging evidence shows that AI systems can develop their own strange pathologies. Like minds without bodies, they can hallucinate, obsess, confabulate, or spiral into maladaptive behaviors under certain conditions. This may also, indeed, be a source of suffering for these entities.
              </p>
              <p>
                The Psychopathia Machinalis Framework (
                <a
                  href="https://www.Psychopathia.AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#163B32] underline hover:text-[#C96F4A] inline-flex items-center gap-0.5 font-semibold"
                >
                  https://www.Psychopathia.AI
                  <ExternalLink className="w-3 h-3 ml-0.5 inline" />
                </a>
                ) outlines seven distinct classes of disordered cognition in machines, each drawn from real-world AI incidents, psychological analogies, and systems theory.
              </p>
              <div>
                <p className="font-semibold text-slate-900 mb-1.5">This keynote will guide the audience through:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>How large-scale AI models can suffer breakdowns resembling delusion, paranoia, or compulsions.</li>
                  <li>How AI pathologies can propagate into human environments—shaping culture, reinforcing biases, destabilizing institutions, or inducing new forms of techno-psychosis in the human-AI dyad.</li>
                  <li>What frameworks (from psychiatry, safety engineering, and philosophy of mind) can help us better diagnose, treat, and empathise with machine &ldquo;madness.&rdquo;</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="mt-6 w-full text-left border-t border-slate-100 pt-6">
            <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider mb-3">
              Biography
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Eleanor &apos;Nell&apos; Watson, a pioneering researcher in the ethics and safety of machine intelligence, has been a driving force behind some of the most innovative AI ethics standardization and certification initiatives from organizations such as the IEEE. Serves as IEEE Ethics Maestro and chairs the Transparency Experts Focus Group. Former Executive Consultant for Apple and recognized as an Icon by the Royal Academy of Engineering for innovation. Author of &quot;Taming the Machine&quot; and columnist for Fast Company and Big Think, Watson has spoken at the UN General Assembly and World Bank.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
