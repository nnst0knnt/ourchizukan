import type { ObjectStorageFactory } from "@/models";

export const createCloudflareR2: ObjectStorageFactory<R2Bucket> = (bucket) => ({
  async get(key) {
    try {
      const object = await bucket.get(key);

      if (!object) return null;

      return {
        data: await object.arrayBuffer(),
        mime: object.httpMetadata?.contentType
          ? object.httpMetadata.contentType
          : "application/octet-stream",
      };
    } catch (e) {
      console.error(e);

      return null;
    }
  },
  async put(key, value, options) {
    try {
      await bucket.put(key, value, {
        httpMetadata: options ? { contentType: options.mime } : undefined,
      });
    } catch (e) {
      console.error(e);
    }
  },
  async delete(key) {
    try {
      await bucket.delete(key);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  },
});
