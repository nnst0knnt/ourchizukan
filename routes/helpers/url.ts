import type { Context } from "hono";

/**
 * リダイレクト先
 */
export const redirect = {
  /** 未認証時のリダイレクト先 */
  unauthenticated: "/house-entries/enter",
  /** 認証時のリダイレクト先 */
  authenticated: "/",
  /** 予期しないエラー発生時のリダイレクト先 */
  unexpected: "/house-trouble",
};

/**
 * コンテキストからURLを生成する
 */
export const url = (context: Context, pathname: string) =>
  new URL(pathname, context.req.url);
