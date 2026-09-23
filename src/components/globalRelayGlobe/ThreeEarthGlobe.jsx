'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { RELAY_REGIONS } from './relayData';

// Helper: Convert Lat/Lng to 3D Cartesian vector on sphere of radius R
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Helper: Create 3D Bezier curve between two Lat/Lng coordinates
function createCurveBetweenCoords(c1, c2, radius) {
  const v1 = latLngToVector3(c1.lat, c1.lng, radius);
  const v2 = latLngToVector3(c2.lat, c2.lng, radius);
  
  const mid = v1.clone().add(v2).multiplyScalar(0.5);
  const distance = v1.distanceTo(v2);
  const elevation = radius + Math.min(0.7, distance * 0.22);
  mid.normalize().multiplyScalar(elevation);

  return new THREE.QuadraticBezierCurve3(v1, mid, v2);
}

export default function ThreeEarthGlobe({
  activeIndex = 0,
  onSelectRegion,
  scrollProgress = 0,
}) {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  const globeGroupRef = useRef(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isHoveringNodeRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const cameraRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseVecRef = useRef(new THREE.Vector2(-999, -999));
  const lastSelectedIdxRef = useRef(activeIndex);

  const activeRegion = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];

  // Keep target orientation aligned with active region when changed externally
  useEffect(() => {
    lastSelectedIdxRef.current = activeIndex;
    const r = RELAY_REGIONS[activeIndex] || RELAY_REGIONS[0];
    const targetY = -(r.lng * Math.PI) / 180 - Math.PI / 2;
    const targetX = (r.lat * Math.PI) / 180 * 0.45;

    targetRotationRef.current = { x: targetX, y: targetY };
  }, [activeIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 440;
    let height = container.clientHeight || 440;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Group containing the rotating Earth and its markers
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Subtle Starfield Particles in background
    const starGeo = new THREE.BufferGeometry();
    const starCount = 280;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 7 + Math.random() * 8;
      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x163b32,
      size: 0.045,
      transparent: true,
      opacity: 0.25,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    sunLight.position.set(5, 3.5, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xc96f4a, 0.9);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0x557c8b, 0.6);
    topFill.position.set(0, 6, 2);
    scene.add(topFill);

    // Texture Loader with Earth maps
    const textureLoader = new THREE.TextureLoader();
    const radius = 2.0;

    const colorMap = textureLoader.load(
      '/earth/earth_color_2k.jpg',
      () => setIsLoaded(true),
      undefined,
      () => setIsLoaded(true)
    );
    colorMap.colorSpace = THREE.SRGBColorSpace;

    const bumpMap = textureLoader.load('/earth/earth_bump_2k.jpg');

    // Earth Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: colorMap,
      bumpMap: bumpMap,
      bumpScale: 0.045,
      roughness: 0.62,
      metalness: 0.08,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(earthMesh);

    // Outer Atmosphere Fresnel Glow
    const atmoGeo = new THREE.SphereGeometry(radius * 1.035, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x557c8b,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmoMesh);

    // Outer Soft Glowing Halo
    const haloGeo = new THREE.SphereGeometry(radius * 1.15, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc9a96a,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Interactive Hub Markers and Radar Rings
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);

    const hitSpheres = [];
    const markerMeshes = [];
    const markerBeacons = [];

    RELAY_REGIONS.forEach((r, idx) => {
      const pos = latLngToVector3(r.lat, r.lng, radius * 1.018);

      // Core Luminous Pin Sphere
      const pinGeo = new THREE.SphereGeometry(0.042, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: idx === activeIndex ? 0xc96f4a : 0x163b32,
        emissive: idx === activeIndex ? 0xc96f4a : 0x163b32,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { regionIndex: idx, regionData: r };
      markersGroup.add(pinMesh);
      markerMeshes.push(pinMesh);

      // Invisible generous hit sphere for responsive mouse hovering
      const hitGeo = new THREE.SphereGeometry(0.24, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(pos);
      hitMesh.userData = { regionIndex: idx, regionData: r };
      markersGroup.add(hitMesh);
      hitSpheres.push(hitMesh);

      // Outer Pulsing Radar Ring
      const ringGeo = new THREE.RingGeometry(0.055, 0.085, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x163b32,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      markersGroup.add(ringMesh);
      markerBeacons.push(ringMesh);
    });

    // Flight Arcs connecting relay nodes in sequence
    const curves = [];
    for (let i = 0; i < RELAY_REGIONS.length; i++) {
      const nextIdx = (i + 1) % RELAY_REGIONS.length;
      const curve = createCurveBetweenCoords(RELAY_REGIONS[i], RELAY_REGIONS[nextIdx], radius);
      curves.push(curve);

      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xc9a96a,
        transparent: true,
        opacity: 0.35,
      });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(curveLine);
    }

    // Glowing Tracer Light on Active Flight Arc
    const tracerGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const tracerMat = new THREE.MeshBasicMaterial({
      color: 0xfff0c2,
      transparent: true,
      opacity: 0.95,
    });
    const tracerMesh = new THREE.Mesh(tracerGeo, tracerMat);
    globeGroup.add(tracerMesh);

    // Initial orientation
    const initTarget = targetRotationRef.current;
    globeGroup.rotation.y = initTarget.y;
    globeGroup.rotation.x = initTarget.x;

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Ambient continuous planetary rotation when user is not dragging or inspecting a node
      if (!isDraggingRef.current && !isHoveringNodeRef.current) {
        targetRotationRef.current.y += 0.0016;
      }

      // Animate Beacons pulse & scale
      markerBeacons.forEach((ring, idx) => {
        const isActive = idx === lastSelectedIdxRef.current;
        if (isActive) {
          const scale = 1 + Math.sin(time * 4) * 0.45;
          ring.scale.set(scale, scale, scale);
          ring.material.color.setHex(0xc96f4a);
          ring.material.opacity = 0.95;
          markerMeshes[idx].scale.set(1.4, 1.4, 1.4);
          markerMeshes[idx].material.emissiveIntensity = 1.6;
        } else {
          ring.scale.set(0.8, 0.8, 0.8);
          ring.material.color.setHex(0x557c8b);
          ring.material.opacity = 0.35;
          markerMeshes[idx].scale.set(1, 1, 1);
          markerMeshes[idx].material.emissiveIntensity = 0.6;
        }
      });

      // Animate Tracer light traveling along current active arc
      const currentActive = lastSelectedIdxRef.current;
      if (curves[currentActive]) {
        const t = (time * 0.45) % 1;
        const tracerPos = curves[currentActive].getPoint(t);
        tracerMesh.position.copy(tracerPos);
      }

      // Smoothly interpolate (lerp) globe rotation towards target
      if (!isDraggingRef.current) {
        const target = targetRotationRef.current;
        
        let dY = target.y - globeGroup.rotation.y;
        while (dY < -Math.PI) dY += Math.PI * 2;
        while (dY > Math.PI) dY -= Math.PI * 2;

        globeGroup.rotation.y += dY * 0.08;
        globeGroup.rotation.x += (target.x - globeGroup.rotation.x) * 0.08;
      }

      // Raycasting for interactive marker hover & producer display
      if (cameraRef.current && hitSpheres.length > 0) {
        raycasterRef.current.setFromCamera(mouseVecRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(hitSpheres);

        if (intersects.length > 0) {
          const targetIndex = intersects[0].object.userData.regionIndex;
          const regionObj = RELAY_REGIONS[targetIndex];
          setHoveredNode(regionObj);
          isHoveringNodeRef.current = true;
          container.style.cursor = 'pointer';

          // Automatically show producer of hovered region
          if (targetIndex !== lastSelectedIdxRef.current && onSelectRegion) {
            lastSelectedIdxRef.current = targetIndex;
            onSelectRegion(targetIndex);
          }
        } else {
          setHoveredNode(null);
          isHoveringNodeRef.current = false;
          if (!isDraggingRef.current) {
            container.style.cursor = 'grab';
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse / Touch Interaction Handlers
    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - mousePosRef.current.x;
        const deltaY = e.clientY - mousePosRef.current.y;
        mousePosRef.current = { x: e.clientX, y: e.clientY };

        globeGroup.rotation.y += deltaX * 0.007;
        globeGroup.rotation.x += deltaY * 0.007;
        globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));
      }
    };

    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';

      // Direct click on a 3D node
      if (cameraRef.current && hitSpheres.length > 0) {
        const rect = container.getBoundingClientRect();
        const clickVec = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycasterRef.current.setFromCamera(clickVec, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(hitSpheres);
        if (intersects.length > 0 && onSelectRegion) {
          const clickedIdx = intersects[0].object.userData.regionIndex;
          lastSelectedIdxRef.current = clickedIdx;
          onSelectRegion(clickedIdx);
        }
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    const onPointerLeave = () => {
      mouseVecRef.current.set(-999, -999);
      setHoveredNode(null);
      isHoveringNodeRef.current = false;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('mouseup', onPointerUp);

    const onTouchStart = (e) => {
      if (e.touches[0]) {
        isDraggingRef.current = true;
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - mousePosRef.current.x;
      const deltaY = e.touches[0].clientY - mousePosRef.current.y;
      mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      globeGroup.rotation.y += deltaX * 0.007;
      globeGroup.rotation.x += deltaY * 0.007;
      globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onSelectRegion]);

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab" />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F8F6F0]/80 backdrop-blur-xs rounded-full">
          <div className="w-8 h-8 rounded-full border-2 border-[#163B32] border-t-transparent animate-spin" />
        </div>
      )}

      {/* Dynamic Hover Tooltip displaying Producer of that region */}
      {hoveredNode && hoveredNode.producer && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4 py-2 rounded-2xl bg-[#0F172A]/90 text-white shadow-2xl border border-white/20 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/40 shrink-0 bg-slate-700">
            <Image
              src={hoveredNode.producer.img}
              alt={hoveredNode.producer.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-editorial text-xs font-bold text-white tracking-tight">
              {hoveredNode.producer.name}
            </span>
            <span className="text-[10px] text-amber-300 font-mono">
              {hoveredNode.hubs}
            </span>
          </div>
        </div>
      )}

      {/* Floating Coordinate HUD Telemetry */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E6E9E4] shadow-xs text-[11px] font-mono text-[#163B32] pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#C96F4A] animate-ping" />
        <span className="font-bold uppercase tracking-wider">{activeRegion.code}</span>
        <span className="text-[#5E625D]">
          {activeRegion.lat > 0 ? `${activeRegion.lat.toFixed(1)}°N` : `${Math.abs(activeRegion.lat).toFixed(1)}°S`},{' '}
          {activeRegion.lng > 0 ? `${activeRegion.lng.toFixed(1)}°E` : `${Math.abs(activeRegion.lng).toFixed(1)}°W`}
        </span>
      </div>

      {/* Hub Tag */}
      <div className="absolute top-3 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#163B32] text-[#F8F6F0] text-[10px] font-mono tracking-wider uppercase shadow-md pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
        <span>{activeRegion.hubs}</span>
      </div>
    </div>
  );
}
