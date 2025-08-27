import { env } from "../env";
import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

import type { CreateKeyValueStorage } from "@/models";

const createFactory = (): CreateKeyValueStorage => {
  if (!env.DEBUG) return createCloudflareKV;

  return createInMemory;
};

export const kv = createFactory();
