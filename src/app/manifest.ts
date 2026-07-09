import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Crossway Collective",
    description: "A family of restaurants and cafés from the house of Crossway.",
    start_url: "/en",
    display: "standalone",
    background_color: "#f7f3ea",
    theme_color: "#0c1326",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
