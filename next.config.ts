/* eslint-disable n/no-process-env */
/* eslint-disable @typescript-eslint/no-require-imports */
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { env } from "./services/env/client";

const config: NextConfig = {
  env: env,
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

export default process.env.ANALYZE === "true"
  ? require("@next/bundle-analyzer")()(config)
  : config;
