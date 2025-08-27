import { env } from "cloudflare:workers";

import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

import type { KeyValueStorage } from "@/models";

const createKeyValueStorage = (): KeyValueStorage => {
  if (env.Families) {
    return createCloudflareKV(env.Families);
  }

  return createInMemory();
};

export let storage: KeyValueStorage;

const getStorage = (): KeyValueStorage => {
  if (!storage) {
    storage = createKeyValueStorage();
  }

  return storage;
};

storage = getStorage();
