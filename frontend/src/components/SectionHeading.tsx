interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 relative">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-grow ml-4 rounded-full" aria-hidden="true" />
      </div>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
