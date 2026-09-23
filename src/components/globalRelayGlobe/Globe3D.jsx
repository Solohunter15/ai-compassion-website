'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { RELAY_REGIONS } from './relayData';

export default function Globe3D({ activeIndex = 0, onSelectRegion }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [currentCoord, setCurrentCoord] = useState({ lat: -33.8688, lng: 151.2093 });

  // Target angles for each region
  // Convert lat/lng to cobe's phi (longitude) and theta (latitude)
  // phi in cobe is horizontal rotation, theta is vertical tilt
  const getTargetAngles = (regionIndex) => {
    const r = RELAY_REGIONS[regionIndex] || RELAY_REGIONS[0];
    // Longitude to phi: (lng * Math.PI) / 180 + offset to center front
    const phi = ((r.lng - 90) * Math.PI) / 180;
    // Latitude to theta: clamp between -0.4 and 0.4
    const theta = (r.lat * Math.PI) / 180 * 0.4;
    return { phi, theta, lat: r.lat, lng: r.lng };
  };

  const activeRegion = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];

  useEffect(() => {
    let width = 0;
    let phi = getTargetAngles(activeIndex).phi;
    let theta = getTargetAngles(activeIndex).theta;
    let globeInstance = null;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    // Prepare markers for all 12 regions
    const markers = RELAY_REGIONS.map((region, idx) => {
      const isActive = idx === activeIndex;
      return {
        location: [region.lat, region.lng],
        size: isActive ? 0.09 : 0.04,
      };
    });

    if (canvasRef.current) {
      globeInstance = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.15,
        dark: 0,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.93, 0.94, 0.91], // Warm Ivory / Pale sage base dots
        markerColor: [0.79, 0.43, 0.29], // Terracotta (#C96F4A)
        glowColor: [0.88, 0.91, 0.86], // Luminous organic glow
        markers: markers,
        onRender: (state) => {
          // If user is dragging
          if (pointerInteracting.current !== null) {
            phi += pointerInteractionMovement.current * 0.005;
            state.phi = phi;
          } else {
            // Smoothly lerp towards target phi and theta of active region
            const target = getTargetAngles(activeIndex);
            
            // Normalize phi difference to shortest rotation path
            let dPhi = target.phi - phi;
            while (dPhi < -Math.PI) dPhi += Math.PI * 2;
            while (dPhi > Math.PI) dPhi -= Math.PI * 2;

            phi += dPhi * 0.06;
            theta += (target.theta - theta) * 0.06;

            state.phi = phi;
            state.theta = theta;
          }

          state.width = width * 2;
          state.height = width * 2;
        },
      });
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (globeInstance) {
        globeInstance.destroy();
      }
    };
  }, [activeIndex]);

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none">
      
      {/* Ambient background orbital aura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-radial from-[#163B32]/10 via-[#C96F4A]/5 to-transparent blur-2xl scale-95 pointer-events-none"
      />

      {/* Decorative Celestial Orbital Rings */}
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-full border border-[#163B32]/10 pointer-events-none animate-[spin_120s_linear_infinite]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-10 rounded-full border border-dashed border-[#C96F4A]/20 pointer-events-none animate-[spin_80s_linear_infinite_reverse]"
      />

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10 transition-opacity duration-500"
        style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
          }
        }}
      />

      {/* Floating HUD Telemetry Badge */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E6E9E4] shadow-sm text-[11px] font-mono text-[#163B32]">
        <span className="w-2 h-2 rounded-full bg-[#C96F4A] animate-ping" />
        <span className="font-semibold uppercase tracking-wider">{activeRegion.code}</span>
        <span className="text-[#5E625D]">
          {activeRegion.lat.toFixed(2)}°, {activeRegion.lng.toFixed(2)}°
        </span>
      </div>

      {/* Hub Status Tooltip */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#163B32] text-[#F8F6F0] text-[10px] font-mono tracking-wider uppercase shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
        <span>{activeRegion.hubs}</span>
      </div>
    </div>
  );
}
