import type { Core } from "@strapi/strapi";

async function seedHero(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::hero.hero").findFirst();
  if (existing) return;

  await strapi.documents("api::hero.hero").create({
    data: {
      name: "Mladen Raguž",
      role: "Full-Stack Software Engineer",
      location: "Zagreb, Croatia",
      email: "mladenraguz0@gmail.com",
      phone: "+49 1522 536 3887",
      tagline:
        "I engineer scalable, high-performance web applications with modern frontend frameworks and robust .NET/Node backends.",
      availabilityText: "Open to new opportunities",
      heroHeadline: "I {highlight} the web.",
      heroHighlightedWord: "engineer",
      ctaButtonText: "Explore My Work",
    },
    status: "published",
  });
}

async function seedAbout(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::about.about").findFirst();
  if (existing) return;

  await strapi.documents("api::about.about").create({
    data: {
      content:
        "With over 5 years of full-stack experience, I specialize in architecting the web. Armed with a Master's in Computer Science, my expertise deeply roots in .NET Core, Vue.js, React, and TypeScript. I thrive in the space where complex backend logic meets seamless, interactive user interfaces. From conceptualizing RESTful APIs to deploying SSR-optimized frontend applications, I focus on delivering scalable software that lives and breathes on the web.",
      sectionTitle: "Web Expertise",
      sectionSubtitle: "",
    },
    status: "published",
  });
}

async function seedSkillCategories(strapi: Core.Strapi) {
  const existing = await strapi
    .documents("api::skill-category.skill-category")
    .findMany();
  if (existing.length > 0) return;

  const categories = [
    {
      category: "Frontend Ecosystem",
      iconName: "Layout",
      sortOrder: 0,
      skillItems: [
        { name: "React" },
        { name: "Vue.js" },
        { name: "Angular" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "HTML/CSS" },
      ],
    },
    {
      category: "Backend & APIs",
      iconName: "Server",
      sortOrder: 1,
      skillItems: [
        { name: ".NET / ASP.NET" },
        { name: "Node.js" },
        { name: "PHP" },
        { name: "RESTful APIs" },
        { name: "MVC Systems" },
      ],
    },
    {
      category: "Databases",
      iconName: "Database",
      sortOrder: 2,
      skillItems: [
        { name: "PostgreSQL" },
        { name: "SQL Server" },
        { name: "MongoDB" },
        { name: "MySQL" },
      ],
    },
    {
      category: "Web Infrastructure",
      iconName: "Globe",
      sortOrder: 3,
      skillItems: [
        { name: "Azure DevOps" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "SEO & SSR" },
        { name: "OAuth (Google, Apple)" },
      ],
    },

  ];

  for (const cat of categories) {
    await strapi.documents("api::skill-category.skill-category").create({
      data: cat,
      status: "published",
    });
  }
}

async function seedExperiences(strapi: Core.Strapi) {
  const existing = await strapi
    .documents("api::experience.experience")
    .findMany();
  if (existing.length > 0) return;

  const experiences = [
    {
      role: "Software Engineer",
      company: "Trusteq",
      period: "Mar 2026 - Present",
      description:
        "Joined the core development team in Zagreb. Currently ramping up and exploring the technology landscape.",
      sortOrder: 0,
      technologies: [],
    },
    {
      role: "Full-Stack Software Developer",
      company: "hfp Informationssysteme GmbH",
      period: "Jan 2025 - Feb 2026",
      description:
        "Developed a robust, scalable web-based learning progress diagnostic system for schools, focusing on high-availability and responsive UI.",
      sortOrder: 1,
      technologies: [
        { name: "React" },
        { name: ".NET" },
        { name: "PostgreSQL" },
        { name: "Web Architecture" },
      ],
    },
    {
      role: "Full-Stack Software Developer",
      company: "MSET",
      period: "Sep 2019 - Dec 2024",
      description:
        "Architected and maintained large-scale web applications. Designed backend RESTful APIs and implemented complex OAuth integrations. Built automated CI/CD pipelines, optimized heavy database queries, and authored internal npm packages for frontend reuse.",
      sortOrder: 2,
      technologies: [
        { name: "Vue.js" },
        { name: "TypeScript" },
        { name: "ASP.NET Core" },
        { name: "Node.js" },
        { name: "Azure" },
        { name: "Docker" },
      ],
    },
    {
      role: "Demonstrator (Web Dev)",
      company: "University of Mostar",
      period: "Sep 2018 - Feb 2019",
      description:
        "Mentored students and conducted practical exercises specifically focused on Full-Stack Web Development, teaching core web principles.",
      sortOrder: 3,
      technologies: [
        { name: "Web Fundamentals" },
        { name: "Mentoring" },
        { name: "JavaScript" },
      ],
    },
  ];

  for (const exp of experiences) {
    await strapi.documents("api::experience.experience").create({
      data: exp,
      status: "published",
    });
  }
}

