/* eslint-disable n/no-process-env */

import { z } from "zod";

const Env = z.object({
  DEBUG: z.coerce.boolean().default(false),
});

export const env = Env.parse({
  DEBUG: process.env.DEBUG,
});
