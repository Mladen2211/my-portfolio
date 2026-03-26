import type { CallToActionAttributes } from "@/types";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Mail } from "@/components/DynamicIcon";

interface CallToActionSectionProps {
  callToAction: CallToActionAttributes;
  contactEmail: string;
}

export function CallToActionSection({
  callToAction,
  contactEmail,
}: CallToActionSectionProps) {
  return (
    <section id="contact" className="relative z-10 py-24 px-6 border-t border-slate-800/50 bg-gradient-to-b from-transparent to-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {callToAction.heading}
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            {callToAction.description}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" /> {callToAction.buttonText}
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
