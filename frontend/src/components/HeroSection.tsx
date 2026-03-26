"use client";

import type { HeroAttributes, SocialLinkAttributes } from "@/types";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicIcon, ChevronRight } from "@/components/DynamicIcon";

interface HeroSectionProps {
  hero: HeroAttributes;
  socialLinks: SocialLinkAttributes[];
  onExploreWork: () => void;
}

function AvailabilityBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm mb-8">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      {text}
    </div>
  );
}

function HeroHeadline({
  headline,
  highlightedWord,
}: {
  headline: string;
  highlightedWord: string;
}) {
  const parts = headline.split(`{highlight}`);
  return (
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-500 tracking-tight mb-8">
      {parts[0]}
      <span className="gradient-text">{highlightedWord}</span>
      {parts[1]}
    </h2>
  );
}

function SocialLinkList({ links }: { links: SocialLinkAttributes[] }) {
  return (
    <div className="flex items-center gap-4">
      {links.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.platform}
          className="text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all p-3.5 rounded-xl glass-panel group"
        >
          <DynamicIcon
            name={social.iconName}
            className="w-5 h-5 group-hover:scale-110 transition-transform"
          />
        </a>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
      <div className="w-8 h-12 rounded-full border-2 border-slate-600 flex justify-center p-2">
        <div className="w-1 h-3 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
}

export function HeroSection({
  hero,
  socialLinks,
  onExploreWork,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-4xl relative">
        <RevealOnScroll delay={100}>
          <AvailabilityBadge text={hero.availabilityText} />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
            {hero.name}
          </h1>
          <HeroHeadline
            headline={hero.heroHeadline}
            highlightedWord={hero.heroHighlightedWord}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl">
            Based in <span className="text-slate-200">{hero.location}</span>.{" "}
            {hero.tagline}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <div className="flex flex-wrap gap-6 items-center">
            <button
              onClick={onExploreWork}
              className="relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-400/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {hero.ctaButtonText}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <SocialLinkList links={socialLinks} />
          </div>
        </RevealOnScroll>
      </div>

      <ScrollIndicator />
    </section>
  );
}
