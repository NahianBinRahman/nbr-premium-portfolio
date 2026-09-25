"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  Sparkles,
  Terminal,
  ExternalLink,
  MessageSquare,
  MapPin,
  Building2,
} from "lucide-react";
import { soundFx } from "@/utils/sound";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const email = "nahianbinrahman@gmail.com";
  const companyAddress = "L-10, Software Technology Park, Agrabad, Chattogram, Bangladesh";

  const handleCopy = () => {
    soundFx.playLaser();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyAddress = () => {
    soundFx.playLaser();
    navigator.clipboard.writeText(companyAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCyberSuccess();
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject || "Collaboration with Nahian Bin Rahman"
    )}&body=${encodeURIComponent(message || "Hi Nahian, I came across your portfolio...")}`;
    window.location.href = mailto;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative pt-20 sm:pt-28 pb-32 sm:pb-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background Neon Halo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-radial from-cyber-cyan/15 via-cyber-violet/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-800 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono-code mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>07 // TRANSMISSION TERMINAL</span>
          </div>

          <motion.h2
            className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-emerald text-glow-cyan">
              extraordinary.
            </span>
          </motion.h2>

          <p className="max-w-xl text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            Whether you are looking to develop an intelligent AI application, scale a
            production platform, or collaborate on groundbreaking research — my
            inbox is open.
          </p>
        </div>

        {/* Transmission Terminal & Social Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Direct Interactive Transmission Terminal */}
          <motion.div
            className="lg:col-span-7 rounded-3xl bg-space-850/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyber-cyan" />
                  <span className="font-mono-code text-xs font-semibold text-slate-200 uppercase">
                    DIRECT DISPATCH PROTOCOL
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-cyber-emerald flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-ping" />
                  ENCRYPTED CHANNEL
                </span>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    TRANSMISSION SUBJECT
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. AI Architecture Collaboration / Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-space-900 border border-white/10 text-slate-100 text-base sm:text-sm font-sans focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    MESSAGE PAYLOAD
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your transmission details..."
                    className="w-full px-4 py-3 rounded-xl bg-space-900 border border-white/10 text-slate-100 text-base sm:text-sm font-sans focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan text-space-950 font-heading font-black text-sm tracking-wide hover:shadow-cyan-glow-lg transition-all flex items-center justify-center gap-2 active:scale-98 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  <Send className="w-4 h-4 text-space-950" />
                  <span>Send Direct Transmission</span>
                  <span className="w-2 h-2 rounded-full bg-space-950 animate-ping" />
                </button>

                {isSent && (
                  <p className="text-xs font-mono-code text-cyber-emerald text-center mt-2">
                    ✓ Mail client initiated. Connecting uplink...
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Fast Channels & Headquarters Info */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Quick Copy Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-space-850/80 border border-white/10 backdrop-blur-xl hover:border-cyber-cyan/40 transition-all">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-widest block mb-2">
                OFFICIAL ELECTRONIC MAIL
              </span>
              <div className="font-mono-code text-sm sm:text-base text-white font-bold mb-4 break-all">
                {email}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleCopy}
                  className="w-full py-3 px-4 rounded-xl bg-space-800 border border-cyber-cyan/30 text-xs font-mono-code text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors flex items-center justify-center gap-2 active:scale-98"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
                <a
                  href={`mailto:${email}?subject=Collaboration Inquiry`}
                  onClick={() => soundFx.playLaser()}
                  className="w-full py-3 px-4 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/40 text-xs font-mono-code text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors flex items-center justify-center gap-2 active:scale-98"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open Mail App</span>
                </a>
              </div>
            </div>

            {/* Nahian DeepTech Headquarters Card */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-space-850/80 border border-white/10 backdrop-blur-xl hover:border-cyber-emerald/40 transition-all">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono-code text-cyber-emerald uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Building2 className="w-3.5 h-3.5 text-cyber-emerald" />
                  NAHIAN DEEPTECH HQ // LOCATION
                </span>
                <span className="text-[10px] font-mono-code text-cyber-cyan flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                  CHATTOGRAM HUB
                </span>
              </div>
              <div className="flex items-start gap-3 mt-3">
                <div className="p-2.5 rounded-xl bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading font-bold text-white text-sm sm:text-base leading-tight">
                    Software Technology Park
                  </h4>
                  <p className="text-xs sm:text-sm font-mono-code text-slate-300 mt-1 leading-relaxed">
                    {companyAddress}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="py-2 px-3 rounded-lg bg-space-800 border border-cyber-emerald/30 text-[11px] font-mono-code text-cyber-emerald hover:bg-cyber-emerald/10 transition-colors flex items-center gap-1.5"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? "Address Copied!" : "Copy Address"}</span>
                </button>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Software+Technology+Park+Agrabad+Chattogram+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono-code text-slate-300 hover:text-white hover:border-cyber-cyan/40 transition-colors flex items-center gap-1.5"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Social Network Channels Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* GitHub */}
              <a
                href="https://github.com/NahianBinRahman"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playLaser()}
                className="p-3.5 rounded-2xl bg-space-850/80 border border-white/10 hover:border-cyber-cyan/40 hover:shadow-cyan-glow transition-all group flex flex-col items-center text-center gap-2"
                title="GitHub @NahianBinRahman"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-cyber-cyan group-hover:border-cyber-cyan/30 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="font-heading font-bold text-xs text-white group-hover:text-cyber-cyan transition-colors truncate">
                    GitHub
                  </h4>
                  <p className="text-[10px] font-mono-code text-slate-400 truncate">
                    @Nahian
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/nahian-bin-rahman/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playLaser()}
                className="p-3.5 rounded-2xl bg-space-850/80 border border-white/10 hover:border-cyber-violet/40 hover:shadow-violet-glow transition-all group flex flex-col items-center text-center gap-2"
                title="LinkedIn in/nahian-bin-rahman"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-cyber-violet group-hover:border-cyber-violet/30 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="font-heading font-bold text-xs text-white group-hover:text-cyber-violet transition-colors truncate">
                    LinkedIn
                  </h4>
                  <p className="text-[10px] font-mono-code text-slate-400 truncate">
                    Connect
                  </p>
                </div>
              </a>

              {/* Medium */}
              <a
                href="https://medium.com/@nahianbinrahman"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playLaser()}
                className="p-3.5 rounded-2xl bg-space-850/80 border border-white/10 hover:border-cyber-cyan/40 hover:shadow-cyan-glow transition-all group flex flex-col items-center text-center gap-2"
                title="Medium @nahianbinrahman"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-cyber-cyan group-hover:border-cyber-cyan/30 transition-colors">
                  <svg
                    viewBox="0 0 1043.63 592.71"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                  </svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="font-heading font-bold text-xs text-white group-hover:text-cyber-cyan transition-colors truncate">
                    Medium
                  </h4>
                  <p className="text-[10px] font-mono-code text-slate-400 truncate">
                    Articles
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

