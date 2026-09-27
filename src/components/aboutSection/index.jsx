'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ab1 from '@/../public/ab1.webp';

export default function AboutSection() {
  const containerRef = useRef(null);
  const textColRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageInnerRef = useRef(null);
  const kanjiRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. Text Column Staggered Scroll Reveal
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Editorial Image Smooth Parallax & Scale Scrub
      if (imageWrapperRef.current && imageInnerRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { opacity: 0, scale: 0.94, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous subtle parallax on image content during scroll
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Floating Kanji Watermarks Parallax Scrub
      kanjiRefs.current.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            { y: 15, rotate: -2 },
            {
              y: -25,
              rotate: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative z-10 w-full bg-[#F8F6F0] py-20 lg:py-28 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-14">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-[#E6E9E4] pb-4">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#171918]">
            About Us
          </h2>
        </div>

        {/* 2-Column Editorial Grid: Vision & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Column */}
          <div ref={textColRef} className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#163B32] tracking-tight">
              Our Vision
            </h3>

            <p className="text-base sm:text-lg text-[#171918] leading-relaxed font-normal">
              Artificial intelligence is advancing faster than ever, yet global
              trust in these systems remains uncertain. We imagine a future where
              nature, humanity, and technology thrive together. This forum
              explores how AI can move beyond fear and competition to nurture
              ecosystems, preserve cultural heritage, and strengthen communities.
            </p>

            <div className="pt-2">
              <p className="text-sm sm:text-base text-[#163B32] font-semibold">
                Our approach is guided by two essential Japanese concepts:
              </p>
            </div>

            {/* Wa and Ma Concept Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Wa (和) Card */}
              <div className="relative p-6 rounded-2xl bg-white border border-[#E6E9E4] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col gap-2 overflow-hidden group">
                <div
                  ref={(el) => (kanjiRefs.current[0] = el)}
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-4 text-7xl font-serif text-[#163B32]/10 select-none pointer-events-none group-hover:text-[#C96F4A]/20 transition-colors will-change-transform"
                >
                  和
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <span className="font-editorial text-xl font-bold text-[#163B32]">
                    Wa (和)
                  </span>
                  <span className="h-[1px] w-6 bg-[#C96F4A]" />
                </div>

                <p className="text-xs sm:text-sm text-[#5E625D] leading-relaxed relative z-10">
                  The principle of harmony and peaceful unity, where diverse elements come together in balance.
                </p>
              </div>

              {/* Ma (間) Card */}
              <div className="relative p-6 rounded-2xl bg-white border border-[#E6E9E4] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col gap-2 overflow-hidden group">
                <div
                  ref={(el) => (kanjiRefs.current[1] = el)}
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-4 text-7xl font-serif text-[#163B32]/10 select-none pointer-events-none group-hover:text-[#C96F4A]/20 transition-colors will-change-transform"
                >
                  間
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <span className="font-editorial text-xl font-bold text-[#163B32]">
                    Ma (間)
                  </span>
                  <span className="h-[1px] w-6 bg-[#C96F4A]" />
                </div>

                <p className="text-xs sm:text-sm text-[#5E625D] leading-relaxed relative z-10">
                  The concept of vital space between elements—the pause that gives meaning and allows for reflection.
                </p>
              </div>
            </div>

            {/* Futokoro 2026 Theme Box */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-white border border-[#E6E9E4] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col gap-2.5 overflow-hidden group">
              <div
                ref={(el) => (kanjiRefs.current[2] = el)}
                aria-hidden="true"
                className="absolute -right-3 -bottom-5 text-8xl font-serif text-[#163B32]/10 select-none pointer-events-none group-hover:text-[#C96F4A]/20 transition-colors will-change-transform"
              >
                懐
              </div>

              <div className="flex items-center gap-2.5 relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C96F4A]/10 text-[#C96F4A] font-mono text-[10px] uppercase font-bold tracking-wider">
                  2026 Special Theme
                </span>
                <span className="font-editorial text-xl font-bold text-[#163B32]">
                  Futokoro (懐)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5E625D] leading-relaxed relative z-10">
                Translates to the intimate space near the body or the deep embrace of nature. Exploring how
                we responsibly receive AI into physical bodies, homes, care systems, and ecosystems.
              </p>
            </div>
          </div>

          {/* Right Editorial Image */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div
              ref={imageWrapperRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E6E9E4] bg-white aspect-[4/3] group will-change-transform"
            >
              <div ref={imageInnerRef} className="relative w-full h-full will-change-transform">
                <Image
                  src={ab1}
                  alt="AI + Compassion vision and community"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}