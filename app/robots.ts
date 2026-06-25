import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/_next/",
        "/static/",
        "/api/",
        "/*?*" // Disallow query parameters to prevent duplicate content indexing
      ],
    },
    sitemap: "https://pricelot.com/sitemap.xml",
  };
}
