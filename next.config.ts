import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { env } from "./services/env/client";

initOpenNextCloudflareForDev();

const config: NextConfig = {
  env: env,
  images: {
    domains: ["images.unsplash.com", "picsum.photos"],
  },
};

export default config;
