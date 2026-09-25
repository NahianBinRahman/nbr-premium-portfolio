"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, Sparkles, CircleDot, MapPin, Building2, Briefcase } from "lucide-react";
import { TIMELINE_EVENTS } from "@/utils/github";
import { soundFx } from "@/utils/sound";

export const TimelineSection: React.FC = () => {
  return (
    <section
      id="timeline"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-code mb-4">
            <History className="w-3.5 h-3.5" />
            <span>06 // EVOLUTIONARY TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-4">
            Engineering Journey
          </h2>
          <p className="max-w-xl text-slate-400 text-sm sm:text-base font-sans mb-6">
            A chronological timeline of milestones, technological transformations,
            and continuous exploration.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full" />
        </div>

        {/* Timeline Track */}
        <div className="relative">
          {/* Vertical Glowing Beam */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-violet to-cyber-emerald shadow-[0_0_12px_rgba(0,229,255,0.5)]" />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-8 group`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => soundFx.playBlip(700 + index * 80, 0.02)}
                >
                  {/* Glowing Node in Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 z-20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-space-950 border-2 border-cyber-cyan shadow-cyan-glow group-hover:scale-125 transition-transform flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-9 sm:ml-0 w-[calc(100%-2.25rem)] sm:w-1/2 ${
                      isEven ? "sm:pl-10 text-left" : "sm:pr-10 sm:text-right text-left"
                    }`}
                  >
                    <div className="p-4 sm:p-6 rounded-2xl bg-space-850/80 border border-white/10 group-hover:border-cyber-cyan/40 backdrop-blur-xl transition-all duration-300 group-hover:shadow-cyan-glow">
                      {/* Year & Badge */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-2 ${
                          isEven ? "justify-start" : "sm:justify-end"
                        }`}
                      >
                        <span className="text-lg sm:text-xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-emerald">
                          {event.year}
                        </span>
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyber-violet">
                          {event.badge}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-heading font-bold text-lg text-white mb-1">
                        {event.role || event.title}
                      </h3>

                      {event.company && (
                        <div
                          className={`flex flex-wrap items-center gap-2 text-xs font-mono-code mb-2.5 ${
                            isEven ? "justify-start" : "sm:justify-end"
                          }`}
                        >
                          <span className="flex items-center gap-1 text-cyber-cyan font-semibold">
                            <Building2 className="w-3.5 h-3.5 text-cyber-cyan" />
                            <span>{event.company}</span>
                          </span>
                          {event.location && (
                            <>
                              <span className="text-slate-600">·</span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                <span>{event.location}</span>
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        {event.description}
                      </p>

                      <div
                        className={`mt-3 pt-3 border-t border-white/5 text-[10px] font-mono-code text-slate-500 uppercase tracking-widest ${
                          isEven ? "text-left" : "sm:text-right"
                        }`}
                      >
                        // {event.category}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
