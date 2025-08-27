import type { Context } from "hono";

/**
 * コンテキストからURLを生成する
 */
export const url = (context: Context, pathname: string) =>
  new URL(pathname, context.req.url);
