import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#020408",
          900: "#050505",
          850: "#080c14",
          800: "#0B1120",
          700: "#131d33",
          600: "#1E293B",
        },
        cyber: {
          cyan: "#00E5FF",
          cyanGlow: "rgba(0, 229, 255, 0.4)",
          violet: "#8B5CF6",
          violetGlow: "rgba(139, 92, 246, 0.4)",
          emerald: "#00FF9C",
          emeraldGlow: "rgba(0, 255, 156, 0.4)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(0, 229, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 229, 255, 0.5)",
        "cyan-glow-lg": "0 0 50px -5px rgba(0, 229, 255, 0.4)",
        "violet-glow": "0 0 25px -5px rgba(139, 92, 246, 0.5)",
        "emerald-glow": "0 0 25px -5px rgba(0, 255, 156, 0.5)",
        "glass-inset": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "pulse-glow": "pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "radar-sweep": "radarSweep 4s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
