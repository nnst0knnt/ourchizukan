import { type Keeper, keeper } from "@/services/keeper";
import { kv } from "@/services/kv";
import type { Context } from "hono";
import { getConnInfo } from "hono/cloudflare-workers";
import { factory } from "../helpers";

/**
 * 環境変数
 */
export type Environment = {
  Bindings: Cloudflare.Env;
  Variables: {
    ip: string;
    keeper: Keeper;
  };
};

/**
 * 環境変数を注入するミドルウェア
 */
export const environment = () =>
  factory.createMiddleware(async (context, next) => {
    const _context = context as unknown as Context<Environment>;

    /**
     * IPアドレス
     */
    context.set(
      "ip",
      getConnInfo(context).remote.address ||
        context.req.header("x-real-ip") ||
        context.req.header("cf-connecting-ip") ||
        context.req.header("x-forwarded-for") ||
        "127.0.0.1",
    );

    /**
     * 認証クライアント
     */
    context.set("keeper", keeper(kv(_context.env.Families)));

    await next();
  });
