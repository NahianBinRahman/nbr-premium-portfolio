"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { soundFx } from "@/utils/sound";

interface SectionMarker {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionMarker[] = [
  { id: "hero", num: "00", name: "INIT // HERO" },
  { id: "about", num: "01", name: "IDENTITY" },
  { id: "services", num: "02", name: "SERVICES" },
  { id: "tech-stack", num: "03", name: "STACK" },
  { id: "projects", num: "04", name: "CASE STUDIES" },
  { id: "github-stats", num: "05", name: "TELEMETRY" },
  { id: "articles", num: "06", name: "ARTICLES" },
  { id: "timeline", num: "07", name: "TRAJECTORY" },
  { id: "contact", num: "08", name: "TRANSMISSION" },
];

export const ScrollProgressHUD: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percent
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? Math.round((winScroll / height) * 100) : 0;
      setScrollPercentage(Math.min(Math.max(scrolled, 0), 100));

      // Calculate which section is in view
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundFx.playBlip(850, 0.04);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentSectionObj =
    SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <>
      {/* Pinned Top Cyber Shimmer Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-1 bg-space-950/60 backdrop-blur-sm">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald shadow-[0_0_12px_#00E5FF,0_0_24px_#8B5CF6]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Section Telemetry HUD - Desktop top right sub-bar */}
      <div className="hidden lg:flex fixed top-4 right-20 z-40 pointer-events-none items-center gap-2 px-3 py-1 rounded-full bg-space-950/70 border border-white/10 backdrop-blur-xl text-[10px] font-mono-code text-slate-300">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
        <span className="text-cyber-cyan font-bold tracking-wider">
          {scrollPercentage}%
        </span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400 font-semibold tracking-widest uppercase">
          {currentSectionObj.num} {currentSectionObj.name}
        </span>
      </div>

      {/* Desktop Vertical Chapter Quick-Nav Dots (Right side) */}
      <nav
        aria-label="Section Quick-Nav"
        className="hidden xl:flex fixed right-2 sm:right-2.5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 p-1.5 rounded-full bg-space-950/65 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Connecting Line Track */}
        <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/5 via-white/15 to-white/5 pointer-events-none" />

        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <button
                onClick={() => scrollTo(sec.id)}
                className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? "scale-125 bg-cyber-cyan ring-4 ring-cyber-cyan/30 shadow-[0_0_12px_#00E5FF]"
                    : "bg-slate-700 hover:bg-slate-300 hover:scale-110"
                }`}
                aria-label={`Jump to ${sec.name}`}
              >
                {isActive && (
                  <span className="w-0.5 h-0.5 rounded-full bg-space-950" />
                )}
              </button>

              {/* Side Tooltip - shown on hover so it doesn't obstruct screen */}
              <div
                className={`absolute right-6 pointer-events-none px-2.5 py-1 rounded-md bg-space-900 border border-cyber-cyan/40 text-[10px] font-mono-code text-cyber-cyan shadow-cyan-glow whitespace-nowrap transition-all duration-200 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2"
                }`}
              >
                <span className="text-white/60 mr-1.5">{sec.num}</span>
                {sec.name}
              </div>
            </div>
          );
        })}
      </nav>
    </>
  );
};
