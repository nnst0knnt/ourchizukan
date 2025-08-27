import { z } from "zod";

const Env = z.object({
  APP_ENV: z.enum(["development", "production"]).default("development"),
  APP_URL: z.url(),
  APP_DEBUG: z.coerce.boolean().default(false),
  APP_ANALYZE: z.coerce.boolean().default(false),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_DATABASE_ID: z.string(),
  CLOUDFLARE_D1_TOKEN: z.string(),
});

export const env = Env.parse({
  APP_ENV: process.env.APP_ENV,
  APP_URL: process.env.APP_URL,
  APP_DEBUG: process.env.APP_DEBUG === "true",
  APP_ANALYZE: process.env.APP_ANALYZE === "true",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
  CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
});
