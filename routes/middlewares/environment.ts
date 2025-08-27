import type { Context } from "hono";
import { getConnInfo } from "hono/cloudflare-workers";
import { keeper } from "@/services/keeper";
import { createKeyValueStorage, createObjectStorage } from "@/services/storage";
import { factory } from "../helpers";

/**
 * 環境変数
 */
export type Environment = {
  Bindings: Cloudflare.Env;
  Variables: {
    ip: string;
    keeper: ReturnType<typeof keeper>;
    storage: {
      pictures: ReturnType<typeof createObjectStorage>;
    };
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
    context.set("keeper", keeper(createKeyValueStorage(_context.env.Families)));

    /**
     * ストレージ
     */
    context.set("storage", {
      pictures: createObjectStorage(_context.env.Pictures),
    });

    await next();
  });
