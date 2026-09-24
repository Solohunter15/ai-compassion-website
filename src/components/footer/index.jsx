'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Check, Copy, ArrowUpRight, X, Shield, FileText } from 'lucide-react';
import { FaDiscord, FaLinkedinIn, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null
  const email = 'connect@compassionai.io';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/ai-plus-compassion/posts/?feedView=all',
      icon: FaLinkedinIn,
      label: 'Visit AI + Compassion on LinkedIn',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/aicompassion?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      icon: FaInstagram,
      label: 'Follow AI + Compassion on Instagram',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@AICompassionGlobalForum',
      icon: FaYoutube,
      label: 'Subscribe to AI + Compassion on YouTube',
    },
    {
      name: 'X',
      href: 'https://x.com/ai_compassion?s=20',
      icon: FaXTwitter,
      label: 'Follow AI + Compassion on X',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61581155761799',
      icon: FaFacebookF,
      label: 'Connect with AI + Compassion on Facebook',
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/qBbCNtca8N',
      icon: FaDiscord,
      label: 'Join AI + Compassion Discord Community',
    },
  ];

  return (
    <footer
      id="contact"
      className="relative z-20 w-full bg-[#FFFFFF] text-[#171918] border-t border-[#EAECE8] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Compact Contact Layout */}
        <div className="flex flex-col items-center gap-4 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-mono font-semibold text-[#163B32] border border-[#163B32]/20 tracking-wider uppercase">
            <Mail className="w-3 h-3 text-[#163B32]" />
            Connect
          </span>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#172554]">
            Join the Global Dialogue
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            For all inquiries, partnerships, and collaborations regarding the AI+Compassion Global Forum 2026:
          </p>

          {/* Clean Compact Email Pill with Direct Mailto & Copy Button */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 p-1.5 pl-4 bg-slate-50 border border-slate-200/80 rounded-xl shadow-2xs hover:border-[#163B32]/40 transition-all duration-300">
            <a
              href={`mailto:${email}`}
              className="text-sm sm:text-base font-semibold text-[#163B32] hover:text-[#C96F4A] transition-colors tracking-tight underline decoration-slate-300 hover:decoration-[#C96F4A] underline-offset-4"
            >
              {email}
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* All Social Channels */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#163B32] hover:text-white hover:border-[#163B32] shadow-2xs hover:shadow-sm transition-all duration-300 transform hover:scale-110 cursor-pointer"
                  aria-label={social.label}
                  title={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Legal & Archive Row */}
        <div className="w-full pt-6 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] sm:text-xs text-slate-500 font-medium">
          <p>© 2026 AI+ Compassion Global Forum • All Rights Reserved</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://2025.compassionai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold text-[#163B32]"
            >
              <span>2025 Edition Archive</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
          </div>

          {/* Interactive 'Powered by The Purple Movement' Badge */}
          <a
            href="https://www.thepurplemovement.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit The Purple Movement"
            className="group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200/90 shadow-md shadow-purple-950/5 hover:shadow-xl hover:shadow-purple-500/15 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer no-underline"
          >
            <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xs group-hover:bg-purple-500/40 transition-all" />
              <Image
                src="/purple.png"
                alt="The Purple Movement"
                width={22}
                height={22}
                className="relative z-10 object-contain"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-purple-700/80 font-bold leading-none">
                Powered by
              </span>
              <span className="text-xs font-editorial font-bold text-purple-950 group-hover:text-purple-700 transition-colors leading-tight">
                The Purple Movement
              </span>
            </div>
          </a>
        </div>

      </div>

      {/* Legal Information Modal Dialog */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#163B32]/10 flex items-center justify-center text-[#163B32]">
                  {legalModal === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#171918]">
                    {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
                  </h3>
                  <p className="text-xs text-slate-500">AI+Compassion Global Forum 2026</p>
                </div>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="p-2 rounded-full hover:bg-slate-200/70 text-slate-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            {legalModal === 'privacy' ? (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <p>
                  <strong>Last updated:</strong> October 2026
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">1. Information We Collect</h4>
                <p>
                  When you register for the AI+Compassion Global Forum 2026 via our registration system or Google Forms, we collect your full name, email address, organization/affiliation, role, country/region, and areas of interest.
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">2. How We Use Your Information</h4>
                <p>
                  Your information is used strictly to provide you with forum broadcast links, timezone-relevant schedule updates, access to regional hub breakouts, and post-forum collaboration resources. We do not sell or rent your personal data to any third parties.
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">3. Communications</h4>
                <p>
                  By registering, you agree to receive essential email updates regarding the 24-hour relay and key forum announcements. You can opt out or request data removal at any time by contacting us.
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">4. Contact & Inquiries</h4>
                <p>
                  For questions regarding our privacy practices or data handling, please contact our secretariat at{' '}
                  <a href={`mailto:${email}`} className="text-[#163B32] font-semibold underline">
                    {email}
                  </a>.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <p>
                  <strong>Last updated:</strong> October 2026
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">1. Acceptance of Terms</h4>
                <p>
                  By accessing the AI+Compassion Global Forum website, participating in the 24-hour relay, or registering for sessions, you agree to adhere to these Terms of Use and our community guidelines.
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">2. Community Code of Conduct</h4>
                <p>
                  The AI+Compassion Global Forum is committed to respectful, inclusive, and collaborative dialogue uniting technologists, ethicists, youth leaders, and global citizens. Harassment, discriminatory behavior, or disruptive conduct during broadcasts and chat forums will result in immediate removal.
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">3. Intellectual Property & Broadcasts</h4>
                <p>
                  All session recordings, keynotes, artistic performances, and synthesized declarations remain the intellectual property of their respective creators and the AI+Compassion Global Forum consortium. You may share broadcast links and quotes with appropriate attribution.
                </p>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">4. Modifications & Updates</h4>
                <p>
                  We reserve the right to modify relay schedules, speaker line-ups, and operational details as necessitated by global broadcasting logistics.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#163B32] text-white text-xs font-semibold hover:bg-[#0F2620] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
