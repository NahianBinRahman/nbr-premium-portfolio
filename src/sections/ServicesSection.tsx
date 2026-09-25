"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Bot,
  Globe,
  Workflow,
  Camera,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Terminal,
  MessageSquare,
} from "lucide-react";
import { soundFx } from "@/utils/sound";

export interface DeepTechService {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  accentColor: string;
  badge: string;
  gradient: string;
}

export const DEEPTECH_SERVICES: DeepTechService[] = [
  {
    id: "ai-agents",
    icon: Bot,
    title: "Autonomous AI Agents & LLM Systems",
    tagline: "Self-Operating Agent Workflows & Cognitive Systems",
    description:
      "Design and deploy production-grade AI agents that understand context, call external tools/APIs, automate multi-step operations, and eliminate repetitive human workload.",
    deliverables: [
      "Custom multi-agent architectures (LangChain, OpenAI, Claude)",
      "Autonomous customer support & ticket triage engines",
      "RAG pipelines with vector databases (Pinecone, Chroma)",
      "Prompt optimization & zero-hallucination validation gates",
    ],
    idealFor: "SaaS platforms, support teams, and startups needing automated operations",
    accentColor: "#00E5FF",
    badge: "FLAGSHIP CAPABILITY",
    gradient: "from-cyan-500/20 via-blue-500/10 to-violet-500/20",
  },
  {
    id: "fullstack-web",
    icon: Globe,
    title: "Full-Stack Web Dev & Landing Pages",
    tagline: "High-Converting Next.js 15 & React Platforms",
    description:
      "Craft modern, blazingly fast digital platforms and landing pages designed to captivate visitors, rank high on search engines, and convert traffic into paying clients.",
    deliverables: [
      "Next.js 15 App Router with instant Server-Side Rendering",
      "Responsive high-converting landing page funnels",
      "Custom admin dashboards & client portals",
      "Seamless payment gateway & checkout integration",
    ],
    idealFor: "Businesses seeking high-conversion web presence & SaaS MVPs",
    accentColor: "#00FF9C",
    badge: "HIGH-CONVERTING",
    gradient: "from-emerald-500/20 via-cyan-500/10 to-blue-500/20",
  },
  {
    id: "crm-automation",
    icon: Workflow,
    title: "Enterprise CRM & Business Automation",
    tagline: "End-to-End Workflow Pipelines & Data Routing",
    description:
      "Connect your disparate sales channels, forms, and ad campaigns into automated lead capture, instant SMS/WhatsApp alerts, and smart SLA escalation pipelines.",
    deliverables: [
      "Omnichannel lead ingestion via webhooks & API connectors",
      "Automated lead scoring, qualification & sales rep routing",
      "Instant transactional email & SMS notification triggers",
      "Interactive sales pipeline Kanban & revenue telemetry",
    ],
    idealFor: "Agencies, e-commerce, and high-volume sales pipelines",
    accentColor: "#8B5CF6",
    badge: "BUSINESS IMPACT",
    gradient: "from-violet-500/20 via-purple-500/10 to-pink-500/20",
  },
  {
    id: "vision-iot",
    icon: Camera,
    title: "Computer Vision & Smart IoT Systems",
    tagline: "Edge Intelligence, Biometric Vision & Device Control",
    description:
      "Bridge hardware and cloud with intelligent edge vision systems—from automated school/office face attendance to smart home remote security telemetry.",
    deliverables: [
      "Sub-second face recognition & biometric check-in pipelines",
      "Edge AI camera motion analysis & false-alarm filtration",
      "Real-time video streaming with WebRTC & MQTT relays",
      "Mobile companion apps (React Native) for remote hardware control",
    ],
    idealFor: "Schools, residential security, factories, and smart facilities",
    accentColor: "#38BDF8",
    badge: "EDGE INTELLIGENCE",
    gradient: "from-sky-500/20 via-cyan-500/10 to-indigo-500/20",
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud Infrastructure & CI/CD Deployment",
    tagline: "Scalable Vercel, Railway, Docker & Edge Runtimes",
    description:
      "Bulletproof infrastructure setups ensuring zero downtime, instant rollbacks, automated GitHub CI/CD testing, and sub-100ms global edge delivery.",
    deliverables: [
      "Vercel Edge & Railway production deployments",
      "Dockerized container builds for reproducible environments",
      "PostgreSQL, Redis & vector database schema architecture",
      "Custom domain, SSL, and server health telemetry monitors",
    ],
    idealFor: "Founders needing reliable, zero-downtime deployment pipelines",
    accentColor: "#F59E0B",
    badge: "ZERO DOWNTIME",
    gradient: "from-amber-500/20 via-orange-500/10 to-emerald-500/20",
  },
];

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("ai-agents");

  const activeService =
    DEEPTECH_SERVICES.find((s) => s.id === selectedService) || DEEPTECH_SERVICES[0];

  const handleInquire = (serviceTitle: string) => {
    soundFx.playLaser();
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-space-950/80 overflow-hidden"
    >
      {/* Background Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-cyber-cyan/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-code mb-3 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Zap className="w-3.5 h-3.5" />
            <span>02 // SERVICES BY NAHIAN DEEPTECH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-3">
            What We Build & Automate
          </h2>

          <p className="max-w-2xl text-slate-400 text-sm sm:text-base font-sans mb-6">
            Turnkey AI systems, high-converting digital platforms, and custom business automations engineered to help companies launch faster and scale effortlessly.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full" />
        </div>

        {/* 2-Column Landing Page Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
          {/* Left Column: Interactive Service Selector Menu */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-[11px] font-mono-code text-slate-500 uppercase tracking-widest mb-1 px-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>CORE CAPABILITIES // SELECT TO EXPAND</span>
            </p>

            {DEEPTECH_SERVICES.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    soundFx.playBlip(750, 0.03);
                    setSelectedService(service.id);
                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      setTimeout(() => {
                        const detailElem = document.getElementById("service-showcase-detail");
                        if (detailElem) {
                          detailElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                      }, 50);
                    }
                  }}
                  className={`group text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-space-850 border-cyber-cyan/60 shadow-[0_0_20px_rgba(0,229,255,0.18)]"
                      : "bg-space-900/60 border-white/10 hover:border-white/20 hover:bg-space-850/60"
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-cyan via-white to-cyber-emerald" />
                  )}

                  <div
                    className={`p-2.5 rounded-xl border shrink-0 transition-transform duration-300 ${
                      isSelected
                        ? "bg-space-800 border-cyber-cyan/40 scale-110 shadow-cyan-glow"
                        : "bg-space-850 border-white/10 group-hover:scale-105"
                    }`}
                    style={{ color: service.accentColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3
                        className={`font-heading font-bold text-sm sm:text-base leading-snug transition-colors ${
                          isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider shrink-0 hidden xs:inline">
                        {service.badge}
                      </span>
                    </div>

                    <p className="text-xs font-mono-code text-slate-400 line-clamp-1">
                      {service.tagline}
                    </p>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-all duration-300 self-center ${
                      isSelected
                        ? "text-cyber-cyan translate-x-1"
                        : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed DeepTech Service Showcase Card */}
          <div id="service-showcase-detail" className="lg:col-span-7 scroll-mt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-space-850/90 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between h-full shadow-2xl"
              >
                {/* Ambient Card Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${activeService.gradient} opacity-20 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Top Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold border"
                      style={{
                        backgroundColor: `${activeService.accentColor}15`,
                        borderColor: `${activeService.accentColor}40`,
                        color: activeService.accentColor,
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{activeService.badge}</span>
                    </span>

                    <span className="text-xs font-mono-code text-slate-400">
                      SERVICE SPECIFICATION
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-code text-cyber-cyan mb-4">
                    // {activeService.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                    {activeService.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-space-900/90 border border-white/10">
                    <p className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" />
                      <span>WHAT YOU GET // TANGIBLE DELIVERABLES</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-200 font-sans"
                        >
                          <span className="text-cyber-cyan font-mono mt-0.5">&gt;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For Target Box */}
                  <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-code text-slate-400 mb-6 flex items-center gap-2">
                    <span className="text-cyber-emerald font-bold">BEST FOR:</span>
                    <span className="text-slate-300">{activeService.idealFor}</span>
                  </div>
                </div>

                {/* Bottom CTA Action Bar */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400 text-center sm:text-left">
                    <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
                    <span>Now accepting clients for Q4 / 2026</span>
                  </div>

                  <button
                    onClick={() => handleInquire(activeService.title)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan text-space-950 font-heading font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-cyan-glow-lg transition-all active:scale-95"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-4 h-4 text-space-950" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4-Step Engineering Delivery Pipeline (Landing Page Trust / Vibe) */}
        <div className="rounded-2xl sm:rounded-3xl bg-space-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-[10px] font-mono-code text-cyber-cyan uppercase tracking-widest">
                EXECUTION PROTOCOL
              </p>
              <h3 className="font-heading font-bold text-lg text-white">
                How Nahian DeepTech Delivers
              </h3>
            </div>
            <span className="text-xs font-mono-code text-slate-400">
              AVERAGE TURNAROUND: 1 - 3 WEEKS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                name: "Discovery & Strategy",
                desc: "We analyze your bottlenecks, user journey, and define the high-impact AI/tech architecture.",
              },
              {
                step: "02",
                name: "Rapid Prototyping",
                desc: "Fast interactive MVP build with real-time feedback loops so you see tangible progress within days.",
              },
              {
                step: "03",
                name: "AI & System Integration",
                desc: "Connecting frontier LLM models, APIs, databases, webhooks, and automated data pipelines.",
              },
              {
                step: "04",
                name: "Launch & Ongoing Scale",
                desc: "Deploying to production on edge infrastructure with zero downtime and continuous telemetry monitoring.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-4 rounded-xl bg-space-850/80 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-code text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-emerald">
                    {st.step}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-white mt-1 mb-2">
                    {st.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
