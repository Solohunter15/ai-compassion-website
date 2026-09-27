'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react';

export default function JoinPage() {
  useEffect(() => {
    window.location.href = 'https://makemypass.com/event/ai-compassion-participants';
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl flex flex-col items-center gap-6">
        <Loader2 className="w-8 h-8 text-[#163B32] animate-spin" />
        <div className="flex flex-col gap-2">
          <h1 className="font-editorial text-2xl font-bold text-[#163B32]">
            Redirecting to Registration...
          </h1>
          <p className="text-sm text-slate-600">
            You are being redirected to the official AI+Compassion Global Forum 2026 pass portal on MakeMyPass.
          </p>
        </div>

        <a
          href="https://makemypass.com/event/ai-compassion-participants"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#163B32] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#0F2620] transition-colors"
        >
          <span>Continue to Registration</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
