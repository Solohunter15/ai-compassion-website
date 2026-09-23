'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, Copy, ArrowUpRight } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'connect@compassionai.io';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="relative z-20 w-full bg-[#FFFFFF] text-[#171918] border-t border-[#EAECE8] pt-20 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-14">
        
        {/* Single Contact Layout */}
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-mono font-semibold text-slate-700 tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5 text-[#163B32]" />
            Connect
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172554]">
            Join the Global Dialogue
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
            For all inquiries, partnerships, and collaborations regarding the AI+Compassion Global Forum 2026:
          </p>

          {/* Clean Apple-style Email Pill with Direct Mailto & Copy Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-2 pl-5 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs hover:border-[#163B32]/40 transition-all duration-300">
            <a
              href={`mailto:${email}`}
              className="text-base sm:text-lg font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors tracking-tight underline decoration-slate-300 hover:decoration-[#C96F4A] underline-offset-4"
            >
              {email}
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://x.com/ai_compassion"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:scale-105"
              aria-label="Visit AI + Compassion on X"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>

            <a
              href="https://discord.com/invite/3hzvqf4qJ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:scale-105"
              aria-label="Join AI + Compassion Discord Community"
            >
              <FaDiscord className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Legal & Archive Row */}
        <div className="w-full pt-8 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 AI+ Compassion Global Forum • All Rights Reserved</p>

          <div className="flex items-center gap-6">
            <a
              href="https://2025.compassionai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold text-[#163B32]"
            >
              <span>2025 Edition Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <Link href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-slate-900 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
