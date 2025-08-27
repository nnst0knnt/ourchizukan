import type { CreateKeyValueStorage } from "@/models";
import { date } from "../date";

const store = new Map<string, { value: string; expirySeconds?: number }>();

export const createInMemory: CreateKeyValueStorage = () => ({
  get: async (key: string) => {
    const found = store.get(key);

    if (!found) return null;

    if (found.expirySeconds && found.expirySeconds < date().unix()) {
      store.delete(key);

      return null;
    }

    return found.value;
  },
  set: async (key: string, value: string, expirySeconds?: number) => {
    store.set(key, {
      value,
      expirySeconds: expirySeconds ? date().unix() + expirySeconds : undefined,
    });
  },
  delete: async (key: string) => {
    return store.delete(key);
  },
  list: async (prefix: string) => {
    return Array.from(store.keys()).filter((key) => key.startsWith(prefix));
  },
});
