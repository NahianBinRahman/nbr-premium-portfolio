"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Neural Network / Particle Constellation
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const spread = 280;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      velocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle texture / point material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 3.5,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Dynamic Connections (Lines)
    const maxConnections = 600;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.6,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Floating 3D Geometric Ring / Holographic Core
    const torusGeometry = new THREE.TorusGeometry(85, 0.6, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    // Outer Gyroscope Ring
    const torus2Geometry = new THREE.TorusGeometry(120, 0.4, 16, 120);
    const torus2Material = new THREE.MeshBasicMaterial({
      color: 0x00ff9c,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.rotation.y = Math.PI / 4;
    scene.add(torus2);

    // Mouse & Scroll Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentScrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse & scroll lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;

      // Scroll camera traversal effect:
      // Depth moves smoothly, subtle vertical panning through cyberspace
      const scrollProgress = Math.min(currentScrollY / 3000, 1.5);
      camera.position.x = mouseX + Math.sin(scrollProgress * Math.PI) * 15;
      camera.position.y = -mouseY - (currentScrollY * 0.05);
      camera.position.z = 250 - Math.min(currentScrollY * 0.06, 120);
      camera.lookAt(0, -currentScrollY * 0.04, 0);

      // Rotate torus rings responsive to time and scroll position
      torus.rotation.z = elapsedTime * 0.08 + currentScrollY * 0.001;
      torus.rotation.y = elapsedTime * 0.06 + currentScrollY * 0.0008;
      torus.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.1;

      torus2.rotation.x = -elapsedTime * 0.05 - currentScrollY * 0.0009;
      torus2.rotation.z = elapsedTime * 0.04 + currentScrollY * 0.0006;
      torus2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.4) * 0.1;

      // Update particle positions
      const currentPos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        currentPos[i3] += velocities[i].x;
        currentPos[i3 + 1] += velocities[i].y;
        currentPos[i3 + 2] += velocities[i].z;

        // Bounce back within bounds
        if (Math.abs(currentPos[i3]) > spread) velocities[i].x *= -1;
        if (Math.abs(currentPos[i3 + 1]) > spread * 0.8) velocities[i].y *= -1;
        if (Math.abs(currentPos[i3 + 2]) > spread * 0.6) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Connect nearby particles
      let lineIndex = 0;
      const maxDistance = 45;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxConnections) break;

          const dx = currentPos[i * 3] - currentPos[j * 3];
          const dy = currentPos[i * 3 + 1] - currentPos[j * 3 + 1];
          const dz = currentPos[i * 3 + 2] - currentPos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1.0 - dist / maxDistance;
            const li = lineIndex * 6;

            linePositions[li] = currentPos[i * 3];
            linePositions[li + 1] = currentPos[i * 3 + 1];
            linePositions[li + 2] = currentPos[i * 3 + 2];

            linePositions[li + 3] = currentPos[j * 3];
            linePositions[li + 4] = currentPos[j * 3 + 1];
            linePositions[li + 5] = currentPos[j * 3 + 2];

            // Color gradient between cyan and violet
            lineColors[li] = 0.0;
            lineColors[li + 1] = 0.9 * alpha;
            lineColors[li + 2] = 1.0 * alpha;

            lineColors[li + 3] = 0.54 * alpha;
            lineColors[li + 4] = 0.36 * alpha;
            lineColors[li + 5] = 0.96 * alpha;

            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onWindowResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      torus2Geometry.dispose();
      torus2Material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};
