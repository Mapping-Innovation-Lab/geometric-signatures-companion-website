import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site-copy";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "supplement/", "supplement/concept-anchors/"].map((path) => ({
    url: new URL(path, SITE_URL).href,
  }));
}
