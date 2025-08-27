import { date } from "../date";

import type { CreateKeyValueStorage } from "@/models";

export const createInMemory: CreateKeyValueStorage = () => {
  const store = new Map<string, { value: string; expires?: number }>();

  return {
    get: async (key: string) => {
      const found = store.get(key);

      if (!found) return null;

      if (found.expires && found.expires < date().unix()) {
        store.delete(key);

        return null;
      }

      return found.value;
    },
    set: async (key: string, value: string, ttl?: number) => {
      store.set(key, { value, expires: ttl ? date().unix() + ttl : undefined });
    },
    delete: async (key: string) => {
      return store.delete(key);
    },
    list: async (prefix: string) => {
      return Array.from(store.keys()).filter((key) => key.startsWith(prefix));
    },
  };
};
