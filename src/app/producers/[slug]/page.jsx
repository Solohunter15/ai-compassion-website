import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Globe, MapPin, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { PRODUCERS } from '@/data/producersData';

export async function generateStaticParams() {
  return PRODUCERS.map((producer) => ({
    slug: producer.slug,
  }));
}

export default async function ProducerBioPage({ params }) {
  const { slug } = await params;
  const producer = PRODUCERS.find((p) => p.slug === slug);

  if (!producer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F6F0] pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-[#171918]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Top Navigation Bar with Back Arrow Button on Top Left Corner */}
        <div className="flex items-center justify-between">
          <Link
            href="/#producers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D9DDD6] text-[#163B32] hover:bg-[#163B32] hover:text-white transition-all shadow-xs group font-mono text-xs font-bold uppercase tracking-wider"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Producers</span>
          </Link>

          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
            Global Relay Convener
          </span>
        </div>

        {/* Main Bio Card */}
        <div className="bg-white rounded-3xl border border-[#D9DDD6] shadow-xl p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Header Strip with High-Res Image & Meta */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-slate-100">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-slate-100 shadow-md border-2 border-emerald-200 shrink-0">
              <Image
                src={producer.img}
                alt={producer.name}
                fill
                priority
                className="object-cover"
                style={{ objectPosition: producer.imgPosition || 'center' }}
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    producer.category === 'co-producer'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-[#163B32] border border-emerald-300'
                  }`}
                >
                  {producer.role}
                </span>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#163B32] border border-emerald-200">
                  Segment: {producer.segment}
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163B32]">
                {producer.name}
              </h1>

              {producer.title && (
                <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                  {producer.title}
                </p>
              )}

              {/* Full Region */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C96F4A] font-medium pt-1">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Region: <strong>{producer.region}</strong></span>
              </div>

              {producer.link && (
                <a
                  href={producer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] underline underline-offset-4 transition-colors pt-2"
                >
                  <span>Visit IDEAZ Business Innovation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Bio Body */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h2 className="font-mono text-xs uppercase font-bold text-[#163B32] tracking-wider border-b border-emerald-100 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#22C55E]" />
              <span>Full Biography &amp; Leadership Impact</span>
            </h2>

            {producer.bio.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {producer.tags && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
              {producer.tags.map((tag) => (
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
              href="/#producers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to full schedule &amp; forum overview</span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
