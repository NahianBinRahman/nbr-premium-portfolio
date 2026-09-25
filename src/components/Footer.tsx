"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Heart, Terminal, Sparkles, MapPin } from "lucide-react";
import { soundFx } from "@/utils/sound";

export const Footer: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playLaser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-space-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 font-mono-code text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="font-heading font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-emerald">
              NAHIAN DEEPTECH
            </span>
            <span className="text-slate-600">//</span>
            <span className="text-cyber-cyan text-[11px]">FOUNDED BY NAHIAN BIN RAHMAN</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Autonomous AI Systems · Full-Stack Web Platforms · Automation Architecture
          </p>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <MapPin className="w-3 h-3 text-cyber-emerald shrink-0" />
            <span>HQ: L-10, Software Technology Park, Agrabad, Chattogram, Bangladesh</span>
          </div>
        </div>

        {/* Center: System Clock & Coordinates */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-space-900 border border-white/5 text-[11px]">
          <div className="flex items-center gap-1.5 text-cyber-emerald">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
            <span>ONLINE</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">SYS_TIME: {time || "00:00:00"}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">GEO: CHATTOGRAM, BD</span>
        </div>

        {/* Right: Social & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/NahianBinRahman"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-space-900 border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/nahian-bin-rahman/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-space-900 border border-white/10 hover:border-cyber-violet hover:text-cyber-violet transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://medium.com/@nahianbinrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-space-900 border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
            title="Medium Publications"
          >
            <svg
              viewBox="0 0 1043.63 592.71"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
            </svg>
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-space-900 border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors text-[11px]"
            title="Ascend to Top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
