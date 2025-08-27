import type { KeyValueStorageFactory } from "@/models";

export const createCloudflareKV: KeyValueStorageFactory<KVNamespace> = (
  namespace,
) => ({
  get: async (key) => {
    try {
      return namespace.get(key);
    } catch (e) {
      console.error(e);

      return null;
    }
  },
  set: async (key, value, expiry) => {
    try {
      await namespace.put(
        key,
        value,
        expiry ? { expirationTtl: expiry } : undefined,
      );
    } catch (e) {
      console.error(e);
    }
  },
  delete: async (key) => {
    try {
      await namespace.delete(key);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  },
  list: async (prefix) => {
    try {
      const { keys } = await namespace.list({ prefix });

      return keys.map((k) => k.name);
    } catch (e) {
      console.error(e);

      return [];
    }
  },
});
