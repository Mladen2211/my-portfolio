import { fetchFromStrapi } from "./strapi-client";
import type {
  StrapiResponse,
  StrapiCollectionResponse,
  HeroAttributes,
  AboutAttributes,
  SkillCategoryAttributes,
  ExperienceAttributes,
  ProjectAttributes,
  SocialLinkAttributes,
  CallToActionAttributes,
  FooterAttributes,
  NavigationItemAttributes,
  PortfolioData,
} from "@/types";

export async function fetchHero(): Promise<HeroAttributes> {
  const response = await fetchFromStrapi<StrapiResponse<HeroAttributes>>({
    path: "/hero",
    query: { "populate": "*" },
  });
  return response.data;
}

export async function fetchAbout(): Promise<AboutAttributes> {
  const response = await fetchFromStrapi<StrapiResponse<AboutAttributes>>({
    path: "/about",
  });
  return response.data;
}

export async function fetchSkillCategories(): Promise<SkillCategoryAttributes[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<SkillCategoryAttributes>
  >({
    path: "/skill-categories",
    query: { "populate": "*", "sort": "sortOrder:asc", "pagination[pageSize]": "100" },
  });
  return response.data;
}

export async function fetchExperiences(): Promise<ExperienceAttributes[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<ExperienceAttributes>
  >({
    path: "/experiences",
    query: { "populate": "*", "sort": "sortOrder:asc", "pagination[pageSize]": "100" },
  });
  return response.data;
}

export async function fetchProjects(): Promise<ProjectAttributes[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<ProjectAttributes>
  >({
    path: "/projects",
    query: { "populate": "*", "sort": "sortOrder:asc", "pagination[pageSize]": "100" },
  });
  return response.data;
}

export async function fetchSocialLinks(): Promise<SocialLinkAttributes[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<SocialLinkAttributes>
  >({
    path: "/social-links",
    query: { "sort": "sortOrder:asc", "pagination[pageSize]": "100" },
  });
  return response.data;
}

export async function fetchCallToAction(): Promise<CallToActionAttributes> {
  const response = await fetchFromStrapi<
    StrapiResponse<CallToActionAttributes>
  >({
    path: "/call-to-action",
  });
  return response.data;
}

export async function fetchFooter(): Promise<FooterAttributes> {
  const response = await fetchFromStrapi<StrapiResponse<FooterAttributes>>({
    path: "/footer",
  });
  return response.data;
}

export async function fetchNavigationItems(): Promise<NavigationItemAttributes[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<NavigationItemAttributes>
  >({
    path: "/navigation-items",
    query: { "sort": "sortOrder:asc", "pagination[pageSize]": "100" },
  });
  return response.data;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const [
    hero,
    about,
    skills,
    experiences,
    projects,
    socialLinks,
    callToAction,
    footer,
    navigationItems,
  ] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchSkillCategories(),
    fetchExperiences(),
    fetchProjects(),
    fetchSocialLinks(),
    fetchCallToAction(),
    fetchFooter(),
    fetchNavigationItems(),
  ]);

  return {
    hero,
    about,
    skills,
    experiences,
    projects,
    socialLinks,
    callToAction,
    footer,
    navigationItems,
  };
}
