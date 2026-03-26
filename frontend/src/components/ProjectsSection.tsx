import type { ProjectAttributes, TechnologyComponent } from "@/types";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { MonitorSmartphone, ExternalLink } from "@/components/DynamicIcon";

interface ProjectsSectionProps {
  projects: ProjectAttributes[];
}

function ProjectTechnologyList({
  technologies,
}: {
  technologies: TechnologyComponent[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech.id}
          className="text-xs font-medium text-slate-300 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700/50 group-hover:border-slate-600 transition-colors"
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  animationDelay,
}: {
  project: ProjectAttributes;
  animationDelay: number;
}) {
  return (
    <RevealOnScroll delay={animationDelay} className="h-full">
      <div className="group glass-panel rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden relative border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MonitorSmartphone className="w-4 h-4 text-blue-400" />
              <p className="text-blue-400 text-xs font-mono tracking-wider uppercase">
                {project.projectType}
              </p>
            </div>
            <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
              {project.title}
            </h3>
          </div>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="p-3 bg-slate-900/80 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:rotate-12 hover:scale-110 border border-slate-700 hover:border-transparent"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        <div className="flex-grow relative z-10">
          <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
            {project.description}
          </p>
        </div>

        <div className="mt-auto relative z-10 pt-6 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
          <ProjectTechnologyList technologies={project.technologies} />
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <SectionHeading
            title="Featured Work"
            subtitle="A selection of independent web architectures, portals, and deployments."
          />
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              animationDelay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
