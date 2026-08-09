import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postSlugsQuery } from "@/sanity/lib/queries";
import { getAllServiceSlugs } from "@/lib/services-data";
import { SITE_URL } from "@/lib/seo";

async function getBlogSlugs() {
  try {
    return await client.fetch<string[]>(postSlugsQuery);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogSlugs = await getBlogSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/about/founder",
    "/services",
    "/faq",
    "/corporate",
    "/workshops",
    "/restore",
    "/blog"
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/services" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" || path === "/about" ? 0.9 : 0.8
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.filter(Boolean).map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
