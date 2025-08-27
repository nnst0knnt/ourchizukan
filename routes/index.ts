import { except } from "hono/combine";
import { families } from "./endpoints/families";
import { url, factory, redirect } from "./helpers";
import { environment, guard } from "./middlewares";

/**
 * ルートのHonoインスタンス
 *
 * ここでは最上位のパスを定義し、個々のパスと対応する実装は`endpoints`内の各ディレクトリで定義します。
 * そして、各ディレクトリから公開された個別のHonoインスタンスをパスにマッピングすることで、クライアント側にもエンドポイントが公開されます。
 */
export const app = factory
  .createApp()
  .basePath("/api")
  .use(environment())
  .use(
    except(
      ["/api/families/me"],
      guard({
        failure: {
          unauthenticated: {
            message: "おうちに入ることができませんでした",
          },
          authenticated: {
            message: "既におうちに入っています",
          },
        },
      }),
    ),
  )
  .route("/families", families)
  .onError((_, context) => context.redirect(url(context, redirect.unexpected)));
