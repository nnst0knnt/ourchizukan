import type { Context } from "hono";

/**
 * URLを生成する
 */
export const url = (context: Context, pathname: string) =>
  new URL(pathname, context.req.url);
