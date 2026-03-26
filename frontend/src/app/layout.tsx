import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mraguz.me";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mladen Raguž | Full-Stack Software Engineer",
    template: "%s | Mladen Raguž",
  },
  description:
    "Portfolio of Mladen Raguž — Full-Stack Software Engineer in Zagreb, Croatia. Specializing in scalable web applications with React, Vue.js, TypeScript, .NET, and Node.js.",
  keywords: [
    "Mladen Raguž",
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Vue.js",
    "TypeScript",
    ".NET",
    "Node.js",
    "PostgreSQL",
    "Web Developer Zagreb",
    "Frontend Engineer",
    "Backend Engineer",
  ],
  authors: [{ name: "Mladen Raguž", url: SITE_URL }],
  creator: "Mladen Raguž",
  publisher: "Mladen Raguž",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Mladen Raguž — Portfolio",
    title: "Mladen Raguž | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in scalable web applications with React, Vue.js, TypeScript, .NET, and Node.js. Based in Zagreb, Croatia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mladen Raguž | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in scalable web applications. Based in Zagreb, Croatia.",
    creator: "@mladenraguz",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
