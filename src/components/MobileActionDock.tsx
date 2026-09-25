"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  FolderGit2,
  Copy,
  Check,
  Github,
  ChevronUp,
  Terminal,
} from "lucide-react";
import { soundFx } from "@/utils/sound";

export const MobileActionDock: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [inContactZone, setInContactZone] = useState(false);
  const [dockVisible, setDockVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const email = "nahianbinrahman@gmail.com";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        const contactTop = contactSection.offsetTop - 300;
        setInContactZone(scrollPos >= contactTop);
      }

      // Hide dock when scrolling down fast near bottom, or keep it neatly visible
      setLastScrollY(scrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playLaser();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScrollTo = (id: string) => {
    soundFx.playBlip(800, 0.04);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 md:hidden transition-all duration-300 pb-[env(safe-area-inset-bottom)] ${
        inContactZone ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-md mx-auto p-1.5 rounded-2xl bg-space-950/85 backdrop-blur-2xl border border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(0,229,255,0.15)] flex items-center justify-between gap-1.5">
        {/* Primary Glowing Action CTA: Initiate Contact */}
        <button
          onClick={() => handleScrollTo("contact")}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan text-space-950 font-heading font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.5)] active:scale-95 transition-transform"
        >
          <Send className="w-3.5 h-3.5 text-space-950" />
          <span>Let&apos;s Build</span>
          <span className="w-1.5 h-1.5 rounded-full bg-space-950 animate-ping" />
        </button>

        {/* Quick Projects / Case Studies Explorer Button */}
        <button
          onClick={() => handleScrollTo("projects")}
          className="p-2.5 rounded-xl bg-space-850 border border-white/10 text-slate-200 hover:text-cyber-cyan active:scale-95 transition-all flex items-center gap-1 text-xs font-mono-code"
          title="Browse Case Studies"
        >
          <FolderGit2 className="w-4 h-4 text-cyber-emerald" />
          <span className="hidden xs:inline">Cases</span>
        </button>

        {/* 1-Tap Copy Email Button with Animated Confirmation */}
        <button
          onClick={handleCopyEmail}
          className={`p-2.5 rounded-xl border active:scale-95 transition-all flex items-center gap-1 text-xs font-mono-code ${
            copied
              ? "bg-cyber-emerald/20 border-cyber-emerald text-cyber-emerald"
              : "bg-space-850 border-white/10 text-slate-300 hover:text-cyber-cyan"
          }`}
          title="Copy Email Address"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-cyber-emerald" />
              <span className="text-[10px] font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-cyber-cyan" />
              <span className="hidden xs:inline">Email</span>
            </>
          )}
        </button>

        {/* Direct GitHub Profile Link */}
        <a
          href="https://github.com/NahianBinRahman"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playBlip(900, 0.03)}
          className="p-2.5 rounded-xl bg-space-850 border border-white/10 text-slate-200 hover:text-white active:scale-95 transition-all flex items-center justify-center"
          title="Open GitHub Profile"
        >
          <Github className="w-4 h-4 text-cyber-cyan" />
        </a>
      </div>
    </div>
  );
};