async function seedProjects(strapi: Core.Strapi) {
  const existing = await strapi.documents("api::project.project").findMany();
  if (existing.length > 0) return;

  const projects = [
    {
      title: "Parkwächter Web Portal",
      projectType: "Full-Stack Solution",
      period: "Apr 2024 - Dec 2024",
      description:
        "Developed the core administrative web monitoring dashboard for a parking lot system, seamlessly integrating the Stripe API for automated web-based billing and real-time status tracking.",
      externalUrl: null,
      sortOrder: 2,
      technologies: [
        { name: "React" },
        { name: "Stripe API" },
        { name: "Node.js" },
        { name: "Web Dashboards" },
      ],
    },
    {
      title: "Mareco Custom CMS",
      projectType: "Web Application",
      period: "Jan 2019 - Jun 2019",
      description:
        "Architected and deployed a complete customer-facing website powered by a bespoke, built-from-scratch CMS. Features include secure admin authentication, dynamic content routing, and seamless document management.",
      externalUrl: null,
      sortOrder: 3,
      technologies: [
        { name: "PHP" },
        { name: "MySQL" },
        { name: "JavaScript" },
        { name: "HTML/CSS" },
        { name: "Web Security" },
      ],
    },
    {
      title: "wdng.online",
      projectType: "SaaS Platform",
      period: "2025 - Present",
      description:
        "Wedding website builder that lets couples create, preview, and publish wedding sites on custom subdomains. Features a visual split-screen builder with real-time preview, multiple themes and layouts, RSVP management, guest photo uploads with Google Photos integration, QR code sharing, and full internationalization (EN/DE/HR).",
      externalUrl: "https://wdng.online",
      sortOrder: 0,
      technologies: [
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Clerk Auth" },
        { name: "PostgreSQL" },
        { name: "Docker" },
      ],
    },
    {
      title: "HoppDrive",
      projectType: "Full-Stack Platform",
      period: "2025 - Present",
      description:
        "Affordable short- and long-term car rental platform for Switzerland. Built as a Turborepo monorepo with an Express API following Onion Architecture and Domain-Driven Design, a Next.js frontend with admin CMS, e-signature system with PDF contracts, Stripe billing, and full FADP/GDPR compliance.",
      externalUrl: null,
      sortOrder: 1,
      technologies: [
        { name: "Next.js" },
        { name: "Express" },
        { name: "TypeScript" },
        { name: "PostgreSQL" },
        { name: "Prisma" },
        { name: "Redis" },
        { name: "Docker" },
      ],
    },
  ];

  for (const proj of projects) {
    await strapi.documents("api::project.project").create({
      data: proj,
      status: "published",
    });
  }
}

async function seedSocialLinks(strapi: Core.Strapi) {
  const existing = await strapi
    .documents("api::social-link.social-link")
    .findMany();
  if (existing.length > 0) return;

  const links = [
    { platform: "GitHub", url: "https://github.com/mladenraguz", iconName: "Github", sortOrder: 0 },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/mladenraguz",
      iconName: "Linkedin",
      sortOrder: 1,
    },
  ];

  for (const link of links) {
    await strapi.documents("api::social-link.social-link").create({
      data: link,
      status: "published",
    });
  }
}

async function seedCallToAction(strapi: Core.Strapi) {
  const existing = await strapi
    .documents("api::call-to-action.call-to-action")
    .findFirst();
  if (existing) return;

  await strapi.documents("api::call-to-action.call-to-action").create({
    data: {
      heading: "Let's build something great.",
      description:
        "Currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!",
      buttonText: "Say Hello",
    },
    status: "published",
  });
}

async function seedFooter(strapi: Core.Strapi) {
  const existing = await strapi
    .documents("api::footer.footer")
    .findFirst();
  if (existing) return;

  await strapi.documents("api::footer.footer").create({
    data: {
      creditPrefix: "Architected & Engineered by",
      techStackText: "Built with React, Tailwind & Strapi CMS",
    },
    status: "published",
  });
}

async function seedNavigationItems(strapi: Core.Strapi) {
  const existing = await strapi
    .documents("api::navigation-item.navigation-item")
    .findMany();
  if (existing.length > 0) return;

  const items = [
    { label: "Expertise", sectionId: "expertise", sortOrder: 0 },
    { label: "Experience", sectionId: "experience", sortOrder: 1 },
    { label: "Projects", sectionId: "projects", sortOrder: 2 },
  ];

  for (const item of items) {
    await strapi.documents("api::navigation-item.navigation-item").create({
      data: item,
      status: "published",
    });
  }
}

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) return;

  const permissions = await strapi.db
    .query("plugin::users-permissions.permission")
    .findMany({ where: { role: publicRole.id } });

  const existingActions = permissions.map(
    (p: { action: string }) => p.action
  );

  const requiredActions = [
    "api::hero.hero.find",
    "api::about.about.find",
    "api::skill-category.skill-category.find",
    "api::experience.experience.find",
    "api::project.project.find",
    "api::social-link.social-link.find",
    "api::call-to-action.call-to-action.find",
    "api::footer.footer.find",
    "api::navigation-item.navigation-item.find",
  ];

  for (const action of requiredActions) {
    if (!existingActions.includes(action)) {
      await strapi.db
        .query("plugin::users-permissions.permission")
        .create({
          data: {
            action,
            role: publicRole.id,
          },
        });
    }
  }
}

async function seedAdminUser(strapi: Core.Strapi) {
  const adminCount = await strapi.db
    .query("admin::user")
    .count();
  if (adminCount > 0) return;

  const superAdminRole = await strapi.db
    .query("admin::role")
    .findOne({ where: { code: "strapi-super-admin" } });

  if (!superAdminRole) return;

  const hashedPassword = await strapi.service("admin::auth").hashPassword("Admin1234!");

  await strapi.db.query("admin::user").create({
    data: {
      firstname: "Admin",
      lastname: "User",
      email: "admin@portfolio.local",
      password: hashedPassword,
      isActive: true,
      blocked: false,
      registrationToken: null,
      roles: [superAdminRole.id],
    },
  });

  strapi.log.info("Default admin user created (admin@portfolio.local / Admin1234!)");
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedAdminUser(strapi);
    await seedHero(strapi);
    await seedAbout(strapi);
    await seedSkillCategories(strapi);
    await seedExperiences(strapi);
    await seedProjects(strapi);
    await seedSocialLinks(strapi);
    await seedCallToAction(strapi);
    await seedFooter(strapi);
    await seedNavigationItems(strapi);
    await setPublicPermissions(strapi);

    strapi.log.info("Portfolio seed data applied successfully.");
  },
};
