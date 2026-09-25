"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  FileText,
  Mail,
  ChevronDown,
  Terminal,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Cpu,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { soundFx } from "@/utils/sound";
import { GitHubProfile } from "@/types/github";

interface HeroSectionProps {
  profile: GitHubProfile;
  onOpenContact?: () => void;
}

const TYPING_SENTENCE =
  "Autonomous AI Agents • Next.js Full-Stack Platforms • Computer Vision & IoT • Enterprise Automations";

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenContact,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  // Typing effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const fullText = TYPING_SENTENCE;

      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullText.length) {
          timer = setTimeout(() => setIsDeleting(true), 3500);
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(50);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 25 : 50);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  const handleScrollTo = (id: string) => {
    soundFx.playBlip(750, 0.04);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[100svh] sm:h-screen sm:min-h-[520px] flex flex-col justify-between items-center pt-20 sm:pt-20 pb-8 sm:pb-7 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-cyber-cyan/15 via-cyber-violet/10 to-transparent blur-3xl pointer-events-none" />

        {/* Center content container with fluid typography */}
        <div className="relative z-10 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center w-full my-auto">
          {/* Top Status Capsule Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-space-850/90 border border-cyber-cyan/40 text-[clamp(10px,1.1vw,12px)] font-mono-code text-slate-200 mb-2 sm:mb-3 shadow-[0_0_15px_rgba(0,229,255,0.2)] backdrop-blur-md cursor-pointer hover:border-cyber-cyan transition-colors"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleScrollTo("about")}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
            <span className="font-semibold text-white">Nahian Bin Rahman</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyber-cyan font-bold">Founder of Nahian DeepTech</span>
          </motion.div>

          {/* Profile Avatar with Holographic Tech Rings */}
          <motion.div
            className="relative mb-2 sm:mb-3 group"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Outer rotating gyro ring */}
            <div className="absolute -inset-2.5 rounded-full border border-cyber-cyan/25 animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-1 rounded-full border border-cyber-violet/35 border-dashed animate-[spin_12s_linear_infinite_reverse] pointer-events-none" />

            {/* Avatar frame */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 rounded-full p-1 bg-gradient-to-tr from-cyber-cyan via-white to-cyber-emerald shadow-[0_0_25px_rgba(0,229,255,0.35)]">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-space-950">
                <Image
                  src="/avatar.jpg"
                  alt="Nahian Bin Rahman - Founder of Nahian DeepTech"
                  fill
                  priority
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Holographic Badge */}
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-space-850 border border-cyber-emerald/50 text-[8px] font-mono-code text-cyber-emerald shadow-emerald-glow flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
              <span>AVAILABLE</span>
            </div>
          </motion.div>

          {/* Primary Landing Headline - Fluid clamped size */}
          <motion.h1
            className="text-[clamp(1.85rem,4.5vw,4.5rem)] font-black tracking-tight font-heading text-white mb-1.5 sm:mb-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Build. Automate. Grow.
          </motion.h1>

          {/* Value Proposition Subhead - Fluid clamped size */}
          <motion.p
            className="text-[clamp(0.8rem,1.35vw,1.15rem)] text-slate-300 font-sans max-w-2xl leading-relaxed mb-2 sm:mb-3 font-medium px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            I build digital systems that help businesses attract customers, automate operations, launch faster and grow.
          </motion.p>

          {/* Animated Typing Ticker - Fluid clamped font */}
          <motion.div
            className="relative w-full max-w-2xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-space-850/70 border border-white/10 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-[clamp(0.7rem,1.1vw,0.875rem)] text-slate-300 font-mono-code leading-relaxed text-center">
              <span className="text-cyber-cyan">&gt; </span>
              {displayText}
              <span className="inline-block w-1.5 h-3.5 bg-cyber-cyan ml-1 animate-pulse" />
            </p>
          </motion.div>
        </div>

        {/* High-Converting Action CTAs - Kept close to screen's bottom */}
        <motion.div
          className="relative z-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-3xl mt-auto pt-3 sm:pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Primary CTA: Launch Your Project */}
          <button
            onClick={() => {
              soundFx.playLaser();
              if (onOpenContact) {
                onOpenContact();
              } else {
                handleScrollTo("contact");
              }
            }}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm text-space-950 bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan hover:shadow-cyan-glow-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-98"
          >
            <Mail className="w-3.5 h-3.5 text-space-950 group-hover:rotate-12 transition-transform" />
            <span>Start a Project / Hire Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-space-950 animate-ping" />
          </button>

          {/* Secondary CTA: DeepTech Services */}
          <button
            onClick={() => handleScrollTo("services")}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-mono-code text-xs sm:text-sm font-semibold text-white bg-space-800/90 border border-cyber-cyan/50 hover:border-cyber-cyan hover:shadow-cyan-glow transition-all duration-300 overflow-hidden active:scale-98"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-3.5 h-3.5 text-cyber-cyan group-hover:scale-110 transition-transform" />
            <span>Explore Services</span>
            <ArrowRight className="w-3 h-3 text-cyber-cyan/70 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Tertiary CTA: Case Studies */}
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-mono-code text-xs sm:text-sm font-semibold text-white bg-space-800/90 border border-cyber-emerald/50 hover:border-cyber-emerald hover:shadow-emerald-glow transition-all duration-300 overflow-hidden active:scale-98"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-3.5 h-3.5 text-cyber-emerald group-hover:scale-110 transition-transform" />
            <span>Latest Case Studies</span>
          </button>
        </motion.div>
      </section>

      {/* Trust & Proof Strip - Appears smoothly on scroll below the 100% fit screen */}
      <div className="relative z-10 w-full border-y border-white/5 bg-space-900/60 backdrop-blur-md py-3.5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm font-mono-code text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyber-emerald" />
            <span>Turnkey AI & Next.js</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyber-cyan" />
            <span>Rapid 1-3 Week Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyber-violet" />
            <span>Global Reach · SLA 99.9%</span>
          </div>
        </div>
      </div>
    </>
  );
};
