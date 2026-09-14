import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/services", "/hair-salon", "/our-work", "/alain-martinos", "/contact"];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: now,
    changeFrequency: r === "" || r === "/our-work" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/contact" || r === "/services" ? 0.9 : 0.8,
  }));
}
