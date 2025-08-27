import type { DrizzleD1Database } from "drizzle-orm/d1";

export type KeyValueStorage = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, expiry?: number) => Promise<void>;
  delete: (key: string) => Promise<boolean>;
  list: (prefix: string) => Promise<string[]>;
};

export type KeyValueStorageFactory<Store = any> = (
  store: Store,
) => KeyValueStorage;

export type ObjectStorage = {
  get: (key: string) => Promise<{ data: ArrayBuffer; mime: string } | null>;
  put: (
    key: string,
    value: ArrayBuffer,
    options?: { mime?: string },
  ) => Promise<void>;
  delete: (key: string) => Promise<boolean>;
};

export type ObjectStorageFactory<Bucket = any> = (
  bucket: Bucket,
) => ObjectStorage;

export type DatabaseStorageFactory<Database = any> = (
  database: Database,
) => DrizzleD1Database;
