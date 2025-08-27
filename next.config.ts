import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/**
 * @see https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
 */
setupDevPlatform().catch(console.error);

import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
};

export default config;
