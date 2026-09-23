'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { galleryVideos, galleryCategories } from '@/components/gallery/galleryData';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState(galleryVideos);

  const heroVideo = galleryVideos.find((v) => v.id === 1) || galleryVideos[0];

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredVideos(galleryVideos);
    } else {
      setFilteredVideos(galleryVideos.filter((v) => v.segment === selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#163B32] pb-28 pt-20">
      {/* Top Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex items-center justify-between border-b border-[#163B32]/10 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#163B32]/70 hover:text-[#163B32] transition-colors"
          >
            <span>← Back to Global Forum</span>
          </Link>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#C96F4A]">
            Global Relay Archives
          </div>
        </div>
      </div>

      {/* Hero Featured Video */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-6">
        <div className="relative aspect-video md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#163B32] border border-[#163B32]/20">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${heroVideo.youtubeId}`}
            title={heroVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#163B32]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EBE5] text-[11px] font-mono uppercase tracking-widest text-[#163B32] mb-3">
              Official Keynote • {heroVideo.segment}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-light text-[#163B32] tracking-tight">
              {heroVideo.title}
            </h1>
            <p className="mt-2 text-base text-[#163B32]/70 font-light">
              Relay Overview with Goi Peace Foundation
            </p>
          </div>
          <div className="text-xs font-mono text-[#163B32]/60 uppercase tracking-widest">
            {galleryVideos.length} Documented Relay Sessions
          </div>
        </div>
      </section>

      {/* Filter Tabs - Sticky */}
      <div className="sticky top-[4.5rem] z-30 bg-[#F8F6F0]/90 backdrop-blur-md py-4 mt-8 border-y border-[#163B32]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex overflow-x-auto gap-2.5 no-scrollbar pb-1">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-[#163B32] text-[#F8F6F0] border-[#163B32] shadow-sm'
                    : 'bg-white text-[#163B32] border-[#163B32]/20 hover:border-[#163B32] hover:bg-[#E5EBE5]/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <section className="mt-12 max-w-7xl mx-auto px-6 md:px-12">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#163B32]/10 shadow-sm hover:shadow-xl hover:border-[#C9A96A]/60 transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden bg-[#163B32]/10">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-[#163B32]/20 group-hover:bg-[#163B32]/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#163B32]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#C9A96A]/40 text-[#C9A96A] group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Region Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#163B32]/80 backdrop-blur-sm text-[10px] font-mono font-medium text-[#F8F6F0] uppercase tracking-wider">
                    {video.segment}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-[#163B32] line-clamp-1 group-hover:text-[#C96F4A] transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#163B32]/60 mt-1 font-light">
                      {video.speaker}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#163B32]/10 flex items-center justify-between text-[11px] font-mono text-[#163B32]/70 uppercase tracking-wider">
                    <span>Watch Clip</span>
                    <span className="text-[#C9A96A] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-serif text-[#163B32]">No sessions found</h3>
            <p className="text-[#163B32]/60 mt-2">Try selecting a different category tab above.</p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#163B32]/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#C9A96A]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-[#C96F4A] text-[#F8F6F0] transition-colors duration-200 border border-white/20"
            >
              ✕
            </button>

            {/* Video Player */}
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Info */}
            <div className="p-6 bg-[#163B32] text-[#F8F6F0]">
              <div className="text-[10px] font-mono text-[#C9A96A] uppercase tracking-widest mb-1">
                {selectedVideo.segment} Node
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-light text-[#F8F6F0]">
                {selectedVideo.title}
              </h2>
              <p className="text-[#F8F6F0]/70 text-sm mt-1 font-light">
                {selectedVideo.speaker}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
