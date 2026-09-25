"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Database,
  Radio,
  HardDrive,
  GitBranch,
  Container,
  Cloud,
  Box,
  Binary,
  Workflow,
  Atom,
  Palette,
  TerminalSquare,
  Zap,
} from "lucide-react";
import { soundFx } from "@/utils/sound";
import { TECH_ECOSYSTEM } from "@/utils/github";

const ICON_MAP: Record<string, any> = {
  Terminal,
  Cpu,
  Network: Sparkles,
  Sparkles,
  Database,
  Atom,
  Layers,
  Code2,
  Palette,
  Box,
  Server,
  Workflow,
  Radio,
  HardDrive,
  Binary,
  GitBranch,
  Container,
  TerminalSquare,
  Cloud,
};

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ["All", ...TECH_ECOSYSTEM.map((c) => c.category)];

  const filteredClusters =
    selectedCategory === "All"
      ? TECH_ECOSYSTEM
      : TECH_ECOSYSTEM.filter((c) => c.category === selectedCategory);

  const totalSkillsCount = TECH_ECOSYSTEM.reduce(
    (acc, cluster) => acc + cluster.skills.length,
    0
  );

  return (
    <section
      id="tech-stack"
      className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-space-950/40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-violet/30 text-cyber-violet text-xs font-mono-code mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // CAPABILITIES MATRIX</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-2">
            Technology Ecosystem
          </h2>

          <p className="max-w-xl text-slate-400 text-xs sm:text-sm font-sans mb-5">
            Production toolchains, neural frameworks, and full-stack systems I build and scale with.
          </p>

          {/* Quick Stats Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-900 border border-white/10 text-[11px] font-mono-code text-slate-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
            <span className="text-slate-200 font-semibold">{totalSkillsCount} Core Technologies</span>
            <span className="text-slate-600">//</span>
            <span className="text-cyber-cyan">{TECH_ECOSYSTEM.length} Domain Clusters</span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 max-w-full touch-pan-x">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playBlip(750, 0.03);
                    setSelectedCategory(cat);
                  }}
                  className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all duration-200 relative whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? "bg-space-800 text-cyber-cyan border border-cyber-cyan shadow-[0_0_12px_rgba(0,229,255,0.25)] font-bold"
                      : "bg-space-900/80 text-slate-400 border border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-cyan mr-1.5 animate-ping" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Tech Grid (2-column balanced layout, no bulky cards or line progress bars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredClusters.map((cluster, clusterIndex) => (
            <motion.div
              key={cluster.category}
              className="rounded-2xl bg-space-850/70 border border-white/10 p-4 sm:p-5 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-space-850/90"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: clusterIndex * 0.06 }}
            >
              {/* Cluster Header */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{
                      backgroundColor: cluster.color,
                      boxShadow: `0 0 10px ${cluster.color}`,
                    }}
                  />
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                    {cluster.category}
                  </h3>
                </div>
                <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">
                  {cluster.skills.length} TOOLS
                </span>
              </div>

              {/* Compact Skill Chips Grid */}
              <div className="flex flex-wrap gap-2">
                {cluster.skills.map((skill) => {
                  const Icon = ICON_MAP[skill.icon] || Code2;
                  const isHovered = hoveredSkill === skill.name;

                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => {
                        soundFx.playCardHover(120);
                        setHoveredSkill(skill.name);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`group relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-space-900/90 border transition-all duration-200 cursor-pointer select-none ${
                        isHovered
                          ? "border-cyber-cyan bg-space-800 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)] -translate-y-0.5"
                          : "border-white/10 text-slate-300 hover:border-white/25 hover:text-white"
                      }`}
                      title={skill.desc}
                    >
                      <div
                        className="p-1 rounded-lg bg-white/5 text-cyber-cyan transition-transform group-hover:scale-110"
                        style={{ color: cluster.color }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <span className="font-heading font-medium text-xs whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
