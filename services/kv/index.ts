import { env } from "../env/server";
import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

import type { KeyValueStorageFactory } from "@/models";

const createFactory = (): KeyValueStorageFactory => {
  if (!env.DEBUG) return createCloudflareKV;

  return createInMemory;
};

export const kv = createFactory();
