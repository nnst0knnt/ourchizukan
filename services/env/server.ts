import { z } from "zod";

const Env = z.object({
  DEBUG: z.coerce.boolean().default(false),
});

/* eslint-disable-next-line n/no-process-env */
export const env = Env.parse(process.env);
