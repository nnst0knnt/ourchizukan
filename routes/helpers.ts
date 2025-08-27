import type { Context } from "hono";
import { env } from "hono/adapter";
import { createFactory } from "hono/factory";

import { type Gatekeeper, gatekeeper } from "@/clients/gatekeeper";
import kv from "@/clients/kv";

type Environment = {
  Bindings: Cloudflare.Env;
  Variables: {
    env: Cloudflare.Env;
    gatekeeper: Gatekeeper;
  };
};

/**
 * Honoのファクトリ
 *
 * エンドポイントごとにファクトリを利用してハンドラを定義します。
 */
export const factory = createFactory<{
  Variables: Environment["Variables"];
}>({
  initApp: (app) => {
    app.use(async (context: Context<Environment>, next) => {
      /**
       * 環境変数
       */
      context.set("env", env(context));

      /**
       * 認証クライアント
       */
      context.set("gatekeeper", gatekeeper(kv(context.env.Families)));

      await next();
    });
  },
});
