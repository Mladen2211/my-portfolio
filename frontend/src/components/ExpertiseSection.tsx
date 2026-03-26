import type { AboutAttributes, SkillCategoryAttributes } from "@/types";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { DynamicIcon } from "@/components/DynamicIcon";

interface ExpertiseSectionProps {
  about: AboutAttributes;
  skills: SkillCategoryAttributes[];
}

function SkillCategoryCard({
  skillGroup,
  animationDelay,
}: {
  skillGroup: SkillCategoryAttributes;
  animationDelay: number;
}) {
  return (
    <RevealOnScroll delay={animationDelay} className="h-full">
      <div className="glass-panel rounded-2xl p-6 h-full hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />

        <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-6 border border-slate-700 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10">
          <DynamicIcon name={skillGroup.iconName} className="w-6 h-6 text-blue-400" />
        </div>

        <h3 className="text-white font-bold text-xl mb-4 relative z-10">
          {skillGroup.category}
        </h3>
        <ul className="space-y-3 relative z-10 mt-auto">
          {skillGroup.skillItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 text-slate-300 text-sm group/item bg-slate-900/40 p-2 rounded-lg border border-slate-800/50 hover:border-blue-500/30 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/item:bg-blue-400 group-hover/item:scale-150 transition-all shrink-0" />
              <span className="group-hover/item:text-white transition-colors">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </RevealOnScroll>
  );
}

export function ExpertiseSection({ about, skills }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <SectionHeading title={about.sectionTitle} subtitle={about.content} />
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16">
          {skills.map((skillGroup, index) => (
            <SkillCategoryCard
              key={skillGroup.id}
              skillGroup={skillGroup}
              animationDelay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
