import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  ChevronRight,
  Code2,
  Database,
  Layout,
  Terminal,
  Globe,
  MonitorSmartphone,
  Server
} from 'lucide-react';

// ==========================================
// MOCK STRAPI CMS DATA (Web-Centric Focus)
// ==========================================
const mockStrapiData = {
  hero: {
    name: "Mladen Raguž",
    role: "Full-Stack Software Engineer",
    location: "Zagreb, Croatia",
    email: "mladenraguz0@gmail.com",
    phone: "+49 1522 536 3887",
    tagline: "I engineer scalable, high-performance web applications with modern frontend frameworks and robust .NET/Node backends."
  },
  about: {
    content: "With over 5 years of full-stack experience, I specialize in architecting the web. Armed with a Master's in Computer Science, my expertise deeply roots in .NET Core, Vue.js, React, and TypeScript. I thrive in the space where complex backend logic meets seamless, interactive user interfaces. From conceptualizing RESTful APIs to deploying SSR-optimized frontend applications, I focus on delivering scalable software that lives and breathes on the web."
  },
  skills: [
    { category: "Frontend Ecosystem", icon: "Layout", items: ["React", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML/CSS"] },
    { category: "Backend & APIs", icon: "Server", items: [".NET / ASP.NET", "Node.js", "PHP", "RESTful APIs", "MVC Systems"] },
    { category: "Databases", icon: "Database", items: ["PostgreSQL", "SQL Server", "MongoDB", "MySQL"] },
    { category: "Web Infrastructure", icon: "Globe", items: ["Azure DevOps", "Docker", "CI/CD", "SEO & SSR", "OAuth (Google, Apple)"] },
    { category: "Mobile & Cross-Platform", icon: "MonitorSmartphone", items: ["Flutter", "Dart", "iOS", "Android"] }
  ],
  experience: [
    {
      id: 0,
      role: "Software Engineer",
      company: "Trusteq",
      period: "Mar 2026 - Present",
      description: "Engineering robust web solutions and architecting scalable software systems as part of the core development team in Zagreb.",
      technologies: ["Full-Stack Development", "Web Architecture", "Modern JS", ".NET"]
    },
    {
      id: 1,
      role: "Full-Stack Software Developer",
      company: "hfp Informationssysteme GmbH",
      period: "Jan 2025 - Feb 2026",
      description: "Developed a robust, scalable web-based learning progress diagnostic system for schools, focusing on high-availability and responsive UI.",
      technologies: ["React", ".NET", "PostgreSQL", "Web Architecture"]
    },
    {
      id: 2,
      role: "Full-Stack Software Developer",
      company: "MSET",
      period: "Sep 2019 - Dec 2024",
      description: "Architected and maintained large-scale web applications. Designed backend RESTful APIs and implemented complex OAuth integrations. Built automated CI/CD pipelines, optimized heavy database queries, and authored internal npm packages for frontend reuse.",
      technologies: ["Vue.js", "TypeScript", "ASP.NET Core", "Node.js", "Azure", "Docker"]
    },
    {
      id: 3,
      role: "Demonstrator (Web Dev)",
      company: "University of Mostar",
      period: "Sep 2018 - Feb 2019",
      description: "Mentored students and conducted practical exercises specifically focused on Full-Stack Web Development, teaching core web principles.",
      technologies: ["Web Fundamentals", "Mentoring", "JavaScript"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Parkwächter Web Portal & App",
      type: "Full-Stack Solution",
      period: "Apr 2024 - Dec 2024",
      description: "Developed the core administrative web monitoring dashboard and cross-platform mobile app for a parking lot system, seamlessly integrating the Stripe API for automated web-based billing.",
      technologies: ["Flutter", "Stripe API", "Web Dashboards", "Mobile Dev"]
    },
    {
      id: 2,
      title: "Mareco Custom CMS",
      type: "Web Application",
      period: "Jan 2019 - Jun 2019",
      description: "Architected and deployed a complete customer-facing website powered by a bespoke, built-from-scratch CMS. Features include secure admin authentication, dynamic content routing, and seamless document management.",
      technologies: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Web Security"]
    }
  ]
};

// ==========================================
// ANIMATION & UI COMPONENTS
// ==========================================

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    
    .glass-panel {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    
    .gradient-text {
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .reveal-hidden {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `}} />
);

// Scroll Reveal Component
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-16 relative">
    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 flex items-center gap-4">
      {title}
      <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-grow ml-4 rounded-full"></div>
    </h2>
    {subtitle && <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

const getIcon = (name) => {
  const icons = { Code2, Database, Layout, Terminal, Globe, Server, MonitorSmartphone };
  const IconComponent = icons[name] || ChevronRight;
  return <IconComponent className="w-6 h-6 text-blue-400" />;
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [data, setData] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Simulate Strapi API Fetch
    const timer = setTimeout(() => setData(mockStrapiData), 800); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'expertise', 'experience', 'projects'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
        <CustomStyles />
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-ping w-16 h-16 rounded-full bg-blue-500/20"></div>
          <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin relative z-10"></div>
        </div>
        <p className="text-blue-400 font-mono text-sm tracking-widest uppercase animate-pulse">Initializing Web Environment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 relative">
      <CustomStyles />

      {/* BACKGROUND ANIMATED BLOBS */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-sky-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-panel py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-black text-white tracking-tighter cursor-pointer group flex items-center gap-2" 
            onClick={() => scrollTo('home')}
          >
            <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Terminal className="w-5 h-5 text-blue-500 group-hover:-rotate-12 transition-transform" />
            </div>
            <span>MR<span className="text-blue-500">.</span></span>
          </div>
          
          <div className="hidden md:flex space-x-1 p-1 bg-slate-900/50 rounded-full border border-slate-800/50 backdrop-blur-md">
            {['Expertise', 'Experience', 'Projects'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.toLowerCase() 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          
          <a 
            href={`mailto:${data.hero.email}`}
            className="hidden md:flex items-center gap-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full transition-all border border-slate-700 hover:border-slate-600"
          >
            <Mail className="w-4 h-4" /> Let's Talk
          </a>
          
          <button onClick={() => window.location.href = `mailto:${data.hero.email}`} className="md:hidden text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg">
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl relative">
          <RevealOnScroll delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Open to new opportunities
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
              {data.hero.name}
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-500 tracking-tight mb-8">
              I <span className="gradient-text">engineer</span> the web.
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl">
              Based in <span className="text-slate-200">{data.hero.location}</span>. {data.hero.tagline}
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={400}>
            <div className="flex flex-wrap gap-6 items-center">
              <button 
                onClick={() => scrollTo('projects')}
                className="relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-400/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore My Work <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    aria-label={social.label}
                    className="text-slate-400 hover:text-blue-400 hover:-translate-y-1 transition-all p-3.5 rounded-xl glass-panel group"
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
          <div className="w-8 h-12 rounded-full border-2 border-slate-600 flex justify-center p-2">
            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* EXPERTISE & SKILLS */}
      <section id="expertise" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionHeading title="Web Expertise" subtitle={data.about.content} />
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16">
            {data.skills.map((skillGroup, idx) => (
              <RevealOnScroll key={idx} delay={idx * 150} className="h-full">
                <div className="glass-panel rounded-2xl p-6 h-full hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                  
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-6 border border-slate-700 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10">
                    {getIcon(skillGroup.icon)}
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-4 relative z-10">{skillGroup.category}</h3>
                  <ul className="space-y-3 relative z-10 mt-auto">
                    {skillGroup.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300 text-sm group/item bg-slate-900/40 p-2 rounded-lg border border-slate-800/50 hover:border-blue-500/30 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/item:bg-blue-400 group-hover/item:scale-150 transition-all shrink-0"></div>
                        <span className="group-hover/item:text-white transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="relative z-10 py-32 px-6 bg-slate-900/30 border-y border-slate-800/50 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <SectionHeading title="Professional Journey" subtitle="Building scalable solutions across dynamic teams and industries." />
          </RevealOnScroll>
          
          <div className="mt-20 space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-blue-500/50 before:via-slate-700 before:to-transparent">
            {data.experience.map((exp, idx) => (
              <RevealOnScroll key={exp.id} delay={idx * 200}>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  
                  {/* Timeline Node */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)] p-8 rounded-3xl glass-panel group-hover:border-blue-500/40 group-hover:bg-slate-800/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-3">
                      <h3 className="font-bold text-2xl text-white group-hover:text-blue-300 transition-colors">{exp.role}</h3>
                      <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-3 py-1.5 rounded-full w-fit whitespace-nowrap border border-blue-500/20">
                        {exp.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg text-slate-300 font-medium mb-5 flex items-center gap-2 border-b border-slate-800/50 pb-4">
                      {exp.company}
                    </h4>
                    
                    <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 rounded-lg border border-slate-700/50 hover:border-blue-500/50 hover:text-white transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <SectionHeading title="Featured Work" subtitle="A selection of independent web architectures, portals, and deployments." />
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {data.projects.map((project, idx) => (
              <RevealOnScroll key={project.id} delay={idx * 200} className="h-full">
                <div className="group glass-panel rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden relative border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)]">
                  
                  {/* Decorative Project Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MonitorSmartphone className="w-4 h-4 text-blue-400" />
                        <p className="text-blue-400 text-xs font-mono tracking-wider uppercase">{project.type}</p>
                      </div>
                      <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <a href="#" className="p-3 bg-slate-900/80 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:rotate-12 hover:scale-110 border border-slate-700 hover:border-transparent">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <div className="flex-grow relative z-10">
                    <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto relative z-10 pt-6 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs font-medium text-slate-300 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION & FOOTER */}
      <section className="relative z-10 py-24 px-6 border-t border-slate-800/50 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Let's build something great.</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
            </p>
            <a 
              href={`mailto:${data.hero.email}`}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            >
              <Mail className="w-5 h-5" /> Say Hello
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center border-t border-slate-800/50 bg-slate-950">
        <p className="text-slate-500 font-medium text-sm">
          Architected & Engineered by <span className="text-blue-400">{data.hero.name}</span>
        </p>
        <p className="text-slate-600 text-xs mt-2 flex items-center justify-center gap-2">
          <Code2 className="w-4 h-4" /> Built with React, Tailwind & Framer-like CSS
        </p>
      </footer>

    </div>
  );
}