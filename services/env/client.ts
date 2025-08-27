import { z } from "zod";

const Env = z.object({
  APP_URL: z.string().url(),
});

/* eslint-disable-next-line n/no-process-env */
export const env = Env.parse(process.env);
