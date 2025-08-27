import type { ObjectStorageFactory } from "@/models";
import { env } from "../../env";
import { createCloudflareR2 } from "./cloudflare-r2";

const createFactory = (): ObjectStorageFactory => {
  if (!env.APP_DEBUG) return createCloudflareR2;

  return createCloudflareR2;
};

export const createObjectStorage = createFactory();
