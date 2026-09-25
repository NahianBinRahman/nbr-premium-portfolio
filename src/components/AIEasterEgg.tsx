"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, X, Cpu, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "@/utils/sound";

interface AIEasterEggProps {
  externalTrigger?: number; // increments to trigger programmatically
}

export const AIEasterEgg: React.FC<AIEasterEggProps> = ({ externalTrigger }) => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keySequenceRef = useRef<string[]>([]);

  const activateEgg = useCallback(() => {
    soundFx.playLaser();
    setTimeout(() => soundFx.playCyberSuccess(), 200);
    setIsActive(true);

    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#00E5FF", "#8B5CF6", "#00FF9C"],
      });
    } catch {}
  }, []);

  // Listen for typing "AI" or "ai"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if currently typing inside an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;

      const char = e.key.toUpperCase();
      if (char.length === 1 && char >= "A" && char <= "Z") {
        keySequenceRef.current.push(char);
        if (keySequenceRef.current.length > 5) {
          keySequenceRef.current.shift();
        }

        const lastTwo = keySequenceRef.current.slice(-2).join("");
        if (lastTwo === "AI") {
          activateEgg();
          keySequenceRef.current = [];
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activateEgg]);

  // Handle external trigger (e.g. from Command Palette)
  useEffect(() => {
    if (externalTrigger && externalTrigger > 0) {
      activateEgg();
    }
  }, [externalTrigger, activateEgg]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01NAHIAN_AI_NEURAL_SYNAPSE_QUANTUM_VECTOR_TENSOR_LLM_TRANSFORMER";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId: number;

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF9C";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillStyle = i % 3 === 0 ? "#00E5FF" : i % 5 === 0 ? "#8B5CF6" : "#00FF9C";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Canvas for digital rain */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-40"
          />

          {/* Holographic Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-lg p-6 md:p-8 rounded-2xl bg-space-850/90 border border-cyber-emerald shadow-[0_0_50px_rgba(0,255,156,0.3)] text-center font-mono-code"
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                soundFx.playBlip(600, 0.05);
                setIsActive(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyber-emerald/10 border border-cyber-emerald/50 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,156,0.4)]">
              <Cpu className="w-8 h-8 text-cyber-emerald animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CLASSIFIED PROTOCOL UNLOCKED</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 tracking-wide">
              AI ARCHITECT OVERDRIVE
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              You discovered Nahian&apos;s hidden easter egg! You have activated the
              autonomous developer neural core. Nahian specializes in LLM engineering,
              automated agent workflows, and low-latency cloud ecosystems.
            </p>

            <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-left text-xs text-cyber-cyan space-y-1 mb-6">
              <p>&gt; [NEURAL_WEIGHTS]: CONVERGED (0.0018 LOSS)</p>
              <p>&gt; [AGENT_FRAMEWORK]: LANGCHAIN + CUSTOM VECTORS</p>
              <p>&gt; [DIRECTIVE]: BUILD EXTRAORDINARY SOFTWARE</p>
            </div>

            <button
              onClick={() => {
                soundFx.playBlip(800, 0.05);
                setIsActive(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-violet text-space-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,255,156,0.4)]"
            >
              Resume Command Session
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
