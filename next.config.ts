import type { NextConfig } from "next";

import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { env } from "./services/env/client";

/**
 * @see https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
 */
setupDevPlatform().catch(console.error);

const config: NextConfig = {
  env: env,
  images: {
    domains: ["images.unsplash.com", "picsum.photos"],
  },
};

export default config;
