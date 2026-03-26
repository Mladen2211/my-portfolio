import type { Metadata } from "next";
import { fetchPortfolioData } from "@/lib/portfolio-api";
import { PortfolioShell } from "@/components/PortfolioShell";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mraguz.me";

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await fetchPortfolioData();

  const title = `${hero.name} | ${hero.role}`;
  const description = `Portfolio of ${hero.name} — ${hero.role} in ${hero.location}. ${hero.tagline}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: `${hero.name} — Portfolio`,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function PortfolioPage() {
  const portfolioData = await fetchPortfolioData();

  return (
    <>
      <JsonLd data={portfolioData} siteUrl={SITE_URL} />
      <PortfolioShell data={portfolioData} />
    </>
  );
}
