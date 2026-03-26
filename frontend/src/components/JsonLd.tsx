import type { PortfolioData } from "@/types";

interface JsonLdProps {
  data: PortfolioData;
  siteUrl: string;
}

function buildPersonSchema(data: PortfolioData, siteUrl: string) {
  const allSkills = data.skills.flatMap((category) =>
    category.skillItems.map((skill) => skill.name)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.hero.name,
    jobTitle: data.hero.role,
    url: siteUrl,
    email: `mailto:${data.hero.email}`,
    telephone: data.hero.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.hero.location,
    },
    description: data.about.content,
    knowsAbout: allSkills,
    sameAs: data.socialLinks.map((link) => link.url),
  };
}

function buildWebSiteSchema(data: PortfolioData, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${data.hero.name} — Portfolio`,
    url: siteUrl,
    description: data.hero.tagline,
    author: {
      "@type": "Person",
      name: data.hero.name,
    },
  };
}

function buildProfilePageSchema(data: PortfolioData, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: data.hero.name,
      jobTitle: data.hero.role,
      description: data.hero.tagline,
    },
    url: siteUrl,
    name: `${data.hero.name} | ${data.hero.role}`,
    dateModified: new Date().toISOString(),
  };
}

export function JsonLd({ data, siteUrl }: JsonLdProps) {
  const schemas = [
    buildPersonSchema(data, siteUrl),
    buildWebSiteSchema(data, siteUrl),
    buildProfilePageSchema(data, siteUrl),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
