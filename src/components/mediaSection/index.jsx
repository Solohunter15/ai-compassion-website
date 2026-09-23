'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { galleryVideos } from '@/components/gallery/galleryData';

export default function MediaSection() {
  const sectionRef = useRef(null);
  const heroCardRef = useRef(null);
  const maskRef = useRef(null);
  const imageRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Main anchor video (Overview) and 3 selected regional highlights
  const mainVideo = galleryVideos.find((v) => v.id === 1) || galleryVideos[0];
  const highlightVideos = [
    galleryVideos.find((v) => v.id === 2), // Osaka Part 1 (Full AM Session)
    galleryVideos.find((v) => v.id === 8), // Africa Segment (Full Segment)
    galleryVideos.find((v) => v.id === 18), // North America Segment (Full Segment)
  ].filter(Boolean);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic clip-path scroll reveal
      if (maskRef.current && imageRef.current) {
        gsap.fromTo(
          maskRef.current,
          {
            clipPath: 'inset(18% 12% 18% 12% round 32px)',
            scale: 0.92,
            opacity: 0.8,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroCardRef.current,
              start: 'top 85%',
              end: 'top 25%',
              scrub: 1,
            },
          }
        );

        // Subtle Parallax on the image inside
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: heroCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="media"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#F8F6F0] text-[#163B32] overflow-hidden border-t border-[#163B32]/10"
    >
      {/* Background Japanese Watermark */}
      <div className="absolute top-12 right-6 md:right-16 text-[120px] md:text-[200px] font-serif font-black text-[#163B32]/[0.03] select-none pointer-events-none leading-none">
        記録
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 border-b border-[#163B32]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#163B32]/20 bg-[#E5EBE5]/60 text-[11px] font-mono tracking-widest text-[#163B32] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
              Previous Year Highlights
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-[#163B32] leading-tight">
              Relay Dialogues &amp; Keynotes
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#163B32]/70 max-w-xl font-light">
              Moments from the Osaka opening, global regional nodes, and the sacred Kyoto closing.
            </p>
          </div>

          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#163B32]/30 text-xs font-mono uppercase tracking-widest text-[#163B32] hover:bg-[#163B32] hover:text-[#F8F6F0] transition-all duration-300 self-start md:self-auto"
          >
            <span>View Full Archive (30+ Sessions)</span>
            <span className="text-[#C9A96A] group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

        {/* Hero Featured Video with Scroll-Driven Clip-Path Mask Reveal */}
        <div ref={heroCardRef} className="relative mb-12 md:mb-16">
          <div
            ref={maskRef}
            onClick={() => setActiveVideo(mainVideo)}
            className="group cursor-pointer relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-[#163B32] border border-[#163B32]/20"
          >
            {/* Background Image with Parallax & Hover Zoom */}
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
              <Image
                src={`https://img.youtube.com/vi/${mainVideo.youtubeId}/hqdefault.jpg`}
                alt={mainVideo.title}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#163B32]/95 via-[#163B32]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#163B32]/70 via-transparent to-transparent hidden md:block" />

            {/* Center Cinematic Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-[#C9A96A]/60 bg-[#163B32]/70 backdrop-blur-md flex items-center justify-center text-[#F8F6F0] shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A96A] group-hover:bg-[#163B32]/90">
              <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-[#C9A96A] translate-x-1 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C96F4A]/90 text-white text-[10px] font-mono tracking-widest uppercase mb-3">
                  Featured Keynote • {mainVideo.segment}
                </div>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#F8F6F0] tracking-tight font-light leading-tight">
                  {mainVideo.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-[#F8F6F0]/80 font-light">
                  {mainVideo.speaker} • Co-Organized with Goi Peace Foundation
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C9A96A] uppercase">
                <span>Watch Session</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Regional Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {highlightVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden border border-[#163B32]/10 shadow-sm hover:shadow-xl hover:border-[#C9A96A]/50 transition-all duration-500"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#163B32]/10">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#163B32]/80 backdrop-blur-sm text-[#F8F6F0] text-[10px] font-mono tracking-widest uppercase">
                  {video.segment}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#163B32]/80 backdrop-blur-md text-[#C9A96A] flex items-center justify-center border border-[#C9A96A]/40 transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-normal text-[#163B32] group-hover:text-[#C96F4A] transition-colors leading-snug">
                    {video.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#163B32]/60 font-light">
                    {video.speaker}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#163B32]/10 flex items-center justify-between text-[11px] font-mono text-[#163B32]/70 uppercase tracking-wider">
                  <span>Playback</span>
                  <span className="text-[#C9A96A] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-[#163B32]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#C9A96A]/30 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-[#F8F6F0] hover:text-[#C9A96A] flex items-center justify-center font-mono text-xl transition-colors border border-white/20"
              aria-label="Close"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
