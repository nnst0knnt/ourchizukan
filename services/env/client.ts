/* eslint-disable n/no-process-env */

import { z } from "zod";

const Env = z.object({
  APP_URL: z.string().url(),
});

export const env = Env.parse({
  APP_URL: process.env.APP_URL,
});
