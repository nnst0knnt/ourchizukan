import { hc } from "hono/client";

import type { app } from "@/routes";
import { env } from "../env/client";

export const http = hc<typeof app>(env.APP_URL);
