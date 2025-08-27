import type { KeyValueStorageFactory } from "@/models";
import { env } from "../../env/server";
import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

const createFactory = (): KeyValueStorageFactory => {
  if (!env.DEBUG) return createCloudflareKV;

  return createInMemory;
};

export const createKeyValueStorage = createFactory();
