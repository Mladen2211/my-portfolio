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
  Server,
  type LucideIcon,
} from "lucide-react";

const ICON_REGISTRY: Record<string, LucideIcon> = {
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
  Server,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className = "w-6 h-6" }: DynamicIconProps) {
  const IconComponent = ICON_REGISTRY[name] || ChevronRight;
  return <IconComponent className={className} />;
}

export {
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
  Server,
};
