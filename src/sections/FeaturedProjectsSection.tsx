"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Globe,
  Radio,
  Zap,
} from "lucide-react";
import { soundFx } from "@/utils/sound";
import { CASE_STUDIES } from "@/utils/casestudies";
import { CaseStudy, CaseStudyCategory } from "@/types/casestudy";

export const FeaturedProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<CaseStudyCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const categories: CaseStudyCategory[] = [
    "All",
    "AI & Agents",
    "Web Dev",
    "Admin & CRM",
    "Mobile & IoT",
    "Automation",
  ];

  // Dynamically adapt cards per row (4 on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredStudies = CASE_STUDIES.filter((item) => {
    const matchesFilter = filter === "All" || item.category === filter;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudies.length / itemsPerPage));

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [filter, searchQuery]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      soundFx.playBlip(850, 0.03);
      setSlideDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      soundFx.playBlip(750, 0.03);
      setSlideDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageIdx: number) => {
    soundFx.playBlip(800, 0.02);
    setSlideDirection(pageIdx > currentPage ? 1 : -1);
    setCurrentPage(pageIdx);
  };

  const currentStudies = filteredStudies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const toggleExpand = (id: string) => {
    soundFx.playBlip(800, 0.02);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="relative py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-space-950/60 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyber-emerald/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono-code mb-2.5 shadow-[0_0_15px_rgba(0,255,156,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // LATEST CASE STUDIES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-2">
            Latest Case Studies
          </h2>

          <p className="max-w-2xl text-slate-400 text-xs sm:text-sm font-sans mb-4">
            Production systems across Vision AI, IoT security, enterprise CRM automation, and high-performance Vercel deployments.
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full mb-5" />

          {/* Filter & Search Bar */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 max-w-full touch-pan-x w-full md:w-auto">
              {categories.map((cat) => {
                const isSelected = filter === cat;
                return (
                  <button
                    key={cat}
                    onMouseEnter={() => soundFx.playBlip(750, 0.04)}
                    onClick={() => {
                      soundFx.playBlip(750, 0.03);
                      setFilter(cat);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono-code transition-all duration-200 relative whitespace-nowrap active:scale-95 ${
                      isSelected
                        ? "bg-space-800 text-cyber-emerald border border-cyber-emerald shadow-[0_0_12px_rgba(0,255,156,0.25)] font-bold"
                        : "bg-space-900/80 text-slate-400 border border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-emerald mr-1.5 animate-ping" />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-60 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case studies..."
                className="w-full bg-space-900/90 border border-white/10 rounded-xl pl-8 pr-4 py-1.5 text-xs font-mono-code text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyber-emerald/60 focus:ring-1 focus:ring-cyber-emerald/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Slideshow HUD Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] text-slate-300">
              DISPATCHES // <span className="text-cyber-emerald font-semibold">{filter.toUpperCase()}</span>
            </span>
          </div>

          {/* Slideshow Controls */}
          <div className="flex items-center gap-3">
            {/* Page Telemetry */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-space-900/90 border border-white/10 text-xs font-mono-code text-slate-300">
              <span className="text-cyber-emerald font-bold">0{currentPage + 1}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">0{totalPages}</span>
            </div>

            {/* Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => goToPage(pIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentPage === pIdx
                      ? "w-5 bg-cyber-emerald shadow-[0_0_10px_rgba(0,255,156,0.6)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${pIdx + 1}`}
                />
              ))}
            </div>

            {/* Premium Arrow Navigation Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`group relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  currentPage === 0
                    ? "opacity-30 border-white/5 bg-space-950 text-slate-600 cursor-not-allowed"
                    : "border-white/15 bg-space-900/90 text-slate-300 hover:text-cyber-emerald hover:border-cyber-emerald hover:shadow-[0_0_18px_rgba(0,255,156,0.35)] hover:scale-105 active:scale-95"
                }`}
                title="Previous Case Studies"
                aria-label="Previous Case Studies"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className={`group relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  currentPage >= totalPages - 1
                    ? "opacity-30 border-white/5 bg-space-950 text-slate-600 cursor-not-allowed"
                    : "border-white/15 bg-space-900/90 text-slate-300 hover:text-cyber-emerald hover:border-cyber-emerald hover:shadow-[0_0_18px_rgba(0,255,156,0.35)] hover:scale-105 active:scale-95"
                }`}
                title="Next Case Studies"
                aria-label="Next Case Studies"
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards in a Row Slideshow Grid */}
        {filteredStudies.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-space-900/40 border border-white/10">
            <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h4 className="text-sm font-heading font-bold text-white mb-1">
              No matching case studies
            </h4>
            <p className="text-xs font-mono-code text-slate-400 mb-3">
              Try adjusting your search query or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("All");
              }}
              className="px-3 py-1.5 rounded-lg bg-space-800 border border-white/10 text-xs font-mono-code text-cyber-emerald hover:bg-space-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + filter + searchQuery}
              initial={{ opacity: 0, x: slideDirection * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slideDirection * 40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8"
            >
              {currentStudies.map((study, idx) => {
                const isExpanded = expandedId === study.id;

                return (
                  <div
                    key={study.id}
                    className="group rounded-2xl bg-space-850/80 border border-white/10 hover:border-cyber-emerald/50 backdrop-blur-xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(0,255,156,0.12)] hover:-translate-y-0.5"
                    onMouseEnter={() => soundFx.playCardHover(idx * 30)}
                  >
                    {/* Subtle hover gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        study.gradient || "from-emerald-500/10 via-transparent to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />

                    <div className="relative z-10">
                      {/* Top Telemetry Header */}
                      <div className="flex items-center justify-between gap-1.5 mb-2.5">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-space-900 border border-white/10 text-[9px] font-mono-code text-cyber-emerald font-semibold truncate max-w-[130px]">
                          <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{study.badge || study.category}</span>
                        </div>

                        <span className="text-[9px] font-mono-code text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 px-1.5 py-0.5 rounded font-bold shrink-0">
                          {study.metrics}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-sm text-white group-hover:text-cyber-emerald transition-colors leading-snug mb-1 line-clamp-1">
                        {study.title}
                      </h3>

                      {/* Client / Tagline */}
                      <p className="text-[10px] font-mono-code text-slate-400 mb-2 truncate">
                        {study.client ? `// Client: ${study.client}` : `// ${study.tagline}`}
                      </p>

                      {/* Compact Summary */}
                      <p className="text-slate-300 text-[11px] leading-relaxed mb-3 font-sans line-clamp-3">
                        {study.summary}
                      </p>

                      {/* Expandable Architecture Specs Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden mb-3 p-2.5 rounded-xl bg-space-900/90 border border-white/10 text-xs"
                          >
                            <div className="text-[9px] font-mono-code text-cyber-emerald uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Terminal className="w-2.5 h-2.5" />
                              <span>SPECS</span>
                            </div>
                            <ul className="space-y-1 text-slate-300 text-[10px] font-sans">
                              {study.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-cyber-emerald font-mono">&gt;</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {study.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded bg-space-900 border border-white/5 text-[9px] font-mono-code text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {study.tags.length > 3 && (
                          <span className="px-1 py-0.5 rounded bg-space-900 border border-white/5 text-[9px] font-mono-code text-slate-500">
                            +{study.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact Bottom Actions */}
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-1.5 relative z-10">
                      <button
                        onClick={() => toggleExpand(study.id)}
                        className="inline-flex items-center gap-0.5 text-[10px] font-mono-code text-slate-400 hover:text-white transition-colors"
                        title="Toggle specs"
                      >
                        <span>{isExpanded ? "Hide" : "Specs"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-2.5 h-2.5 text-cyber-emerald" />
                        ) : (
                          <ChevronDown className="w-2.5 h-2.5" />
                        )}
                      </button>

                      <div className="flex items-center gap-1.5">
                        {study.githubUrl && !study.liveUrl && (
                          <a
                            href={study.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => soundFx.playLaser()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-space-900 border border-white/10 text-[11px] font-mono-code text-slate-300 hover:border-cyber-emerald hover:text-cyber-emerald transition-all active:scale-95"
                            title="Inspect Code"
                          >
                            <Github className="w-3 h-3" />
                            <span>Code</span>
                          </a>
                        )}

                        {study.liveUrl && (
                          <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => soundFx.playLaser()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyber-emerald to-cyber-cyan text-space-950 font-mono-code text-[11px] font-bold shadow-[0_0_10px_rgba(0,255,156,0.3)] hover:shadow-emerald-glow transition-all active:scale-95"
                            title="Launch Live Deployment"
                          >
                            <Globe className="w-2.5 h-2.5" />
                            <span>Launch</span>
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Compact Bottom Strip */}
        <div className="rounded-xl bg-space-900/80 border border-white/10 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="p-1.5 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald shrink-0 hidden xs:flex">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-heading font-bold text-white">
                Looking for Custom Engineering, AI Integration or Web Apps?
              </p>
              <p className="text-[10px] font-sans text-slate-400">
                Full-stack Next.js platforms, edge computer vision, and autonomous agent systems deployed to production.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="https://github.com/NahianBinRahman?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playLaser()}
              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-space-850 border border-white/10 hover:border-cyber-cyan text-xs font-mono-code text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1"
            >
              <Github className="w-3 h-3 text-cyber-cyan" />
              <span>All Repos</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playLaser();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyber-emerald via-white to-cyber-cyan text-space-950 font-heading font-extrabold text-xs flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(0,255,156,0.3)] transition-all active:scale-95"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="w-3 h-3 text-space-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
