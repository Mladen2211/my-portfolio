"use client";

import { useEffect, useState, useCallback } from "react";
import type { NavigationItemAttributes } from "@/types";
import { Terminal, Mail } from "@/components/DynamicIcon";

interface NavigationBarProps {
  navigationItems: NavigationItemAttributes[];
  contactEmail: string;
}

export function NavigationBar({
  navigationItems,
  contactEmail,
}: NavigationBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);

      const sectionIds = [
        "home",
        ...navigationItems.map((item) => item.sectionId),
      ];
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigationItems]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-panel py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          type="button"
          aria-label="Scroll to top"
          className="text-2xl font-black text-white tracking-tighter cursor-pointer group flex items-center gap-2 bg-transparent border-none"
          onClick={() => scrollToSection("home")}
        >
          <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <Terminal className="w-5 h-5 text-blue-500 group-hover:-rotate-12 transition-transform" />
          </div>
          <span>
            MR<span className="text-blue-500">.</span>
          </span>
        </button>

        <div className="hidden md:flex space-x-1 p-1 bg-slate-900/50 rounded-full border border-slate-800/50 backdrop-blur-md">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.sectionId)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === item.sectionId
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <a
          href={`mailto:${contactEmail}`}
          className="hidden md:flex items-center gap-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full transition-all border border-slate-700 hover:border-slate-600"
        >
          <Mail className="w-4 h-4" /> Let&apos;s Talk
        </a>

        <button
          aria-label="Send email"
          onClick={() => (window.location.href = `mailto:${contactEmail}`)}
          className="md:hidden text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg"
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
