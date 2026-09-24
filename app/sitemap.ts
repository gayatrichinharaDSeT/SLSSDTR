import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/learning-research",
    "/industry-connect",
    "/team",
    "/contact",
    "/customized-modules",
  ];

  const programRoutes = programs.map((program) => `/programs/${program.slug}`);

  return [...staticRoutes, ...programRoutes].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
  }));
}
