"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/utils/sound";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const BOOT_STEPS = [
  "Mounting Quantum Core System...",
  "Calibrating Neural Synapses...",
  "Decrypting GitHub Telemetry [NahianBinRahman]...",
  "Configuring Antigravity Developer HUD...",
  "Universe Initialized. Access Granted.",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundFx.playCyberSuccess();
            setIsDone(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);

        const currentStep = Math.min(
          Math.floor((next / 100) * BOOT_STEPS.length),
          BOOT_STEPS.length - 1
        );
        setStepIndex(currentStep);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] text-slate-100 font-mono-code select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle background cyber grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Central Holographic Container */}
          <div className="relative z-10 w-full max-w-md px-6 text-center">
            {/* Pulsing Orb */}
            <div className="relative mx-auto mb-8 w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-cyber-cyan/30 animate-ping opacity-75" />
              <div className="absolute inset-2 rounded-full border border-cyber-violet/50 animate-spin-slow" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-cyan to-cyber-emerald shadow-cyan-glow animate-pulse" />
            </div>

            {/* Title */}
            <motion.h2
              className="text-xl md:text-2xl font-semibold tracking-wider text-slate-100 font-heading mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Initializing Nahian&apos;s Digital Universe...
            </motion.h2>

            {/* Current Step Status */}
            <p className="text-xs md:text-sm text-cyber-cyan/80 min-h-[20px] mb-6 font-mono-code tracking-wide">
              &gt; {BOOT_STEPS[stepIndex]}
            </p>

            {/* Progress Bar Container */}
            <div className="relative w-full h-2 bg-space-800 rounded-full overflow-hidden border border-white/10 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-emerald rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px] shadow-[0_0_10px_#fff]" />
              </motion.div>
            </div>

            {/* Diagnostics Stats */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-widest font-mono-code">
              <span>SECURITY: ENCRYPTED</span>
              <span className="text-cyber-cyan font-bold">{progress}%</span>
              <span>NODE: BANG-01</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
