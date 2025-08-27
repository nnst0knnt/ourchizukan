/* eslint-disable @typescript-eslint/no-require-imports */
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { env } from "./services/env";

const config: NextConfig = {
  env: env as unknown as NextConfig["env"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

initOpenNextCloudflareForDev();

export default env.APP_ANALYZE
  ? require("@next/bundle-analyzer")()(config)
  : config;
