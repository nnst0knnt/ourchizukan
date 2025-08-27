import type { Context } from "hono";

/**
 * 未認証時のリダイレクト先
 */
export const unauthenticated = "/house-entries/enter";

/**
 * 予期しないエラー発生時のリダイレクト先
 */
export const unexpected = "/house-trouble";

/**
 * コンテキストからURLを生成する
 */
export const url = (context: Context, pathname: string) =>
  new URL(pathname, context.req.url);
