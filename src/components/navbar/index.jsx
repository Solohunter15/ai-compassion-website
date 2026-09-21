'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/../public/logoai.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('#');
  const pathname = usePathname(); // 👈 detect current page

  // links for homepage (sections) and other pages (routes)
  const links =
    pathname === '/' || pathname === ''
      ? [
          { href: '#', label: 'Info' },
          { href: '#about', label: 'About' },
          { href: '#speakers', label: 'Speakers' },
          { href: '#schedule', label: 'Schedule' },
          { href: '/gallery', label: 'Gallery' },
          { href: '#faq', label: 'FAQ' },
          { href: '#contact', label: 'Contact' },
        ]
      : [
          { href: '/#', label: 'Home' },
          { href: '/#about', label: 'About' },
          { href: '/#speakers', label: 'Speakers' },
          { href: '/#schedule', label: 'Schedule' },
          { href: '/gallery', label: 'Gallery' },
          { href: '/#faq', label: 'FAQ' },
          { href: '/#contact', label: 'Contact' },
        ];

  useEffect(() => {
    if (pathname !== '/' && pathname !== '') {
      // 👈 for non-home routes just set to pathname
      setCurrentSection(pathname);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        { href: '#', id: 'top' },
        { href: '#about', id: 'about' },
        { href: '#speakers', id: 'speakers' },
        { href: '#schedule', id: 'schedule' },
        { href: '#faq', id: 'faq' },
        { href: '#contact', id: 'contact' },
      ];

      let found = '#';
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // 👇 no break, so the last matching section overrides
          if (rect.top <= 120 && rect.bottom >= 120) {
            found = sections[i].href;
          }
        }
      }

      if (window.scrollY < 50) found = '#';
      setCurrentSection(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLinkClick = (section) => {
    setIsMobileMenuOpen(false);

    if (pathname === '/' && section.startsWith('#')) {
      setCurrentSection(section);
      if (section === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(section.replace('#', ''));
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  const getLinkClass = (href) => {
    const base = 'transition-colors duration-200 relative';
    // homepage (hash links)
    if (pathname === '/' || pathname === '') {
      return currentSection === href
        ? `${base} text-black`
        : `${base} text-[#0A2144]/50 hover:text-black`;
    }
    // other pages (route highlight)
    // Special case: highlight 'Contact' label if pathname is '/contact'
    if (pathname === '/contact' && href === '/contact' && href === '#contact') {
      return `${base} text-black`;
    }
    return pathname === href
      ? `${base} text-black`
      : `${base} text-[#0A2144]/50 hover:text-black`;
  };

  // Fix: define isScrolledStyles before using it
  const isScrolledStyles = isScrolled
    ? 'bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)]'
    : 'bg-white';

  return (
    <nav className="fixed top-1 mx-auto w-full max-w-[1800px] md:h-[5rem] z-[1000] p-4 flex items-center justify-center">
      <div
        className={`relative w-full px-4 py-2 md:p-0 flex items-center justify-between
        transition-all duration-300 ease-in-out ${isScrolledStyles} ${isMobileMenuOpen ? '!bg-white !shadow-none rounded-t-2xl md:rounded-t-3xl' : 'rounded-2xl md:rounded-t-3xl'}`}
      >
        {/* Mobile Logo */}
        <Link
          href="/"
          aria-label="logo"
          onClick={() => handleLinkClick('#')}
          className="block md:hidden w-16 z-40"
        >
          <Image
            src={logoImage}
            alt="logo"
            width={900}
            height={900}
            className="w-full h-full object-contain"
          />
        </Link>

        {/* Hamburger */}
        <div
          className="cursor-pointer block md:hidden z-50"
          onClick={handleMobileMenuToggle}
        >
          <div
            className={`w-[25px] h-[3px] ${isScrolled || isMobileMenuOpen ? 'bg-black' : 'bg-green-900'
              } rounded-full my-1 transition-transform duration-400 ${isMobileMenuOpen ? 'rotate-[-45deg] translate-y-[9px]' : ''
              }`}
          />
          <div
            className={`w-[25px] h-[3px] ${isScrolled || isMobileMenuOpen ? 'bg-black' : 'bg-green-900'
              } rounded-full my-1 transition-opacity duration-400 ${isMobileMenuOpen ? 'opacity-0' : ''
              }`}
          />
          <div
            className={`w-[25px] h-[3px] ${isScrolled || isMobileMenuOpen ? 'bg-black' : 'bg-green-900'
              } rounded-full my-1 transition-transform duration-400 ${isMobileMenuOpen ? 'rotate-[45deg] -translate-y-[9px]' : ''
              }`}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between w-full text-sm font-semibold px-2">
          <Link href="/" aria-label="logo" onClick={() => handleLinkClick('#')}>
            <Image
              src={logoImage}
              alt="logo"
              width={800}
              height={800}
              className="w-full h-full object-contain"
            />
          </Link>
          <div className="flex flex-row items-center gap-4 lg:gap-6 relative">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`${getLinkClass(link.href)} flex flex-col items-center`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D1462E] transition-all duration-300 ease-in-out ${
                    // Highlight dot for contact page
                    (pathname === '/contact' && link.href === '/contact') ||
                    (pathname === '/gallery' && link.href === '/gallery') ||
                    currentSection === link.href ||
                    pathname === link.href
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://2025.compassionai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0A2144]/70 hover:text-black bg-black/[0.04] hover:bg-black/[0.08] border border-black/5 hover:border-black/15 transition-all duration-200"
              title="Visit 2025 Edition website"
            >
              <span>2025 Edition</span>
              <svg
                className="w-3 h-3 text-[#0A2144]/40 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <Link
              href="/join"
              className="px-6 py-2 rounded-full bg-[#D55485] hover:bg-[#D55485]/80 transition-colors duration-200 text-white font-medium text-sm shadow-sm"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl p-5 flex flex-col gap-5 text-sm font-semibold z-40 border-t border-gray-100">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`py-1 transition-colors ${currentSection === link.href ? 'text-black font-bold' : 'text-[#0A2144]/60 hover:text-black'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="https://2025.compassionai.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#0A2144]/[0.03] hover:bg-[#0A2144]/[0.06] text-[#0A2144]/80 hover:text-black transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#0A2144]/50 font-medium">Archive</span>
                  <span className="font-semibold text-sm">2025 Edition</span>
                </div>
                <svg
                  className="w-3.5 h-3.5 text-[#0A2144]/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 rounded-full text-center bg-[#D55485] hover:bg-[#D55485]/90 text-white font-medium shadow-sm transition-colors"
              >
                Join Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
