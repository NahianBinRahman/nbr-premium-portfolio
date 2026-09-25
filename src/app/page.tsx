"use client";

import React, { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThreeHeroBackground } from "@/components/ThreeHeroBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ScrollProgressHUD } from "@/components/ScrollProgressHUD";
import { MobileActionDock } from "@/components/MobileActionDock";
import { BackToTopButton } from "@/components/BackToTopButton";
import { CommandPalette } from "@/components/CommandPalette";
import { AIEasterEgg } from "@/components/AIEasterEgg";
import { Footer } from "@/components/Footer";

import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { FeaturedProjectsSection } from "@/sections/FeaturedProjectsSection";
import { GitHubDashboardSection } from "@/sections/GitHubDashboardSection";
import { ArticlesSection } from "@/sections/ArticlesSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ContactSection } from "@/sections/ContactSection";

import { FALLBACK_PROFILE } from "@/utils/github";
import { GitHubProfile } from "@/types/github";

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile>(FALLBACK_PROFILE);
  const [metrics, setMetrics] = useState({
    publicRepos: 20,
    followers: 12,
    following: 15,
    totalStars: 8,
    totalForks: 3,
    languages: [
      { language: "TypeScript", count: 10, percentage: 48 },
      { language: "Python", count: 7, percentage: 33 },
      { language: "JavaScript", count: 3, percentage: 14 },
      { language: "HTML/CSS", count: 1, percentage: 5 },
    ],
    streakDays: 42,
    contributionsYear: 384,
  });
  const [recentRepos, setRecentRepos] = useState<any[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [easterEggTrigger, setEasterEggTrigger] = useState(0);

  // Fetch live GitHub data
  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data?.profile) setProfile(data.profile);
        if (data?.metrics) setMetrics(data.metrics);
        if (data?.recentRepos) setRecentRepos(data.recentRepos);
      })
      .catch((err) => {
        console.warn("Using offline fallback profile:", err);
      });
  }, []);

  return (
    <main className="relative min-h-screen bg-space-950 text-slate-100 selection:bg-cyber-cyan selection:text-space-950">
      {/* Cinematic Boot Sequence Loading Screen */}
      <LoadingScreen />

      {/* Futuristic WebGL 3D Background */}
      <ThreeHeroBackground />

      {/* Cyber Glowing Cursor */}
      <CustomCursor />

      {/* Interactive HUD Scroll Bar & Telemetry */}
      <ScrollProgressHUD />

      {/* Floating HUD Navbar */}
      <Navbar
        onOpenCommandPalette={() => {
          const evt = new KeyboardEvent("keydown", { key: "/" });
          window.dispatchEvent(evt);
        }}
        onTriggerEasterEgg={() => setEasterEggTrigger((prev) => prev + 1)}
      />

      {/* Main Sections */}
      <div className="relative z-10 pb-16 md:pb-0">
        <HeroSection
          profile={profile}
          onOpenContact={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <AboutSection profile={profile} metrics={metrics} />

        <ServicesSection />

        <TechStackSection />

        <FeaturedProjectsSection />

        <GitHubDashboardSection
          profile={profile}
          metrics={metrics}
          recentRepos={recentRepos}
        />

        <ArticlesSection />

        <TimelineSection />

        <ContactSection />

        <Footer />
      </div>

      {/* Floating Mobile Action Dock (High-converting bottom CTAs on mobile) */}
      <MobileActionDock />

      {/* Circular SVG Scroll Progress Back to Top Button */}
      <BackToTopButton />

      {/* Dark Futuristic Command Palette (Triggered by '/') */}
      <CommandPalette
        onTriggerEasterEgg={() => setEasterEggTrigger((prev) => prev + 1)}
      />

      {/* Easter Egg: Typing 'AI' activates Matrix stream */}
      <AIEasterEgg externalTrigger={easterEggTrigger} />
    </main>
  );
}
