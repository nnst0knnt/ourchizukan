/* eslint-disable n/no-process-env */
/* eslint-disable @typescript-eslint/no-require-imports */
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { env } from "./services/env/client";

const config: NextConfig = {
  env: env,
  images: {
    domains: ["images.unsplash.com", "picsum.photos"],
  },
};

initOpenNextCloudflareForDev();

export default process.env.ANALYZE === "true"
  ? require("@next/bundle-analyzer")()(config)
  : config;
