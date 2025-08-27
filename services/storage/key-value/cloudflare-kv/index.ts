import type { KeyValueStorageFactory } from "@/models";

export const createCloudflareKV: KeyValueStorageFactory<KVNamespace> = (
  namespace,
) => ({
  get: async (key: string) => {
    return namespace.get(key);
  },
  set: async (key: string, value: string, expiry?: number) => {
    await namespace.put(
      key,
      value,
      expiry ? { expirationTtl: expiry } : undefined,
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
});
