import { env } from "../../env/server";
import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

import type { KeyValueStorageFactory } from "@/models";

const createFactory = (): KeyValueStorageFactory => {
  console.log("Creating key-value storage factory", env);

  if (!env.DEBUG) return createCloudflareKV;

  return createInMemory;
};

export const createKeyValueStorage = createFactory();
