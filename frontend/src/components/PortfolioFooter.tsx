import type { FooterAttributes } from "@/types";
import { Code2 } from "@/components/DynamicIcon";

interface PortfolioFooterProps {
  footer: FooterAttributes;
  authorName: string;
}

export function PortfolioFooter({ footer, authorName }: PortfolioFooterProps) {
  return (
    <footer className="relative z-10 py-8 text-center border-t border-slate-800/50 bg-slate-950">
      <p className="text-slate-500 font-medium text-sm">
        {footer.creditPrefix}{" "}
        <span className="text-blue-400">{authorName}</span>
      </p>
      <p className="text-slate-600 text-xs mt-2 flex items-center justify-center gap-2">
        <Code2 className="w-4 h-4" /> {footer.techStackText}
      </p>
    </footer>
  );
}
