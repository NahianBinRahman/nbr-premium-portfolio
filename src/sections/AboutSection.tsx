"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  FolderGit2,
  Cpu,
  Layers,
  Sparkles,
  MapPin,
  Building2,
  Calendar,
  Code2,
  ExternalLink,
} from "lucide-react";
import { soundFx } from "@/utils/sound";
import { GitHubProfile } from "@/types/github";

interface AboutSectionProps {
  profile: GitHubProfile;
  metrics: {
    publicRepos: number;
    followers: number;
    totalStars: number;
    contributionsYear: number;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, metrics }) => {
  const statCards = [
    {
      label: "Public Repositories",
      value: metrics.publicRepos || 20,
      suffix: "+",
      detail: "Clean architecture & OSS",
      icon: FolderGit2,
      color: "text-cyber-cyan",
      borderColor: "border-cyber-cyan/30",
      glowColor: "rgba(0, 229, 255, 0.2)",
    },
    {
      label: "Active Projects",
      value: 12,
      suffix: "+",
      detail: "AI & Full-stack products",
      icon: Cpu,
      color: "text-cyber-violet",
      borderColor: "border-cyber-violet/30",
      glowColor: "rgba(139, 92, 246, 0.2)",
    },
    {
      label: "Technologies Mastered",
      value: 18,
      suffix: "+",
      detail: "Languages, tools & runtimes",
      icon: Layers,
      color: "text-cyber-emerald",
      borderColor: "border-cyber-emerald/30",
      glowColor: "rgba(0, 255, 156, 0.2)",
    },
    {
      label: "Annual Contributions",
      value: metrics.contributionsYear || 384,
      suffix: "+",
      detail: "Commits, PRs & code reviews",
      icon: Sparkles,
      color: "text-sky-400",
      borderColor: "border-sky-500/30",
      glowColor: "rgba(56, 189, 248, 0.2)",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-code mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // IDENTITY PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-4">
            Who I Am
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full" />
        </div>

        {/* Top Grid: Bio Terminal & Strategic Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Terminal Window */}
          <motion.div
            className="lg:col-span-7 rounded-2xl bg-space-850/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-space-900/90 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono-code text-slate-400">
                  nahian@deeptech-core:~
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-cyber-cyan/80 uppercase">
                KERNEL v5.4.1
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-5 sm:p-6 md:p-8 font-mono-code text-xs sm:text-sm text-slate-300 space-y-4">
              <p className="text-xs text-cyber-cyan">
                $ cat developer_manifesto.md
              </p>

              <blockquote className="border-l-2 border-cyber-cyan pl-3 sm:pl-4 text-sm sm:text-base text-slate-100 font-sans leading-relaxed italic">
                &ldquo;I am a passionate developer focused on building scalable
                software, exploring artificial intelligence, and solving real-world
                problems through technology.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                As a versatile software engineer and AI practitioner, I bridge the
                gap between low-level system performance and intuitive high-level user
                experiences. From training custom LLM categorization workflows to
                architecting sub-second reactive web applications, I care deeply about
                clean code, type safety, and product polish.
              </p>

              {/* Meta details list */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs font-mono-code">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <span>Location: <strong className="text-slate-200">{profile.location || "Guangzhou, China / BD"}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Building2 className="w-4 h-4 text-cyber-violet shrink-0" />
                  <span>Role: <strong className="text-slate-200">Founder & CTO, Nahian DeepTech</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4 text-cyber-emerald shrink-0" />
                  <span>Education: <strong className="text-slate-200">Beijing Inst. of Tech</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Focus: <strong className="text-slate-200">LLM Rig & Full-Stack</strong></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Philosophy Cards */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 rounded-2xl bg-space-850/70 border border-white/10 backdrop-blur-md hover:border-cyber-cyan/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Intelligent Systems
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Leveraging frontier LLMs, Retrieval-Augmented Generation (RAG), and
                autonomous agents to transform raw unstructured data into actionable
                business automation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-space-850/70 border border-white/10 backdrop-blur-md hover:border-cyber-violet/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyber-violet/10 text-cyber-violet border border-cyber-violet/20">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Scale & Architecture
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Building resilient backend microservices, real-time telemetry
                trackers, and modular frontend architectures that effortlessly scale
                under production workloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-space-850/70 border border-white/10 backdrop-blur-md hover:border-cyber-emerald/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Radical Craftsmanship
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Refusing to settle for ordinary UX. Implementing tactile micro-interactions,
                3D depth, and sub-100ms responsiveness for an unforgettable user impression.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Animated Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className={`p-4 sm:p-6 rounded-2xl bg-space-850/80 border ${stat.borderColor} backdrop-blur-md relative overflow-hidden group hover:scale-[1.02] transition-all`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => soundFx.playBlip(600 + i * 100, 0.03)}
              >
                <div
                  className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full pointer-events-none opacity-20 blur-xl transition-all group-hover:opacity-40"
                  style={{ background: stat.glowColor }}
                />

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">
                    METRIC // 0{i + 1}
                  </span>
                </div>

                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-1 tracking-tight flex items-baseline">
                  <span>{stat.value}</span>
                  <span className={stat.color}>{stat.suffix}</span>
                </div>

                <div className="font-heading font-semibold text-sm text-slate-200 mb-1">
                  {stat.label}
                </div>

                <div className="text-[11px] font-mono-code text-slate-400">
                  {stat.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
