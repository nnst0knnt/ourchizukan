import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

import type { CreateKeyValueStorage } from "@/models";

const createFactory = (): CreateKeyValueStorage => {
  if (!process.env.DEBUG) return createCloudflareKV;

  return createInMemory;
};

export default createFactory();
