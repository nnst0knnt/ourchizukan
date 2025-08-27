import type { CreateKeyValueStorage } from "@/models";

export const createCloudflareKV: CreateKeyValueStorage = (
  namespace: KVNamespace,
) => ({
  get: async (key: string) => {
    return namespace.get(key);
  },
  set: async (key: string, value: string, expirySeconds?: number) => {
    await namespace.put(
      key,
      value,
      expirySeconds ? { expirationTtl: expirySeconds } : undefined,
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
