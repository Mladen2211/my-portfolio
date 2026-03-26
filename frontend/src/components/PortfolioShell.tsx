"use client";

import { useCallback } from "react";
import type { PortfolioData } from "@/types";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { PortfolioFooter } from "@/components/PortfolioFooter";

interface PortfolioShellProps {
  data: PortfolioData;
}

export function PortfolioShell({ data }: PortfolioShellProps) {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 relative">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <AnimatedBackground />

      <NavigationBar
        navigationItems={data.navigationItems}
        contactEmail={data.hero.email}
      />

      <main>
          <HeroSection
          hero={data.hero}
          socialLinks={data.socialLinks}
          onExploreWork={() => scrollToSection("projects")}
        />

        <ExpertiseSection about={data.about} skills={data.skills} />

        <ExperienceSection experiences={data.experiences} />

        <ProjectsSection projects={data.projects} />

        <CallToActionSection
          callToAction={data.callToAction}
          contactEmail={data.hero.email}
        />
      </main>

      <PortfolioFooter footer={data.footer} authorName={data.hero.name} />
    </div>
  );
}
