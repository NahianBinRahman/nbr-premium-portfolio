"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Github,
  Menu,
  X,
  Layers,
  Activity,
  ArrowUpRight,
  Terminal,
  Sparkles,
} from "lucide-react";
import { soundFx } from "@/utils/sound";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onTriggerEasterEgg?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onTriggerEasterEgg,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Case Studies", href: "#projects", id: "projects" },
    { name: "Stack", href: "#tech-stack", id: "tech-stack" },
    { name: "Analytics", href: "#github-stats", id: "github-stats" },
    { name: "Articles", href: "#articles", id: "articles" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playBlip(800, 0.04);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) soundFx.playBlip(1000, 0.05);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-space-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-950/20"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Company Brand */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-space-800 border border-cyber-cyan/40 group-hover:border-cyber-cyan shadow-cyan-glow transition-all">
              <span className="font-heading font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-emerald">
                ND
              </span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-emerald"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm tracking-wider text-slate-100 group-hover:text-cyber-cyan transition-colors">
                NAHIAN DEEPTECH
              </span>
              <span className="font-mono-code text-[9px] text-cyber-cyan/80 tracking-widest uppercase font-semibold">
                AI & SOFTWARE SYSTEMS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-space-850/80 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all duration-300 relative ${
                    isActive
                      ? "text-cyber-cyan bg-white/10 shadow-[0_0_12px_rgba(0,229,255,0.3)] font-semibold border border-cyber-cyan/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Header CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-emerald text-space-950 font-heading font-black text-xs shadow-cyan-glow hover:shadow-cyan-glow-lg transition-all active:scale-95 mr-1"
            >
              <span>Hire Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-space-950" />
            </a>


            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg bg-space-800 border transition-all ${
                soundEnabled
                  ? "border-cyber-cyan/30 text-cyber-cyan hover:border-cyber-cyan shadow-cyan-glow"
                  : "border-white/10 text-slate-500 hover:text-slate-300"
              }`}
              title={soundEnabled ? "Mute audio effects" : "Unmute audio effects"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* GitHub Profile Button */}
            <a
              href="https://github.com/NahianBinRahman"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playBlip(900, 0.04)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-space-800 to-space-700 border border-cyber-cyan/30 text-xs font-mono-code text-slate-100 hover:border-cyber-cyan hover:shadow-cyan-glow transition-all"
            >
              <Github className="w-4 h-4 text-cyber-cyan" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 text-cyber-cyan"
              title="Toggle Audio"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                soundFx.playBlip(700, 0.05);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-space-950/95 backdrop-blur-2xl border-t border-white/10 p-6 md:hidden flex flex-col justify-between overflow-y-auto pb-24"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-mono-code text-cyber-cyan uppercase tracking-widest">
                  // NAVIGATION DIRECTIVES
                </p>
                <span className="text-[10px] font-mono-code text-slate-500">
                  SYSTEM ACTIVE
                </span>
              </div>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-mono-code transition-all ${
                      isActive
                        ? "bg-space-800 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)] font-bold"
                        : "bg-space-850/80 border-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00E5FF] animate-pulse" />
                    ) : (
                      <span className="text-slate-600 text-xs">→</span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 font-mono-code text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette?.();
                }}
                className="w-full py-3 rounded-xl bg-space-800 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                <span>Open Command Palette</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onTriggerEasterEgg?.();
                }}
                className="w-full py-3 rounded-xl bg-space-800 border border-cyber-violet/40 text-cyber-violet flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Trigger AI Overdrive</span>
              </button>

              <a
                href="https://github.com/NahianBinRahman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-violet text-space-950 font-bold flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile @NahianBinRahman</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
