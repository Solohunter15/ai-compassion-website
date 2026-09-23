'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/../public/logoai.png';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#');
  const pathname = usePathname();

  const isHome = pathname === '/' || pathname === '';

  // Exact links as requested
  const navLinks = [
    { href: isHome ? '#' : '/#', label: 'Info', id: 'info' },
    { href: isHome ? '#about' : '/#about', label: 'About', id: 'about' },
    { href: isHome ? '#pillars' : '/#pillars', label: 'Pillars', id: 'pillars' },
    { href: isHome ? '#relay' : '/#relay', label: 'The Relay', id: 'relay' },
    { href: isHome ? '#schedule' : '/#schedule', label: 'Schedule', id: 'schedule' },
    { href: isHome ? '#sponsors' : '/#sponsors', label: 'Sponsors', id: 'sponsors' },
    { href: isHome ? '#faq' : '/#faq', label: 'FAQ', id: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      if (!isHome) {
        setActiveSection(pathname);
        return;
      }

      const sections = ['faq', 'partners', 'sponsors', 'schedule', 'relay', 'pillars', 'why-now', 'about'];
      let found = '#';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            found = `#${id}`;
            break;
          }
        }
      }

      if (window.scrollY < 120) found = '#';
      setActiveSection(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, pathname]);

  const handleLinkClick = (e, href) => {
    setIsMobileMenuOpen(false);

    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      setActiveSection(href);
      if (href === '#') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          if (window.__lenis) {
            window.__lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 sm:px-6 lg:px-8 ${
        isScrolled ? 'py-2.5' : 'py-4 md:py-6'
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F0]/90 backdrop-blur-md shadow-sm border border-[#E6E9E4]'
            : 'bg-[#F8F6F0]/60 backdrop-blur-xs border border-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, '#')}
          className="flex items-center gap-3 group focus:outline-none rounded-lg"
          aria-label="AI + Compassion Global Forum 2026 Home"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src={logoImage}
              alt="AI + Compassion Logo"
              width={120}
              height={120}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial tracking-tight text-sm sm:text-base font-bold text-[#171918] group-hover:text-[#163B32] transition-colors leading-none">
              AI + COMPASSION
            </span>
            <span className="text-[10px] tracking-widest text-[#5E625D] uppercase font-medium mt-0.5">
              Global Forum 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold tracking-wide uppercase">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith('/');
            const isActive = isRoute
              ? pathname === link.href
              : isHome && activeSection === link.href;

            return isRoute ? (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[#171918] font-bold bg-[#171918]/5'
                    : 'text-[#5E625D] hover:text-[#171918] hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[#171918] font-bold bg-[#171918]/5'
                    : 'text-[#5E625D] hover:text-[#171918] hover:bg-black/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C96F4A]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right CTA / Archive */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://2025.compassionai.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#5E625D] hover:text-[#171918] transition-colors rounded-full hover:bg-black/5"
            title="Visit 2025 Edition"
          >
            <span>2025 Edition</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <Link
            href="/join"
            className="inline-flex items-center justify-center px-5 py-2 text-xs font-semibold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-[#171918] hover:bg-black/5 transition-colors focus:outline-none"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-[#F8F6F0]/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#E6E9E4] z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isRoute = link.href.startsWith('/');
              return isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-[#171918] hover:bg-[#163B32]/10 rounded-2xl transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-2.5 text-sm font-semibold text-[#171918] hover:bg-[#163B32]/10 rounded-2xl transition-colors"
                >
                  {link.label}
                </a>
              );
            })}

            <div className="mt-3 pt-3 border-t border-[#E6E9E4] flex flex-col gap-3">
              <a
                href="https://2025.compassionai.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white text-xs font-medium text-[#171918] border border-[#E6E9E4]"
              >
                <span>2025 Edition Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#5E625D]" />
              </a>

              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#163B32] text-[#F8F6F0] rounded-xl font-bold text-xs tracking-wider uppercase shadow-sm"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
