import { factory } from "../helpers";

/**
 * ルートを保護するミドルウェア
 */
export const guard = () =>
  factory.createMiddleware(async (context, next) => {
    /** TODO: 後で実装 */
    console.log(
      "middlewares/guard",
      await context.var.gatekeeper.session.get(
        "3b2a1cb7-ee10-4bb9-bb97-307abdca1672",
      ),
    );

    await next();
  });
