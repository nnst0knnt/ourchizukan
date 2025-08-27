import type { KeyValueStorageFactory } from "@/models";
import { date } from "../../../date";

type Entry = {
  value: string;
  expiry?: number;
};

const store = new Map<string, Entry>();

export const createInMemory: KeyValueStorageFactory = () => {
  if (!store.has("whitelist:ips")) {
    store.set("whitelist:ips", {
      value: JSON.stringify(["127.0.0.1", "::1", "::ffff:127.0.0.1"]),
    });
  }

  if (!store.has("whitelist:emails")) {
    store.set("whitelist:emails", {
      value: JSON.stringify(["ourchizukan@example.com"]),
    });
  }

  return {
    get: async (key) => {
      const entry = store.get(key);

      if (!entry) return null;

      if (entry.expiry && entry.expiry < date().valueOf()) {
        store.delete(key);

        return null;
      }

      return entry.value;
    },
    set: async (key, value, expirySeconds) => {
      store.set(key, {
        value,
        expiry: expirySeconds ? date().valueOf() + expirySeconds : undefined,
      });
    },
    delete: async (key) => {
      return store.delete(key);
    },
    list: async (prefix) => {
      const now = date().valueOf();
      const keys: string[] = [];

      for (const [key, entry] of store.entries()) {
        if (key.startsWith(prefix)) {
          if (!entry.expiry || entry.expiry > now) {
            keys.push(key);
          } else {
            store.delete(key);
          }
        }
      }

      return keys;
    },
  };
};
