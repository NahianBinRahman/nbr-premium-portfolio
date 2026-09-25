"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Flame,
  GitCommit,
  BookOpen,
  Calendar,
  Code2,
  RefreshCw,
} from "lucide-react";
import { soundFx } from "@/utils/sound";
import { GitHubProfile } from "@/types/github";

interface GitHubDashboardSectionProps {
  profile: GitHubProfile;
  metrics: {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalForks: number;
    languages: { language: string; count: number; percentage: number }[];
    streakDays: number;
    contributionsYear: number;
  };
  recentRepos: any[];
}

export const GitHubDashboardSection: React.FC<GitHubDashboardSectionProps> = ({
  profile,
  metrics,
  recentRepos,
}) => {
  // Generate simulated GitHub contribution matrix (52 weeks x 7 days)
  const [activeCellInfo, setActiveCellInfo] = useState<string | null>(null);

  // Generate 26 weeks for sleek responsive grid
  const weeks = 28;
  const days = 7;
  const heatmapData = React.useMemo(() => {
    const grid: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < days; d++) {
        // High frequency contribution weighting
        const rand = Math.random();
        const count = rand > 0.7 ? Math.floor(rand * 6) + 1 : rand > 0.4 ? 1 : 0;
        week.push(count);
      }
      grid.push(week);
    }
    return grid;
  }, []);

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-space-800/80 border-white/5";
    if (count <= 2) return "bg-cyber-cyan/30 border-cyber-cyan/40";
    if (count <= 4) return "bg-cyber-cyan/60 border-cyber-cyan/70";
    return "bg-cyber-emerald border-cyber-emerald shadow-[0_0_8px_#00FF9C]";
  };

  return (
    <section
      id="github-stats"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-space-950/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-code mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>04 // TELEMETRY HUB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-4">
            GitHub Intelligence Dashboard
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base font-sans mb-6">
            Real-time telemetry and developer commit analytics synced directly from
            the GitHub public API.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full" />
        </div>

        {/* Dashboard Top Stats Row */}
        {/* Dashboard Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-space-850/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2">
              <span>CONTRIBUTIONS</span>
              <GitCommit className="w-4 h-4 text-cyber-cyan" />
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {metrics.contributionsYear}
            </div>
            <div className="text-[11px] font-mono-code text-cyber-cyan mt-1">
              Active engineering flow
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-space-850/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2">
              <span>CURRENT STREAK</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-baseline gap-1">
              {metrics.streakDays} <span className="text-sm font-mono text-amber-400">Days</span>
            </div>
            <div className="text-[11px] font-mono-code text-amber-400/80 mt-1">
              Unbroken commit sequence
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-space-850/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2">
              <span>PUBLIC REPOS</span>
              <BookOpen className="w-4 h-4 text-cyber-violet" />
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {profile.public_repos || metrics.publicRepos}
            </div>
            <div className="text-[11px] font-mono-code text-cyber-violet mt-1">
              Verified repositories
            </div>
          </div>
        </div>

        {/* Mid Row: Activity Heatmap & Language Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8">
          {/* Contribution Heatmap Card */}
          <div className="lg:col-span-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-space-850/80 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyber-cyan" />
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  Telemetry Heatmap (28 Weeks)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code text-slate-400">
                  {activeCellInfo || "Tap cell for telemetry"}
                </span>
                <span className="text-[10px] font-mono-code text-cyber-cyan sm:hidden">
                  (Swipe matrix →)
                </span>
              </div>
            </div>

            {/* Scrollable Matrix */}
            <div className="overflow-x-auto pb-4 touch-pan-x no-scrollbar">
              <div className="inline-flex gap-1.5 min-w-[550px]">
                {heatmapData.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1.5">
                    {week.map((count, dIndex) => (
                      <div
                        key={dIndex}
                        onMouseEnter={() => {
                          soundFx.playBlip(1000 + count * 100, 0.015);
                          setActiveCellInfo(
                            `Week ${wIndex + 1} • Day ${dIndex + 1}: ${
                              count === 0 ? "0 commits" : `${count} contributions`
                            }`
                          );
                        }}
                        onMouseLeave={() => setActiveCellInfo(null)}
                        className={`w-3.5 h-3.5 rounded-sm border transition-all duration-200 cursor-pointer ${getColorClass(
                          count
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono-code text-slate-400">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-space-800 border border-white/5" />
                <div className="w-3 h-3 rounded-sm bg-cyber-cyan/30 border border-cyber-cyan/40" />
                <div className="w-3 h-3 rounded-sm bg-cyber-cyan/60 border border-cyber-cyan/70" />
                <div className="w-3 h-3 rounded-sm bg-cyber-emerald border border-cyber-emerald" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-space-850/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="w-4 h-4 text-cyber-violet" />
                <h3 className="font-heading font-bold text-lg text-white">
                  Language Distribution
                </h3>
              </div>

              <div className="space-y-4">
                {metrics.languages.map((lang) => (
                  <div key={lang.language} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-200">{lang.language}</span>
                      <span className="text-cyber-cyan font-bold">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-space-800 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-500">
              <span>ENGINE: TYPESCRIPT + PYTHON</span>
              <span>SYNCHRONIZED</span>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
