"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal,
  ExternalLink,
  Code2,
  FolderGit2,
  Sparkles,
  Volume2,
  VolumeX,
  Mail,
  Copy,
  Check,
  X,
  User,
  Activity,
  History,
  BookOpen,
  Zap,
} from "lucide-react";
import { soundFx } from "@/utils/sound";

interface CommandPaletteProps {
  onTriggerEasterEgg?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onTriggerEasterEgg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Global keydown listener for "/" or "Cmd/Ctrl + K"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in another input/textarea
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
        if (e.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        soundFx.playBlip(900, 0.05);
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const scrollTo = (id: string) => {
    soundFx.playBlip(750, 0.04);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    soundFx.playLaser();
    navigator.clipboard.writeText("nahianbinrahman@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) soundFx.playBlip(1000, 0.05);
  };

  const commands = [
    {
      id: "nav-hero",
      title: "Hero Overview",
      category: "Navigation",
      icon: User,
      action: () => scrollTo("hero"),
    },
    {
      id: "nav-about",
      title: "About Nahian",
      category: "Navigation",
      icon: Terminal,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-services",
      title: "Nahian DeepTech Services",
      category: "Navigation",
      icon: Zap,
      action: () => scrollTo("services"),
    },
    {
      id: "nav-tech",
      title: "Technology Ecosystem",
      category: "Navigation",
      icon: Code2,
      action: () => scrollTo("tech-stack"),
    },
    {
      id: "nav-projects",
      title: "Latest Case Studies",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-github",
      title: "GitHub Intelligence Dashboard",
      category: "Navigation",
      icon: Activity,
      action: () => scrollTo("github-stats"),
    },
    {
      id: "nav-articles",
      title: "Articles & Medium Publications",
      category: "Navigation",
      icon: BookOpen,
      action: () => scrollTo("articles"),
    },
    {
      id: "nav-timeline",
      title: "Engineering Journey Timeline",
      category: "Navigation",
      icon: History,
      action: () => scrollTo("timeline"),
    },
    {
      id: "nav-contact",
      title: "Contact & Transmission",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
    },
    {
      id: "action-easter-egg",
      title: "Execute Protocol: AI Neural Matrix",
      category: "Actions",
      icon: Sparkles,
      action: () => {
        setIsOpen(false);
        onTriggerEasterEgg?.();
      },
    },
    {
      id: "action-copy-email",
      title: copied ? "Copied nahianbinrahman@gmail.com!" : "Copy Developer Email",
      category: "Actions",
      icon: copied ? Check : Copy,
      action: copyEmail,
    },
    {
      id: "action-toggle-sound",
      title: soundEnabled ? "Mute UI Sound Synthesis" : "Enable UI Sound Synthesis",
      category: "Actions",
      icon: soundEnabled ? Volume2 : VolumeX,
      action: toggleSound,
    },
    {
      id: "ext-github",
      title: "Visit GitHub: @NahianBinRahman",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/NahianBinRahman", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "ext-linkedin",
      title: "Connect on LinkedIn",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://www.linkedin.com/in/nahian-bin-rahman/", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "ext-medium",
      title: "Read Publications on Medium: @nahianbinrahman",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://medium.com/@nahianbinrahman", "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Floating indicator button on bottom right */}
      <button
        onClick={() => {
          soundFx.playBlip(900, 0.05);
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-800/80 border border-cyber-cyan/30 text-xs font-mono-code text-slate-300 backdrop-blur-md hover:border-cyber-cyan hover:shadow-cyan-glow transition-all"
        title="Open Command Palette (Press /)"
      >
        <Terminal className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
        <span>Command Menu</span>
        <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded border border-white/20 text-cyber-cyan">
          /
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10001] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog */}
            <motion.div
              className="relative w-full max-w-xl rounded-2xl bg-space-850 border border-cyber-cyan/40 shadow-2xl shadow-cyan-500/20 overflow-hidden z-10"
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Header Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-space-900/60">
                <Search className="w-5 h-5 text-cyber-cyan mr-3 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or jump to section... (or press ESC to exit)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono-code"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Command List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400 font-mono-code">
                    No matching cyber directives found.
                  </div>
                ) : (
                  filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-slate-200 hover:bg-space-700/70 hover:text-cyber-cyan group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-cyber-cyan/50 text-slate-400 group-hover:text-cyber-cyan transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-mono-code text-xs md:text-sm">{cmd.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider group-hover:text-cyber-cyan/70">
                          {cmd.category}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer status */}
              <div className="flex items-center justify-between px-4 py-2 bg-space-950 border-t border-white/5 text-[11px] text-slate-500 font-mono-code">
                <span>Navigate: ↑ ↓</span>
                <span>Select: Enter</span>
                <span>Nahian Command OS v2.5</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
