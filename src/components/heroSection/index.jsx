'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import plant from '@/../public/road.png';
import pot from '@/../public/paper.png';
import dance from '@/../public/light.png';
import temple from '@/../public/temple.webp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);
  const gridContainerRef = useRef(null);
  const circleStampRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Staggered initial entrance
      const elements = leftContentRef.current?.children;
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
        );
      }

      // Continuous 360 circle rotation for the seal badge
      if (circleStampRef.current) {
        gsap.to(circleStampRef.current, {
          rotation: 360,
          duration: 22,
          ease: 'none',
          repeat: -1,
        });
      }

      // Parallax scrolling on editorial images
      if (img1Ref.current && img2Ref.current && img3Ref.current && img4Ref.current) {
        gsap.to(img1Ref.current, {
          y: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(img2Ref.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        gsap.to(img3Ref.current, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(img4Ref.current, {
          y: -45,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-10 w-full min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-14 px-4 sm:px-6 lg:px-12 bg-[#F8F6F0] overflow-hidden"
    >
      {/* Ambient Background Illumination without any watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#163B32]/10 via-[#C9A96A]/8 to-transparent rounded-full blur-3xl opacity-70 animate-pulse-glow" />
        <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-[#C96F4A]/8 via-[#557C8B]/6 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Content (7 Cols) */}
        <div ref={leftContentRef} className="lg:col-span-7 flex flex-col justify-center gap-6">
          
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#E6E9E4] text-xs font-semibold tracking-wider uppercase text-[#163B32] w-fit shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#163B32] animate-pulse" />
            <span>Global Forum 2026</span>
          </div>

          {/* Locked Main Title */}
          <div className="flex flex-col">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171918] leading-[1.05]">
              AI+Compassion
              <br />
              <span className="text-[#5E625D] font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Global Forum 2026
              </span>
            </h1>
          </div>

          {/* Locked Date */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#C96F4A]" />
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#163B32]">
              October 2, 2026
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#5E625D] leading-relaxed max-w-2xl font-normal text-balance">
            The Global Forum on AI + Compassion unites innovators, policymakers,
            and cultural leaders to explore how artificial intelligence can
            serve humanity and the planet. Together, we’ll launch a global
            alliance, spark a new narrative, and activate projects that place
            compassion at the heart of technology.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/join"
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-wider uppercase text-[#F8F6F0] bg-[#163B32] hover:bg-[#0F2620] rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Join Us
            </Link>

            {/* Why Now Button linking directly to https://ai-compassion-relay.vercel.app/#relay */}
            <a
              href="https://ai-compassion-relay.vercel.app/#relay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 text-xs font-semibold tracking-wider uppercase text-[#163B32] hover:text-[#C96F4A] transition-all rounded-full bg-white/90 hover:bg-white border border-[#D9DDD6] hover:border-[#C96F4A]/50 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
            >
              <span>Why Now</span>
              <ArrowUpRight className="w-4 h-4 text-[#C96F4A]" />
            </a>
          </div>

          {/* Key Forum Facts Metrics Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-[#E6E9E4] text-[#163B32]">
            <div className="flex flex-col">
              <span className="font-editorial text-2xl font-bold tracking-tight">24h</span>
              <span className="text-[11px] font-mono text-[#5E625D] uppercase tracking-wider">Continuous Relay</span>
            </div>
            <div className="h-8 w-[1px] bg-[#E6E9E4]" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl font-bold tracking-tight">12</span>
              <span className="text-[11px] font-mono text-[#5E625D] uppercase tracking-wider">World Regions</span>
            </div>
            <div className="h-8 w-[1px] bg-[#E6E9E4]" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl font-bold tracking-tight">28</span>
              <span className="text-[11px] font-mono text-[#5E625D] uppercase tracking-wider">Flagship Hubs</span>
            </div>
            <div className="h-8 w-[1px] bg-[#E6E9E4]" />
            <div className="flex flex-col">
              <span className="font-editorial text-2xl font-bold tracking-tight">1</span>
              <span className="text-[11px] font-mono text-[#5E625D] uppercase tracking-wider">Shared Vow</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Image Grid */}
        <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
          <div
            ref={gridContainerRef}
            className="grid grid-cols-2 gap-4 sm:gap-6 w-full perspective-1000"
          >
            {/* Top-left image */}
            <div
              ref={img1Ref}
              className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#E6E9E4] bg-white group hover:shadow-2xl transition-all duration-500 will-change-transform"
            >
              <Image
                src={plant}
                alt="Hands holding green sprout"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>

            {/* Top-right image */}
            <div
              ref={img2Ref}
              className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#E6E9E4] bg-white group mt-6 hover:shadow-2xl transition-all duration-500 will-change-transform"
            >
              <Image
                src={pot}
                alt="Handmade pottery craft"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>

            {/* Bottom-left image */}
            <div
              ref={img3Ref}
              className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#E6E9E4] bg-white group -mt-6 hover:shadow-2xl transition-all duration-500 will-change-transform"
            >
              <Image
                src={temple}
                alt="Traditional Japanese temple"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Bottom-right image */}
            <div
              ref={img4Ref}
              className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#E6E9E4] bg-white group hover:shadow-2xl transition-all duration-500 will-change-transform"
            >
              <Image
                src={dance}
                alt="Traditional cultural dancer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Clean Circular Moving Emblem placed neatly in lower-left corner */}
          <div className="absolute -bottom-6 -left-6 z-20 pointer-events-none">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Spinning circular text path */}
              <div ref={circleStampRef} className="absolute inset-0 w-full h-full will-change-transform">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.2px] font-mono tracking-[0.22em] fill-[#163B32] uppercase font-bold">
                    <textPath href="#circlePath" startOffset="0%">
                      • AI + COMPASSION • 24H RELAY • 12 REGIONS • 2026
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Circle Badge */}
              <div className="w-10 h-10 rounded-full bg-[#163B32] text-[#F8F6F0] flex items-center justify-center shadow-lg border-2 border-[#C9A96A]/40">
                <Sparkles className="w-4 h-4 text-[#C9A96A] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}