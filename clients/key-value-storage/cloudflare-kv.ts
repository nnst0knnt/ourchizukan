import type { KeyValueStorage } from "@/models";

export const createCloudflareKV = (namespace: KVNamespace): KeyValueStorage => {
  return {
    get: async (key: string) => {
      return namespace.get(key);
    },

    set: async (key: string, value: string, ttl?: number) => {
      await namespace.put(
        key,
        value,
        ttl ? { expirationTtl: ttl / 1000 } : undefined,
      );
    },
    delete: async (key: string) => {
      await namespace.delete(key);

      return true;
    },
    list: async (prefix: string) => {
      const { keys } = await namespace.list({ prefix });

      return keys.map((k) => k.name);
    },
  };
};
