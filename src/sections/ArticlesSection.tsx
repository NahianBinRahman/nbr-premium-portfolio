"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  Search,
  Sparkles,
  Clock,
  Calendar,
  Tag,
  RefreshCw,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Flame,
  Layers,
} from "lucide-react";
import { soundFx } from "@/utils/sound";
import { FALLBACK_ARTICLES, MEDIUM_PROFILE_URL } from "@/utils/articles";
import { Article, MediumFeedResponse } from "@/types/article";

export const MediumIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 1043.63 592.71"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
  </svg>
);

export const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"live" | "fallback">("fallback");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const fetchArticles = async (isManual = false) => {
    if (isManual) {
      soundFx.playBlip(950, 0.04);
      setLoading(true);
    }
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("HTTP error");
      const data: MediumFeedResponse = await res.json();
      if (data?.articles && data.articles.length > 0) {
        setArticles(data.articles);
        setSource(data.source);
      }
    } catch (err) {
      console.warn("Could not sync live Medium feed, using fallback:", err);
    } finally {
      if (isManual) {
        setTimeout(() => setLoading(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchArticles(false);
  }, []);

  // Adapt 4 cards on desktop, 2 on tablet, 1 on mobile
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

  // Compute unique tag filters
  const allCategories = Array.from(
    new Set(articles.flatMap((a) => a.categories || []))
  ).slice(0, 6);

  const tags = ["All", ...allCategories];

  // Filtered articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === "All" ||
      article.categories.some(
        (c) => c.toLowerCase() === selectedTag.toLowerCase()
      );

    return matchesSearch && matchesTag;
  });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTag, searchQuery]);

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

  const currentArticles = filteredArticles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section
      id="articles"
      className="relative py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-space-950/40 overflow-hidden"
    >
      {/* Background cyber radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-code mb-2.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>05 // KNOWLEDGE TRANSMISSIONS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-2">
            Published Articles & Essays
          </h2>

          <p className="max-w-2xl text-slate-400 text-xs sm:text-sm font-sans mb-4">
            Technical dissections, AI agent architecture, generative video workflows, and production guides published on Medium.
          </p>

          {/* Telemetry Status Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono-code mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-space-900 border border-white/10 text-slate-300 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${source === "live" ? "bg-cyber-emerald animate-ping" : "bg-cyber-cyan"}`} />
              <span>
                MEDIUM FEED:{" "}
                <span className={source === "live" ? "text-cyber-emerald font-bold" : "text-cyber-cyan"}>
                  {source === "live" ? "LIVE // AUTO-SYNCED" : "SYNCHRONIZED"}
                </span>
              </span>
            </div>

            <button
              onClick={() => fetchArticles(true)}
              disabled={loading}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-space-900 border border-white/10 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all active:scale-95 text-[11px] font-mono-code"
              title="Sync live Medium articles"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin text-cyber-cyan" : ""}`} />
              <span>{loading ? "Syncing..." : "Sync"}</span>
            </button>

            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playLaser()}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-all active:scale-95 text-[11px]"
            >
              <MediumIcon className="w-3 h-3" />
              <span>@nahianbinrahman</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full mb-5" />

          {/* Filter and Search Bar */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 max-w-full touch-pan-x w-full md:w-auto">
              {tags.map((tag) => {
                const active = selectedTag.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      soundFx.playBlip(780, 0.03);
                      setSelectedTag(tag);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono-code transition-all duration-200 active:scale-95 ${
                      active
                        ? "bg-space-800 text-cyber-cyan border border-cyber-cyan shadow-[0_0_12px_rgba(0,229,255,0.25)] font-bold"
                        : "bg-space-900/80 text-slate-400 border border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {active && <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-cyan mr-1.5 animate-ping" />}
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-60 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-space-900/90 border border-white/10 rounded-xl pl-8 pr-4 py-1.5 text-xs font-mono-code text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyber-cyan/60 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
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
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] text-slate-300">
              DISPATCHES // <span className="text-cyber-cyan font-semibold">{selectedTag.toUpperCase()}</span>
            </span>
          </div>

          {/* Slideshow Controls */}
          <div className="flex items-center gap-3">
            {/* Page Telemetry */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-space-900/90 border border-white/10 text-xs font-mono-code text-slate-300">
              <span className="text-cyber-cyan font-bold">0{currentPage + 1}</span>
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
                      ? "w-5 bg-cyber-cyan shadow-[0_0_10px_rgba(0,229,255,0.6)]"
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
                    : "border-white/15 bg-space-900/90 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-[0_0_18px_rgba(0,229,255,0.35)] hover:scale-105 active:scale-95"
                }`}
                title="Previous Articles"
                aria-label="Previous Articles"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className={`group relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  currentPage >= totalPages - 1
                    ? "opacity-30 border-white/5 bg-space-950 text-slate-600 cursor-not-allowed"
                    : "border-white/15 bg-space-900/90 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-[0_0_18px_rgba(0,229,255,0.35)] hover:scale-105 active:scale-95"
                }`}
                title="Next Articles"
                aria-label="Next Articles"
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards in a Row Slideshow Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-space-900/40 border border-white/10">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h4 className="text-sm font-heading font-bold text-white mb-1">
              No matching articles found
            </h4>
            <p className="text-xs font-mono-code text-slate-400 mb-3">
              Try adjusting your search query or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
              className="px-3 py-1.5 rounded-lg bg-space-800 border border-white/10 text-xs font-mono-code text-cyber-cyan hover:bg-space-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + selectedTag + searchQuery}
              initial={{ opacity: 0, x: slideDirection * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slideDirection * 40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8"
            >
              {currentArticles.map((article, idx) => (
                <article
                  key={article.id}
                  className="group rounded-2xl bg-space-850/80 border border-white/10 hover:border-cyber-cyan/50 backdrop-blur-xl p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(0,229,255,0.12)] hover:-translate-y-0.5"
                  onMouseEnter={() => soundFx.playBlip(700 + idx * 40, 0.015)}
                >
                  {/* Card Glow Highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-cyan/5 blur-xl rounded-full pointer-events-none group-hover:bg-cyber-cyan/15 transition-all" />

                  <div>
                    {/* Cover Graphic / Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-white/10 group-hover:border-cyber-cyan/30 transition-colors bg-space-950">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-space-900 to-space-950 text-slate-400 group-hover:text-cyber-cyan transition-colors">
                          <BookOpen className="w-6 h-6 mb-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="font-mono-code text-[9px] tracking-wider text-slate-500">
                            MEDIUM DISPATCH
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-space-950/85 via-transparent to-transparent pointer-events-none" />

                      {/* Reading time badge */}
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-space-950/90 backdrop-blur-md border border-white/10 text-[9px] font-mono-code text-slate-300 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-cyber-cyan" />
                        <span>{article.readTime}</span>
                      </div>

                      {/* Featured Flame */}
                      {article.featured && (
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-space-950/90 border border-cyber-cyan/40 text-[9px] font-mono-code text-cyber-cyan flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 text-cyber-cyan" />
                          <span>NEW</span>
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono-code text-slate-400">
                      <span className="inline-flex items-center gap-1 text-cyber-cyan">
                        <Calendar className="w-2.5 h-2.5" />
                        {article.formattedDate}
                      </span>
                      <span className="text-slate-600">//</span>
                      <span className="text-slate-400 truncate max-w-[120px]">
                        {article.categories[0] || "Article"}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs sm:text-sm font-bold font-heading text-white group-hover:text-cyber-cyan transition-colors leading-snug mb-2 line-clamp-2">
                      {article.title}
                    </h4>

                    {/* Snippet */}
                    <p className="text-slate-400 text-[11px] font-sans line-clamp-3 leading-relaxed mb-3">
                      {article.snippet}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.categories.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-space-900 border border-white/5 text-slate-400 text-[9px] font-mono-code"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-slate-400">
                      <MediumIcon className="w-3 h-3 text-cyber-cyan" />
                      <span>Medium</span>
                    </span>

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playLaser()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono-code font-bold text-cyber-cyan hover:text-white group/link transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Compact Bottom Medium Strip */}
        <div className="rounded-xl bg-space-900/80 border border-white/10 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shrink-0 hidden xs:flex">
              <MediumIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-heading font-bold text-white">
                Follow Nahian on Medium for Technical Dispatches
              </p>
              <p className="text-[10px] font-sans text-slate-400">
                In-depth articles covering AI Integrator careers, frontier LLMs, and modern cloud deployment architectures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playLaser()}
              className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-space-850 border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan font-mono-code text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
            >
              <MediumIcon className="w-3.5 h-3.5" />
              <span>Follow @nahianbinrahman</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
