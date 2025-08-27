import { getRequestContext } from "@cloudflare/next-on-pages";
import type { app } from "..";

/**
 * アプリケーションに環境変数とコンテキストをバインドする
 */
export const bind = (_app: typeof app) => (request: Request) => {
  const context = getRequestContext();

  return _app.fetch(request, context.env, context.ctx);
};
