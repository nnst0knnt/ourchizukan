import { z } from "zod";

const Env = z.object({
  APP_URL: z.string().url(),
  DEBUG: z.coerce.boolean().default(false),
});

/* eslint-disable-next-line n/no-process-env */
export const env = Env.parse(process.env);
