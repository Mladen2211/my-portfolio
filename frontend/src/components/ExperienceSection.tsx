import type { ExperienceAttributes, TechnologyComponent } from "@/types";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

interface ExperienceSectionProps {
  experiences: ExperienceAttributes[];
}

function TechnologyTagList({ technologies }: { technologies: TechnologyComponent[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {technologies.map((tech) => (
        <span
          key={tech.id}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 rounded-lg border border-slate-700/50 hover:border-blue-500/50 hover:text-white transition-colors cursor-default"
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}

function TimelineNode() {
  return (
    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-500 z-10">
      <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-150 transition-transform duration-500" />
    </div>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceAttributes }) {
  return (
    <div className="ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] p-8 rounded-3xl glass-panel group-hover:border-blue-500/40 group-hover:bg-slate-800/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-3">
        <h3 className="font-bold text-2xl text-white group-hover:text-blue-300 transition-colors">
          {experience.role}
        </h3>
        <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-3 py-1.5 rounded-full w-fit whitespace-nowrap border border-blue-500/20">
          {experience.period}
        </span>
      </div>

      <h4 className="text-lg text-slate-300 font-medium mb-5 flex items-center gap-2 border-b border-slate-800/50 pb-4">
        {experience.company}
      </h4>

      <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
        {experience.description}
      </p>

      <TechnologyTagList technologies={experience.technologies} />
    </div>
  );
}

function ExperienceTimelineEntry({
  experience,
  animationDelay,
}: {
  experience: ExperienceAttributes;
  animationDelay: number;
}) {
  return (
    <RevealOnScroll delay={animationDelay}>
      <div className="relative flex items-start group md:even:flex-row-reverse">
        <TimelineNode />
        <div className="md:w-1/2" />
        <ExperienceCard experience={experience} />
      </div>
    </RevealOnScroll>
  );
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative z-10 py-32 px-6 bg-slate-900/30 border-y border-slate-800/50 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <SectionHeading
            title="Professional Journey"
            subtitle="Building scalable solutions across dynamic teams and industries."
          />
        </RevealOnScroll>

        <div className="mt-20 space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-blue-500/50 before:via-slate-700 before:to-transparent">
          {experiences.map((experience, index) => (
            <ExperienceTimelineEntry
              key={experience.id}
              experience={experience}
              animationDelay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
