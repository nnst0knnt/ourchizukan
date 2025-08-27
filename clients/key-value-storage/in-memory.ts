import { date } from "../date";

import type { KeyValueStorage } from "@/models";

export const createInMemory = (): KeyValueStorage => {
  const store = new Map<string, { value: string; expires?: number }>();

  return {
    get: async (key: string) => {
      const data = store.get(key);

      if (!data) return null;

      if (data.expires && data.expires < date().unix()) {
        store.delete(key);

        return null;
      }

      return data.value;
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
