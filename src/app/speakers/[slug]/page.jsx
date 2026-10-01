import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, UserCheck, Sparkles } from 'lucide-react';
import { SPEAKERS } from '@/data/speakersData';
import SpeakerAvatar from '@/components/speakerAvatar';

export async function generateStaticParams() {
  return SPEAKERS.map((speaker) => ({
    slug: speaker.slug,
  }));
}

export default async function SpeakerBioPage({ params }) {
  const { slug } = await params;
  const speaker = SPEAKERS.find((s) => s.slug === slug);

  if (!speaker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Top Navigation Bar with Back Arrow Button on Top Left Corner */}
        <div className="flex items-center justify-between">
          <Link
            href="/#speakers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider"
            aria-label="Back to speakers"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Speakers</span>
          </Link>

          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            Global Forum Speaker
          </span>
        </div>

        {/* Main Bio Card */}
        <div className="bg-white rounded-3xl border border-[#D9DDD6] shadow-xl p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Header Strip with High-Res Image & Meta */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-slate-100">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-slate-100 shadow-md border-2 border-emerald-200 shrink-0">
              <SpeakerAvatar
                src={speaker.img}
                name={speaker.name}
                imgPosition={speaker.imgPosition || 'center'}
                sizes="(max-width: 640px) 144px, 176px"
                priority
              />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 flex-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-300">
                Confirmed Speaker
              </span>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163B32]">
                {speaker.name}
              </h1>

              {speaker.title && (
                <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                  {speaker.title}
                </p>
              )}
            </div>
          </div>

          {/* Talk / Keynote Presentation (if available) */}
          {speaker.talkTitle && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C96F4A] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Featured Talk / Keynote</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {speaker.talkTitle}
              </h3>
              {speaker.talkDescription && (
                <div className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed pt-1">
                  {speaker.talkDescription.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bio Body */}
          {speaker.bio && speaker.bio.trim() && (
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Biography &amp; Global Contributions</span>
              </h2>

              {speaker.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Tags */}
          {speaker.tags && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
              {speaker.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#163B32]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer Back Button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/#speakers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to full speakers directory &amp; forum</span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
