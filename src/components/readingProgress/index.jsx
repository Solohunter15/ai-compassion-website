'use client';

import { useEffect, useState } from 'react';

export default function TopReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[999] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#163B32] via-[#C96F4A] to-[#D8B56A] transition-all duration-75 ease-out shadow-xs"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
