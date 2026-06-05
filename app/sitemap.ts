import type { MetadataRoute } from "next";

const siteUrl = "https://thai-chuai-calc.vercel.app/";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
