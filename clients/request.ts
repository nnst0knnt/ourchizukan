import { hc } from "hono/client";

import type { app } from "@/routes";

export const request = hc<typeof app>("/");
