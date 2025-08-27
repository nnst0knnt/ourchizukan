import { hc } from "hono/client";

import type { app } from "@/routes";

export const http = hc<typeof app>("/");
