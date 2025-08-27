import { getConnInfo } from "hono/cloudflare-workers";
import { factory } from "../helpers";

/**
 * ルートを保護するミドルウェア
 */
export const guard = factory.createMiddleware(async (context, next) => {
  /** TODO: 実装 */
  console.log(
    "middlewares/guard",
    getConnInfo(context).remote.address,
    await context.var.gatekeeper.session.get(
      "102b422b-cd8b-42f1-9cae-1bce75f3e50f",
    ),
  );

  await next();
});
