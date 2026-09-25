"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable for desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[data-clickable='true']") ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyber-cyan"
        style={{
          width: 8,
          height: 8,
          boxShadow: "0 0 10px #00E5FF, 0 0 20px #00E5FF",
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Floating Holographic Halo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-cyber-cyan/50"
        style={{
          width: 36,
          height: 36,
          background: isHovered
            ? "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(139, 92, 246, 0.05) 70%, transparent 100%)"
            : "transparent",
        }}
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isClicking ? 1.4 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? "#8B5CF6" : "rgba(0, 229, 255, 0.6)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 220, mass: 0.3 }}
      />
    </>
  );
};
