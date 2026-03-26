import { StrapiEntity, StrapiImage } from "./strapi";

export interface HeroAttributes extends StrapiEntity {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  availabilityText: string;
  heroHeadline: string;
  heroHighlightedWord: string;
  ctaButtonText: string;
  profileImage: StrapiImage | null;
}

export interface AboutAttributes extends StrapiEntity {
  content: string;
  sectionTitle: string;
  sectionSubtitle: string;
}

export interface SkillItemComponent {
  id: number;
  name: string;
}

export interface SkillCategoryAttributes extends StrapiEntity {
  category: string;
  iconName: string;
  sortOrder: number;
  skillItems: SkillItemComponent[];
}

export interface TechnologyComponent {
  id: number;
  name: string;
}

export interface ExperienceAttributes extends StrapiEntity {
  role: string;
  company: string;
  period: string;
  description: string;
  sortOrder: number;
  technologies: TechnologyComponent[];
}

export interface ProjectAttributes extends StrapiEntity {
  title: string;
  projectType: string;
  period: string;
  description: string;
  externalUrl: string | null;
  sortOrder: number;
  technologies: TechnologyComponent[];
}

export interface SocialLinkAttributes extends StrapiEntity {
  platform: string;
  url: string;
  iconName: string;
  sortOrder: number;
}

export interface CallToActionAttributes extends StrapiEntity {
  heading: string;
  description: string;
  buttonText: string;
}

export interface FooterAttributes extends StrapiEntity {
  creditPrefix: string;
  techStackText: string;
}

export interface NavigationItemAttributes extends StrapiEntity {
  label: string;
  sectionId: string;
  sortOrder: number;
}

export interface PortfolioData {
  hero: HeroAttributes;
  about: AboutAttributes;
  skills: SkillCategoryAttributes[];
  experiences: ExperienceAttributes[];
  projects: ProjectAttributes[];
  socialLinks: SocialLinkAttributes[];
  callToAction: CallToActionAttributes;
  footer: FooterAttributes;
  navigationItems: NavigationItemAttributes[];
}
